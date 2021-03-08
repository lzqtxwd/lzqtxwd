class myPromise {
  // 初始状态
  state = 'pending';

  // 初始值为undefined
  value = undefined;

  // 初始的失败原因为undefined
  reason = undefined;

  // 存放成功的onFulfilled方法，等待promise完成再执行。
  onResolvedCallbacks: Array<Function> = [];

  // 存放失败的onRejected方法，等待promise完成再执行。
  onRejectedCallbacks: Array<Function> = [];

  // 构造函数
  constructor(executor) {
    // 成功
    let resolve = (value) => {
      // 若状态为pending 则将状态修改为fulfilled 值等于传入的值。
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;

        // 一旦resolve成功，执行存储的所有onFulfilled。
        this.onResolvedCallbacks.forEach((fn: Function) => fn());
      }
    };

    // 失败
    let reject = (reason) => {
      // 若状态为pending 则将状态修改为fulfilled 失败原因等于传入的值
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
      }

      this.onRejectedCallbacks.forEach((fn: Function) => fn());
    };

    /**
     * new myPromise(executor(resolve,reject))
     * 立即执行传入的函数，若此函数报错直接reject。
     */
    try {
      executor(resolve, reject);
    } catch (err) {
      reject(err);
    }
  }

  // .then 方法
  then(onFulfilled, onRejected) {
    // 若onFulfilled不是函数，直接返回value
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;

    // 若onRejected不是函数，直接抛错
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (err) => {
            throw err;
          };

    let myPromise2 = new myPromise((resolve, reject) => {
      // 若状态为fulfilled,执行传入的onFulfilled方法，参数为promise的value。
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            let x = onFulfilled(this.value);

            this.resolvePromise(myPromise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      // 若状态为rejected，执行传入的onRejected方法，参数为promise的reason。
      if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            let x = onRejected(this.reason);

            this.resolvePromise(myPromise2, x, resolve, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      }

      // 若为pending状态，将成功或失败的回调存入对应的数组，等待promise完成
      if (this.state === 'pending') {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onFulfilled(this.value);

              this.resolvePromise(myPromise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              let x = onRejected(this.reason);

              this.resolvePromise(myPromise2, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
    });

    return myPromise2;
  }

  /**
   * 解决链式调用问题。
   * @param promise2 上层promise的.then方法的返回值。
   * @param x 上层promise的结果。对其类型进行判断决定下层promise的表现。
   * @param resolve promise2的resolve
   * @param reject promise2的reject
   */
  private resolvePromise(promise2, x, resolve, reject) {
    // 循环引用报错
    if (x === promise2) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    // 避免多此调用
    let called;

    // 若上层返回的X是promise.则再次调用resolvePromise.若不是,则poromise2直接resolve(x)
    if ((x != null && typeof x === 'object') || typeof x === 'function') {
      try {
        let then = x.then;

        if (typeof then === 'function') {
          then.call(
            x,
            (y) => {
              if (called) {
                return;
              }
              called = true;

              this.resolvePromise(promise2, y, resolve, reject);
            },
            (err) => {
              if (called) {
                return;
              }

              called = true;
              reject(err);
            }
          );
        } else {
          resolve(x);
        }
      } catch (e) {
        if (called) {
          return;
        }

        called = true;

        reject(e);
      }
    } else {
      resolve(x);
    }
  }
}
