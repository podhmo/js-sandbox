var UserM;
(function (UserM) {
    "use strict";
})(UserM || (UserM = {}));
var GroupM;
(function (GroupM) {
    "use strict";
})(GroupM || (GroupM = {}));
var User = (function () {
    function User(id, name, age, groupId) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.groupId = groupId;
    }
    return User;
}());
