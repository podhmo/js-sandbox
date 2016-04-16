"use strict";
var option = require("./option");
var deepEqual = require("deep-equal");
var delay_1 = require("./delay");
var FrameState;
(function (FrameState) {
    FrameState[FrameState["initialized"] = 0] = "initialized";
    FrameState[FrameState["capturing"] = 1] = "capturing";
    FrameState[FrameState["fetching"] = 2] = "fetching";
    FrameState[FrameState["fetched"] = 3] = "fetched";
})(FrameState || (FrameState = {}));
// TODO: use angular.equals
var StateFrame = (function () {
    function StateFrame(api, query, captureTime) {
        this.api = api;
        this.query = query;
        this.captureTime = captureTime;
        this.state = FrameState.initialized;
        this.mapping = {};
        this.keys = [];
    }
    StateFrame.prototype.hasDuty = function (query) {
        return deepEqual(query, this.query, { strict: true });
    };
    StateFrame.prototype.isExists = function (id) {
        return !!this.mapping[id];
    };
    StateFrame.prototype.get = function (id) {
        switch (this.state) {
            case FrameState.initialized:
                return this.createPromiseOnInitialized(id);
            case FrameState.capturing:
                return this.createPromiseOnCapturing(id);
            case FrameState.fetching:
                return option.zero(); // api request中の場合にはこちらは使えない。
            case FrameState.fetched:
                return option.zero(); // api request後の場合にはこちらは使えない。 TODO: 再利用
            default:
                throw new Error("invalid state: " + this.state);
        }
    };
    StateFrame.prototype.createPromiseOnInitialized = function (id) {
        var _this = this;
        this.state = FrameState.capturing;
        this.batchedPromise = delay_1.default(function () {
            _this.state = FrameState.fetching;
        }, this.captureTime).then(function () {
            return _this.callAPI();
        });
        return this.capture(id);
    };
    StateFrame.prototype.createPromiseOnCapturing = function (id) {
        return this.capture(id);
    };
    StateFrame.prototype.callAPI = function () {
        var _this = this;
        return this.api(this.keys, this.query).then(function (data) {
            _this.state = FrameState.fetched;
            return data;
        });
    };
    StateFrame.prototype.capture = function (id) {
        if (this.isExists(id)) {
            return option.unit(this.mapping[id]);
        }
        var p = this.batchedPromise.then(function (data) {
            return data[id];
        });
        this.mapping[id] = p;
        this.keys.push(id);
        return option.unit(p);
    };
    return StateFrame;
}());
exports.StateFrame = StateFrame;
/*
 * ある区間で区切ってその間の個別のrequestを一度に取るrequestに変換するpromiseを返すようにする。
 * 利用する側は個別のrequestができるという前提で良い。
 */
var BatchRequestFactory = (function () {
    function BatchRequestFactory(api, captureTime // 1batchとして待つ時間
        ) {
        if (captureTime === void 0) { captureTime = 50; }
        this.api = api;
        this.captureTime = captureTime;
        // TODO: paramaterが違うものについて細かく実行できるようにしたい
        this.frames = [];
    }
    BatchRequestFactory.prototype.pushFrame = function (query) {
        var frame = new StateFrame(this.api, query, this.captureTime);
        this.frames.push(frame);
        return frame;
    };
    BatchRequestFactory.prototype.request = function (id, query) {
        // 逆方向から探索したほうが良いかもしれない。
        // TODO: 手続き型からの脱却
        var mp = option.zero();
        for (var _i = 0, _a = this.frames; _i < _a.length; _i++) {
            var frame = _a[_i];
            if (frame.hasDuty(query)) {
                mp = frame.get(id);
                if (!mp.isEmpty()) {
                    return mp.get();
                }
            }
        }
        // 以下ではoption.zeroではないことが保証されているのでOption.get()を呼ぶ
        var newFrame = this.pushFrame(query);
        return newFrame.get(id).get();
    };
    return BatchRequestFactory;
}());
exports.BatchRequestFactory = BatchRequestFactory;
