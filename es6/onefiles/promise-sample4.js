'use strict';

class ProgressState {
  constructor() {
    this.current = 0;
    this.end = 0;
  }

  plan(n) {
    return new ProgressState(this.current, this.end + n);
  }
  done(n) {
    return new ProgressState(this.current + n, this.end);
  }
}

