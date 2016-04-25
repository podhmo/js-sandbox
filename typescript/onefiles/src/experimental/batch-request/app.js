/// <reference path="./typings/bundle.d.ts" />
"use strict";
var b = require("./batch-request");
var r = require("./resources");
var delay_1 = require("./delay");
function getUsers() {
    return r.usersAPI();
}
function getUserGroupBatch(userIdList, params) {
    if (params === void 0) { params = {}; }
    return r.groupBatchAPI(userIdList).then(function (refList) {
        var mapping = {};
        for (var _i = 0, refList_1 = refList; _i < refList_1.length; _i++) {
            var ref = refList_1[_i];
            mapping[ref.id] = ref.value;
        }
        return mapping;
    });
}
var br = new b.BatchRequestFactory(getUserGroupBatch, 50);
console.log("requesting users");
getUsers().then(function (users) {
    var ps = [];
    var _loop_1 = function(user) {
        // 本当はもっとまじめにpromise管理するべき
        console.log("user: " + user.name + "(" + user.age + ") => requesting group");
        var p = delay_1.default(function () { return null; }, Math.floor(Math.random() * 100))
            .then(function () { return br.request(user.groupId, {}); })
            .then(function (group) {
            console.log("user: " + user.name + "(" + user.age + ") => group: " + group.name);
        });
        ps.push(p);
    };
    for (var _i = 0, users_1 = users; _i < users_1.length; _i++) {
        var user = users_1[_i];
        _loop_1(user);
    }
    return Promise.all(ps).then(function () {
        console.log("frames: " + br.frames);
    });
});
