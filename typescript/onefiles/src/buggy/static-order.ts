class X {
  static y: Y = new Y();
  say() {
    return X.y.say();
  }
}

class Y {
  say() {
    console.log("hai");
  }
}