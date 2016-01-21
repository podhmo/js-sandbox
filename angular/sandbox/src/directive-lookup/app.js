require('../setup')(function(angular){
  var context = {};
  var injector = require("./individualInjector")(angular, context);
  var inj = injector(["ng"]);

  var mapping = {"E": [], "A": [], "C": []};

  var rx = new RegExp("");
  for (var k in context.providerCache){
    if(k.endsWith("DirectiveProvider")) {
      for(var instance of inj.get(k.replace("Provider", ""))) {
        for(var restrict of instance.restrict.split(rx)){
          mapping[restrict].push(instance);
        }
      }
    }
  }

  for (var d of mapping.E) {
    console.log(d);
  }
});
