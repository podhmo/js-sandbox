/// <reference path="./typings/bundle.d.ts" />

import * as b from "./batch-request";
import * as r from "./resources";
import delay from "./delay";

function getUsers(): Promise<r.User[]> {
  return r.usersAPI();
}

function getUserGroupBatch(userIdList: number[], params: Object = {}): Promise<{[id: number]: r.Group}> {
  return r.groupBatchAPI(userIdList).then((refList: r.Ref<r.Group>[]) => {
    let mapping: {[id: number]: r.Group} = {};
    for (const ref of refList) {
      mapping[ref.id] = ref.value;
    }
    return mapping;
  });
}

const br = new b.BatchRequestFactory<r.Group>(getUserGroupBatch, 50);

console.log(`requesting users`);
getUsers().then((users: r.User[]) => {
  let ps: Promise<any>[] = [];
  for (const user of users) {
    // 本当はもっとまじめにpromise管理するべき
    console.log(`user: ${user.name}(${user.age}) => requesting group`);
    const p = delay<any>(() => null, Math.floor(Math.random() * 100))
      .then(() => br.request(user.groupId, {}))
      .then((group: r.Group) => {
        console.log(`user: ${user.name}(${user.age}) => group: ${group.name}`);
      });
    ps.push(p);
  }
  return Promise.all(ps).then(() => {
    console.log(`frames: ${br.frames}`);
  });
});
