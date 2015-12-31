interface IDescribe{
    describe(): string;
}

class A{
    describe(){
        return "this is a"
    }
}

class B{
    describe(){
        return "this is b"
    }
}

class C{
}

// function getDescription(o: IDescribe){ // compile error with C
function getDescription(o: {describe?: () => string}){
    if(o.describe){
        return {"description": o.describe()};
    }else {
        return {"description": typeof(o)};
    }

}

console.log(getDescription(new A()));
console.log(getDescription(new B()));
console.log(getDescription(new C()));


/*
# in LL (python)
class A(object):
    def describe(self):
        return "this is a"


class B(object):
    def describe(self):
        return "this is b"


class C(object):
    pass


def get_description(o):
    if hasattr(o, "describe"):
        return {"description": o.describe()}
    else:
        return {"describe": o.__class__.__name__}

print(get_description(A()))
print(get_description(C()))
*/