export class HelloController {
    constructor(){
    }
}

export class HelloTagDefinition {
    public static tag = "hello";
    static ddo(){
        return {
            restrict: 'E',
            controller: HelloController,
            controllerAs: 'vm',
            scope: {},
            bindToController: {
                name: '='
            },
            template: `
                <p>hello: {{vm.name}}</p>
                <input ng-model="vm.name">
                `
            // templateUrl: './hello.html'
        };
    }
}