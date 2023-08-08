// status
const PROMISE_STATUE_PENDING = "pending"; // 进行中
const PROMISE_STATUE_FULFILLED = "fulfilled"; // 已完成
const PROMISE_STATUE_REJECTED = "rejected"; // 已拒绝

class MyPromise {
  constructor(executer) {
    this.statue = PROMISE_STATUE_PENDING;
    this.value = void 0;
    this.error = void 0;
    this.resFns = [];
    this.errFns = [];

    executer(this.resolve, this.reject);
  }
  //    创建一个已解决的Promise对象，将给定的值作为其参数。
  resolve = (value) => {
    if (this.statue === PROMISE_STATUE_PENDING) {
      queueMicrotask(() => {
        if (this.statue !== PROMISE_STATUE_PENDING) return;
        this.statue = PROMISE_STATUE_FULFILLED;
        this.value = value;
        this.resFns?.forEach((fn) => {
          fn(this.value);
        });
      });
    }
  };
  // 创建一个已拒绝的Promise对象，将给定的原因作为其参数。
  reject = (error) => {
    if (this.statue === PROMISE_STATUE_PENDING) {
      queueMicrotask(() => {
        if (this.statue !== PROMISE_STATUE_PENDING) return;
        this.statue = PROMISE_STATUE_REJECTED;
        this.error = error;
        this.errFns.forEach((en) => {
          en(this.error);
        });
      });
    }
  };
  //   添加对Promise对象解决或拒绝时的处理程序。
  then(resFn, errFn) {
    const defaultOnRejected = (err) => {
      throw err;
    };
    errFn = errFn || defaultOnRejected;

    const defaultOnFulFilled = (value) => {
      return value;
    };
    resFn = resFn || defaultOnFulFilled;

    return new MyPromise((resolve, reject) => {
      if (this.statue === PROMISE_STATUE_FULFILLED && !!resFn) {
        try {
          const value = resFn(this.value);
          resolve(value);
        } catch (error) {
          reject(error);
        }
      }
      if (this.statue === PROMISE_STATUE_REJECTED && !!errFn) {
        try {
          resolve(value);
        } catch (error) {
          reject(error);
        }
      }
      if (this.statue === PROMISE_STATUE_PENDING) {
        if (!!resFn) {
          this.resFns.push(() => {
            try {
              const value = resFn(this.value);
              resolve(value);
            } catch (error) {
              reject(error);
            }
          });
        }

        if (!!errFn) {
          this.errFns.push(() => {
            try {
              const value = errFn(this.error);
              resolve(value);
            } catch (error) {
              reject(error);
            }
          });
        }
      }
    });
  }
  // 添加对Promise对象拒绝时的处理程序。
  catch(errFn) {
    return this.then(undefined, errFn);
  }
  // 添加对Promise对象解决或拒绝时的最终处理程序，无论Promise对象是否已被解决或拒绝。
  finally(fn) {
    setTimeout(() => {
      fn();
    }, 0);
  }
}

const isPromise = function(promise) {
  return (
    !!promise &&
    (typeof promise === "object" || typeof promise === "function") &&
    typeof promise.then === "function"
  );
};

/**
 * 接收一个可迭代对象（如数组），并返回一个新的Promise对象。
 * 当所有Promise对象都已解决时，该Promise对象才将被解决，并返回一个包含所有解决值的数组。
 * @param {any[]} iterable
 */
MyPromise.all = function(iterable) {
  if (!(iterable instanceof Array)) {
    return console.log("传入参数必须是一个数组");
  }
  return new MyPromise((resolve, reject) => {
    let len = iterable.length;
    let count = 0;
    let results = new Array(len);
    for (let i = 0; i < len; i++) {
      let promise = iterable[i];
      count++;
      if (isPromise(promise)) {
        promise
          .then((res) => {
            results[i] = res;
            if (count === len) {
              resolve(results);
            }
          })
          .catch((err) => {
            reject(err);
          });
      } else if (typeof promise === "function") {
        results[i] = promise();
      } else {
        results[i] = promise;
      }
    }
    // 当数据的所有项都不是promise实例，我们就在这判断多一次，然后resolve
    if (count === len) {
      resolve(results);
    }
  });
};

MyPromise.race = function(iterable) {
  if (!(iterable instanceof Array)) {
    return console.log("传入参数必须是一个数组");
  }
  return new MyPromise((resolve, reject) => {
    iterable.forEach((p) => {
      if (isPromise(p)) {
        p.then((value) => {
          resolve(value);
        }).catch((err) => {
          reject(err);
        });
      } else if (typeof p === "function") {
        resolve(p());
      } else {
        resolve(p);
      }
    });
  });
};
// const p1 = new MyPromise((resolve, reject) => {
//   console.log("状态pending");
//   resolve("22222");
//   reject("3333333");
// });

// p1.then((res) => {
//   console.log("res1:", res);
//   return "第二次的成功回调";
// })
//   .catch((error) => {
//     console.log("err1:", error);
//     throw new Error("第二次的失败回调");
//   })
//   .finally(() => {
//     console.log("finally");
//   });
// (async function() {
//   const res = MyPromise.all([
//     new MyPromise((resolve) => {
//       resolve(1);
//     }),
//     new MyPromise((resolve) => {
//       resolve(2);
//     }),
//     () => {
//       return 123;
//     },
//     88888,
//   ]);
//   res.then((res) => {
//     console.log(res);
//   });
// })();

// (async function() {
//   const res = MyPromise.race([
//     new MyPromise((resolve) => {
//       resolve(1);
//     }),
//     new MyPromise((resolve) => {
//       resolve(2);
//     }),
//   ]);
//   res.then((res) => {
//     console.log(res);
//   });
// })();
