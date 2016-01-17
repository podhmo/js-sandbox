function registerMock($httpBackend: angular.IHttpBackendService) {
  "ngInject";
  $httpBackend.whenGET("/news/1").respond(
    200,
    {
      "name": "foo",
      "message": "hello"
    },
    {}
  );
}

export default function setup(app: ng.IModule) {
  app.run(registerMock);
}