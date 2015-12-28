export class HelloController {
    constructor(public name: string ="foo"){
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
            templateUrl: './hello.html'
        };
    }
}