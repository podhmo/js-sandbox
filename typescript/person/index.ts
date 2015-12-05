class Student{
    fullname: string;
    constructor(public firstname, public middleinitial, public lastname){
        this.fullname = [firstname,middleinitial,lastname].join(" ");
    }
}

interface Person{
    firstname: string;
    lastname: string;
}

function greeter(person: Person){
    return ["hello,", person.firstname, person.lastname].join(" ");
}

var user = new Student("Jane","M","User");
console.log(user);