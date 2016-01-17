// Type definitions for Restangular v1.4.0
// Project: https://github.com/mgonto/restangular
// Definitions by: Boris Yankov <https://github.com/borisyankov/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped


/// <reference path="../../typings/angularjs/angular.d.ts" />
/// <reference path="./jsondata.d.ts" />

// Support AMD require (copying angular.d.ts approach)
// allows for import {IRequestConfig} from 'restangular' ES6 approach
declare module 'restangular' {
    export = restangular;
}

declare module restangular {

  interface IPromise<T> extends angular.IPromise<T> {
    call(methodName: string, params?: any): IPromise<T>;
    get(fieldName: string): IPromise<T>;
    $object: T;
}

  interface ICollectionPromise<T> extends angular.IPromise<T[]> {
    push(object: any): ICollectionPromise<T>;
    call(methodName: string, params?: any): ICollectionPromise<T>;
    get(fieldName: string): ICollectionPromise<T>;
    $object: T[];
  }

  interface IResponse {
    status: number;
    data: any;
    headers(name: string): string;
    config: {
        method: string;
        url: string;
        params: any;
    }
  }

  interface IProvider {
    setBaseUrl(baseUrl: string): void;
    setExtraFields(fields: string[]): void;
    setParentless(parentless: boolean, routes: string[]): void;
    setDefaultHttpFields(httpFields: any): void;
    addElementTransformer(route: string, transformer: Function): void;
    addElementTransformer(route: string, isCollection: boolean, transformer: Function): void;
    setTransformOnlyServerElements(active: boolean): void;
    setOnElemRestangularized(callback: (elem: any, isCollection: boolean, what: string, restangular: IService) => any): void;
    setResponseInterceptor(responseInterceptor: (data: any, operation: string, what: string, url: string, response: IResponse, deferred: angular.IDeferred<any>) => any): void;
    setResponseExtractor(responseInterceptor: (data: any, operation: string, what: string, url: string, response: IResponse, deferred: angular.IDeferred<any>) => any): void;
    addResponseInterceptor(responseInterceptor: (data: any, operation: string, what: string, url: string, response: IResponse, deferred: angular.IDeferred<any>) => any): void;
    setRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string) => any): void;
    addRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string) => any): void;
    setFullRequestInterceptor(fullRequestInterceptor: (element: any, operation: string, what: string, url: string, headers: any, params: any, httpConfig: angular.IRequestShortcutConfig) => {element: any; headers: any; params: any}): void;
    addFullRequestInterceptor(requestInterceptor: (element: any, operation: string, what: string, url: string, headers: any, params: any, httpConfig: angular.IRequestShortcutConfig) => {headers: any; params: any; element: any; httpConfig: angular.IRequestShortcutConfig}): void;
    setErrorInterceptor(errorInterceptor: (response: IResponse, deferred: angular.IDeferred<any>) => any): void;
    setRestangularFields(fields: {[fieldName: string]: string}): void;
    setMethodOverriders(overriders: string[]): void;
    setJsonp(jsonp: boolean): void;
    setDefaultRequestParams(params: any): void;
    setDefaultRequestParams(method: string, params: any): void;
    setDefaultRequestParams(methods: string[], params: any): void;
    setFullResponse(fullResponse: boolean): void;
    setDefaultHeaders(headers: any): void;
    setRequestSuffix(suffix: string): void;
    setUseCannonicalId(useCannonicalId: boolean): void;
    setEncodeIds(encode: boolean): void;
  }

  interface ICustom {
    customGET(path: string, params?: any, headers?: any): IPromise<any>;
    customGETLIST(path: string, params?: any, headers?: any): ICollectionPromise<any>;
    customDELETE(path: string, params?: any, headers?: any): IPromise<any>;
    customPOST(elem?: any, path?: string, params?: any, headers?: any): IPromise<any>;
    customPUT(elem?: any, path?: string, params?: any, headers?: any): IPromise<any>;
    customOperation(operation: string, path: string, params?: any, headers?: any, elem?: any): IPromise<any>;
    addRestangularMethod(name: string, operation: string, path?: string, params?: any, headers?: any, elem?: any): IPromise<any>;
  }

  interface IService extends ICustom, IProvider {
    one(route: string, id?: number): IElement;
    one<T extends JSONData>(route: string, id?: number): IElementTyped<T>;
    one(route: string, id?: string): IElement;
    one<T extends JSONData>(route: string, id?: string): IElementTyped<T>;
    oneUrl(route: string, url: string): IElement;
    oneUrl<T extends JSONData>(route: string, url: string): IElementTyped<T>;
    all(route: string): IElement;
    all<T extends JSONData>(route: string): IElementTyped<T>;
    allUrl(route: string, url: string): IElement;
    allUrl<T extends JSONData>(route: string, url: string): IElementTyped<T>;
    copy(fromElement: any): IElement;
    copy<T extends JSONData>(fromElement: any): IElementTyped<T>;
    withConfig(configurer: (RestangularProvider: IProvider) => any): IService;
    withConfig<T extends JSONData>(configurer: (RestangularProvider: IProvider) => any): IServiceTyped<T>;
    restangularizeElement(parent: any, element: any, route: string, collection?: any, reqParams?: any): IElement;
    restangularizeElement<T extends JSONData>(parent: any, element: any, route: string, collection?: any, reqParams?: any): IElementTyped<T>;
    restangularizeCollection(parent: any, element: any, route: string): ICollection;
    service(route: string, parent?: any): IService;
    service<T extends JSONData>(route: string, parent?: any): IServiceTyped<T>;
    stripRestangular(element: any): any;
    extendModel(route: string, extender: (model: IElement) => any): void;
    extendModel<T extends JSONData>(route: string, extender: (model: IElementTyped<T>) => any): void;
  }

  interface IElement extends IService {
    get<T extends JSONData>(queryParams?: any, headers?: any): IPromise<T>;
    getList<T extends JSONData>(subElement?: any, queryParams?: any, headers?: any): ICollectionPromise<T>;
    put(queryParams?: any, headers?: any): IPromise<any>;
    post<T extends JSONData>(subElement: any, elementToPost: T, queryParams?: any, headers?: any): IPromise<T>;
    post<T extends JSONData>(elementToPost: T, queryParams?: any, headers?: any): IPromise<T>;
    remove(queryParams?: any, headers?: any): IPromise<any>;
    head(queryParams?: any, headers?: any): IPromise<any>;
    trace(queryParams?: any, headers?: any): IPromise<any>;
    options(queryParams?: any, headers?: any): IPromise<any>;
    patch(queryParams?: any, headers?: any): IPromise<any>;
    clone(): IElement;
    plain(): any;
    plain<T>(): T;
    withHttpConfig(httpConfig: angular.IRequestShortcutConfig): IElement;
    save(queryParams?: any, headers?: any): IPromise<any>;
    getRestangularUrl(): string;
  }

  interface ICollection extends IService, Array<any> {
    getList(queryParams?: any, headers?: any): ICollectionPromise<any>;
    getList<T>(queryParams?: any, headers?: any): ICollectionPromise<T>;
    post(elementToPost: any, queryParams?: any, headers?: any): IPromise<any>;
    post<T>(elementToPost: T, queryParams?: any, headers?: any): IPromise<T>;
    head(queryParams?: any, headers?: any): IPromise<any>;
    trace(queryParams?: any, headers?: any): IPromise<any>;
    options(queryParams?: any, headers?: any): IPromise<any>;
    patch(queryParams?: any, headers?: any): IPromise<any>;
    putElement(idx: any, params: any, headers: any): IPromise<any>;
    withHttpConfig(httpConfig: angular.IRequestShortcutConfig): ICollection;
    clone(): ICollection;
    plain(): any;
    plain<T>(): T[];
    getRestangularUrl(): string;
  }

  interface IServiceTyped<T extends JSONData> extends ICustom, IProvider {
    one(route: string, id?: number): IElementTyped<T>;
    one<U extends T>(route: string, id?: number): IElementTyped<U>;
    oneUrl(route: string, url: string): IElementTyped<T>;
    oneUrl<U extends T>(route: string, url: string): IElementTyped<U>;
    all(route: string): IElementTyped<T>;
    all<U extends T>(route: string): IElementTyped<U>;
    allUrl(route: string, url: string): IElementTyped<T>;
    allUrl<U extends T>(route: string, url: string): IElementTyped<U>;
    copy(fromElement: any): IElementTyped<T>;
    copy<U extends T>(fromElement: any): IElementTyped<U>;
    withConfig(configurer: (RestangularProvider: IProvider) => any): IServiceTyped<T>;
    restangularizeElement(parent: any, element: any, route: string, collection?: any, reqParams?: any): IElement;
    restangularizeCollection(parent: any, element: any, route: string): ICollection;
    service(route: string, parent?: any): IServiceTyped<T>;
    stripRestangular(element: any): any;
    extendModel(route: string, extender: (model: IElement) => any): void;
    stripRestangular(element: any): any;
    extendModel(route: string, extender: (model: IElement) => any): void;
  }

  interface IElementTyped<T extends JSONData> extends IServiceTyped<T> {
    get(queryParams?: any, headers?: any): IPromise<T>;
    get<U extends T>(queryParams?: any, headers?: any): IPromise<U>;
    getList(subElement?: any, queryParams?: any, headers?: any): ICollectionPromise<T>;
    getList<U extends T>(subElement?: any, queryParams?: any, headers?: any): ICollectionPromise<U>;
    put(queryParams?: any, headers?: any): IPromise<T>;
    post(subElement: any, elementToPost: any, queryParams?: any, headers?: any): IPromise<T>;
    post<U extends T>(subElement: any, elementToPost: T, queryParams?: any, headers?: any): IPromise<U>;
    post(elementToPost: any, queryParams?: any, headers?: any): IPromise<T>;
    post<U extends T>(elementToPost: T, queryParams?: any, headers?: any): IPromise<U>;
    remove(queryParams?: any, headers?: any): IPromise<T>;
    head(queryParams?: any, headers?: any): IPromise<T>;
    trace(queryParams?: any, headers?: any): IPromise<T>;
    options(queryParams?: any, headers?: any): IPromise<T>;
    patch(queryParams?: any, headers?: any): IPromise<T>;
    clone(): IElement;
    plain(): any;
    withHttpConfig(httpConfig: angular.IRequestShortcutConfig): IElementTyped<T>;
    save(queryParams?: any, headers?: any): IPromise<T>;
    getRestangularUrl(): string;
  }
}