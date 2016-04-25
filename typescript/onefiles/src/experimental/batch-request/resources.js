"use strict";
var delay_1 = require("./delay");
var Group = (function () {
    function Group(name) {
        this.name = name;
    }
    return Group;
}());
exports.Group = Group;
var User = (function () {
    function User(groupId, name, age) {
        this.groupId = groupId;
        this.name = name;
        this.age = age;
    }
    return User;
}());
exports.User = User;
var userGrops = (function () {
    var a = new Group("A");
    var b = new Group("B");
    var c = new Group("C");
    return { 1: a, 2: b, 3: c, 4: a, 5: a, 6: c };
})();
function groupBatchAPI(pkList) {
    var groups = pkList.map(function (i) {
        return { id: i, value: userGrops[i] };
    });
    console.log("\tcallAPI: /group?" + pkList.join(","));
    return delay_1.default(function () { return groups; }, 10);
}
exports.groupBatchAPI = groupBatchAPI;
function usersAPI() {
    console.log("\tcallAPI: /user");
    var users = [
        new User(1, "foo", 20), new User(2, "bar", 10), new User(3, "boo", 22),
        new User(4, "foo", 20), new User(5, "bar", 10), new User(6, "boo", 22)
    ];
    return delay_1.default(function () { return users; }, 10);
}
exports.usersAPI = usersAPI;
