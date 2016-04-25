import * as option from "./option";
import * as deepEqual from "deep-equal";

import delay from "./delay";

enum FrameState {
  initialized, capturing, fetching, fetched
}

export interface IAPI<T> {
  (keys: number[], params: Object): Promise<{[id: number]: T}>;
}

// TODO: use angular.equals
export class StateFrame<T> {
  public state = FrameState.initialized;
  public mapping: {[id: number]: Promise<T>} = {};
  public keys: number[] = [];
  public batchedPromise: Promise<{[id: number]: T}>;

  constructor(
    public api: IAPI<T>,
    public query: Object,
    public captureTime: number
  ) {}

  hasDuty(query: Object): boolean {
    return deepEqual(query, this.query, {strict: true});
  }

  isExists(id: number): boolean {
    return !!this.mapping[id];
  }

  get(id: number): option.Option<Promise<T>> {
    switch (this.state) {
    case FrameState.initialized:
      return this.createPromiseOnInitialized(id);
    case FrameState.capturing:
      return this.createPromiseOnCapturing(id);
    case FrameState.fetching:
      return option.zero<Promise<T>>(); // api request中の場合にはこちらは使えない。
    case FrameState.fetched:
      return option.zero<Promise<T>>(); // api request後の場合にはこちらは使えない。 TODO: 再利用
    default:
      throw new Error(`invalid state: ${this.state}`);
    }
  }

  createPromiseOnInitialized(id: number): option.Option<Promise<T>> {
    this.state = FrameState.capturing;
    this.batchedPromise = delay(() => {
      this.state = FrameState.fetching;
    }, this.captureTime).then<{[id: number]: T}>(() => {
      return this.callAPI();
    });
    return this.capture(id);
  }

  createPromiseOnCapturing(id: number): option.Option<Promise<T>> {
    return this.capture(id);
  }

  private callAPI(): Promise<{[id: number]: T}> {
    return this.api(this.keys, this.query).then((data: {[id: number]: T}) => {
      this.state = FrameState.fetched;
      return data;
    });
  }

  private capture(id: number): option.Option<Promise<T>> {
    if (this.isExists(id)) {
      return option.unit<Promise<T>>(this.mapping[id]);
    }
    const p = this.batchedPromise.then((data: {[id: number]: T}) => {
      return data[id];
    });
    this.mapping[id] = p;
    this.keys.push(id);
    return option.unit<Promise<T>>(p);
  }
}

/*
 * ある区間で区切ってその間の個別のrequestを一度に取るrequestに変換するpromiseを返すようにする。
 * 利用する側は個別のrequestができるという前提で良い。
 */
export class BatchRequestFactory<T> {
  // TODO: paramaterが違うものについて細かく実行できるようにしたい
  public frames: StateFrame<T>[] = [];

  constructor(
    public api: IAPI<T>,
    public captureTime: number = 50 // 1batchとして待つ時間
  ) {}

  pushFrame(query: Object): StateFrame<T> {
    const frame = new StateFrame<T>(this.api, query, this.captureTime);
    this.frames.push(frame);
    return frame;
  }

  request(id: number, query: Object): Promise<T> {
    // 逆方向から探索したほうが良いかもしれない。
    // TODO: 手続き型からの脱却
    let mp = option.zero<Promise<T>>();
    for (const frame of this.frames) {
      if (frame.hasDuty(query)) {
        mp = frame.get(id);
        if (!mp.isEmpty()) {
          return mp.get();
        }
      }
    }
    // 以下ではoption.zeroではないことが保証されているのでOption.get()を呼ぶ
    const newFrame = this.pushFrame(query);
    return newFrame.get(id).get();
  }
}

