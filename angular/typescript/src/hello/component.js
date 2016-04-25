var HelloController = (function () {
    function HelloController(name) {
        if (name === void 0) { name = "foo"; }
        this.name = name;
    }
    return HelloController;
})();
exports.HelloController = HelloController;
var HelloTagDefinition = (function () {
    function HelloTagDefinition() {
    }
    HelloTagDefinition.ddo = function () {
        return {
            restrict: 'E',
            controller: HelloController,
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                name: '='
            },
            templateUrl: './hello.html'
        };
    };
    HelloTagDefinition.tag = "hello";
    return HelloTagDefinition;
})();
exports.HelloTagDefinition = HelloTagDefinition;
