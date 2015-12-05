import "reflect-metadata";
import "zone.js";
import {bootstrap, Component, CORE_DIRECTIVES} from "angular2/angular2";

// TODO: module separation
// TODO: using data-binding

@Component({
    selector: `hello-world`,
    template: `
      <p>Hello World!</p>
    `
})
class HelloWorld{

}

@Component({
    selector: `my-app`,
    template: `
      <hello-world></hello-world>
    `,
    directives: [CORE_DIRECTIVES, HelloWorld]
})
class MyApp{

}

bootstrap(MyApp)