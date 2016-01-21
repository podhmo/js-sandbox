module.exports = function extract(angular, context){
  var inj = angular.injector(["ng"]);
  var HashMap = inj.get("$$HashMap");
  var angularModule = angular.module;

  function reverseParams(iteratorFn) {
    return function(value, key) { iteratorFn(key, value); };
  }
  function valueFn(value) {
    return function() {return value;};
  }

  function createInjector(modulesToLoad, strictDi) {

    ////////////////////////////////////
    // $provider
    ////////////////////////////////////

    function supportObject(delegate) {
      return function(key, value) {
        if (angular.isObject(key)) {
          angular.forEach(key, reverseParams(delegate));
        } else {
          return delegate(key, value);
        }
      };
    }

    function provider(name, provider_) {
      if (angular.isFunction(provider_) || angular.isArray(provider_)) {
        provider_ = providerInjector.instantiate(provider_);
      }
      if (!provider_.$get) {
        throw new Error('pget', "Provider '{0}' must define $get factory method.", name);
      }
      var instance = providerCache[name + providerSuffix] = provider_;
      return instance;
    }

    function enforceReturnValue(name, factory) {
      return function enforcedReturnValue() {
        var result = instanceInjector.invoke(factory, this);
        if (angular.isUndefined(result)) {
          throw new Error('undef', "Provider '{0}' must return a value from $get factory method.", name);
        }
        return result;
      };
    }

    function factory(name, factoryFn, enforce) {
      return provider(name, {
        $get: enforce !== false ? enforceReturnValue(name, factoryFn) : factoryFn
      });
    }

    function service(name, constructor) {
      return factory(name, ['$injector', function($injector) {
        return $injector.instantiate(constructor);
      }]);
    }

    function value(name, val) { return factory(name, valueFn(val), false); }

    function constant(name, value) {
      providerCache[name] = value;
      instanceCache[name] = value;
    }

    function decorator(serviceName, decorFn) {
      var origProvider = providerInjector.get(serviceName + providerSuffix),
          orig$get = origProvider.$get;

      origProvider.$get = function() {
        var origInstance = instanceInjector.invoke(orig$get, origProvider);
        return instanceInjector.invoke(decorFn, null, {$delegate: origInstance});
      };
    }

    ////////////////////////////////////
    // Module Loading
    ////////////////////////////////////
    function loadModules(modulesToLoad) {
      // assertArg(angular.isUndefined(modulesToLoad) || angular.isArray(modulesToLoad), 'modulesToLoad', 'not an array');
      var runBlocks = [], moduleFn;
      angular.forEach(modulesToLoad, function(module) {
        if (loadedModules.get(module)) return;
        loadedModules.put(module, true);

        function runInvokeQueue(queue) {
          var i, ii;
          for (i = 0, ii = queue.length; i < ii; i++) {
            var invokeArgs = queue[i],
                provider = providerInjector.get(invokeArgs[0]);

            provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
          }
        }

        try {
          if (angular.isString(module)) {
            moduleFn = angularModule(module);
            runBlocks = runBlocks.concat(loadModules(moduleFn.requires)).concat(moduleFn._runBlocks);
            runInvokeQueue(moduleFn._invokeQueue);
            runInvokeQueue(moduleFn._configBlocks);
          } else if (angular.isFunction(module)) {
            runBlocks.push(providerInjector.invoke(module));
          } else if (angular.isArray(module)) {
            runBlocks.push(providerInjector.invoke(module));
          } else {
            // assertArgFn(module, 'module');
          }
        } catch (e) {
          if (angular.isArray(module)) {
            module = module[module.length - 1];
          }
          if (e.message && e.stack && e.stack.indexOf(e.message) === -1) {
            // Safari & FF's stack traces don't contain error.message content
            // unlike those of Chrome and IE
            // So if stack doesn't contain message, we create a new string that contains both.
            // Since error.stack angular.is read-only in Safari, I'm overriding e and not e.stack here.
            /* jshint -W022 */
            e = e.message + '\n' + e.stack;
          }
          throw new Error('modulerr', "Failed to instantiate module {0} due to:\n{1}",
                          module, e.stack || e.message || e);
        }
      });
      return runBlocks;
    }

    ////////////////////////////////////
    // internal Injector
    ////////////////////////////////////

    function createInternalInjector(cache, factory) {

      function getService(serviceName, caller) {
        if (cache.hasOwnProperty(serviceName)) {
          if (cache[serviceName] === INSTANTIATING) {
            throw new Error('cdep', 'Circular dependency found: {0}',
                                  serviceName + ' <- ' + path.join(' <- '));
          }
          return cache[serviceName];
        } else {
          try {
            path.unshift(serviceName);
            cache[serviceName] = INSTANTIATING;
            var instance = cache[serviceName] = factory(serviceName, caller);
            return instance;
          } catch (err) {
            if (cache[serviceName] === INSTANTIATING) {
              delete cache[serviceName];
            }
            throw err;
          } finally {
            path.shift();
          }
        }
      }

      function invoke(fn, self, locals, serviceName) {
        if (typeof locals === 'string') {
          serviceName = locals;
          locals = null;
        }

        var args = [],
            $inject = createInjector.$$annotate(fn, strictDi, serviceName),
            length, i,
            key;

        for (i = 0, length = $inject.length; i < length; i++) {
          key = $inject[i];
          if (typeof key !== 'string') {
            throw new Error('itkn',
                                  'Incorrect injection token! Expected service name as string, got {0}', key);
          }
          args.push(
            locals && locals.hasOwnProperty(key) ? locals[key] : getService(key, serviceName)
          );
        }
        if (angular.isArray(fn)) {
          fn = fn[length];
        }

        // http://jsperf.com/angularjs-invoke-apply-vs-switch
        // #5388
        return fn.apply(self, args);
      }

      function instantiate(Type, locals, serviceName) {
        // Check if Type is annotated and use just the given function at n-1 as parameter
        // e.g. someModule.factory('greeter', ['$window', function(renamed$window) {}]);
        // Object creation: http://jsperf.com/create-constructor/2
        var instance = Object.create((angular.isArray(Type) ? Type[Type.length - 1] : Type).prototype || null);
        var returnedValue = invoke(Type, instance, locals, serviceName);

        return angular.isObject(returnedValue) || angular.isFunction(returnedValue) ? returnedValue : instance;
      }

      return {
        invoke: invoke,
        instantiate: instantiate,
        get: getService,
        annotate: createInjector.$$annotate,
        has: function(name) {
          return providerCache.hasOwnProperty(name + providerSuffix) || cache.hasOwnProperty(name);
        }
      };
    }

    strictDi = (strictDi === true);
    var INSTANTIATING = {},
        providerSuffix = 'Provider',
        path = [],
        loadedModules = new HashMap([], true),
        providerCache = {
          $provide: {
            provider: supportObject(provider),
            factory: supportObject(factory),
            service: supportObject(service),
            value: supportObject(value),
            constant: supportObject(constant),
            decorator: decorator
          }
        },
        providerInjector = (providerCache.$injector =
                            createInternalInjector(providerCache, function(serviceName, caller) {
                              if (angular.isString(caller)) {
                                path.push(caller);
                              }
                              throw new Error('unpr', "Unknown provider: {0}", path.join(' <- '));
                            })),
        instanceCache = {},
        instanceInjector = (instanceCache.$injector =
                            createInternalInjector(instanceCache, function(serviceName, caller) {
                              var provider = providerInjector.get(serviceName + providerSuffix, caller);
                              return instanceInjector.invoke(provider.$get, provider, undefined, serviceName);
                            }));

    angular.forEach(loadModules(modulesToLoad), function(fn) { if (fn) instanceInjector.invoke(fn); });


    context.INSTANTIATING = INSTANTIATING;
    context.providerSuffix = providerSuffix;
    context.path = path;
    context.loadedModules = loadedModules;
    context.providerCache = providerCache;
    context.providerInjector = providerInjector;
    context.instanceCache = instanceCache;
    context.instanceInjector = instanceInjector;
    return instanceInjector;
  }

  createInjector.$$annotate = inj.annotate;
  return createInjector;
};
