// status 
const PROMISE_STATUE_PENDING = "pending"; // 进行中
const PROMISE_STATUE_FULFILLED = 'fulfilled'; // 已完成
const PROMISE_STATUE_REJECTED = 'rejected'; // 已拒绝

class MyPromise {
    constructor(executer) {
       this.statue = PROMISE_STATUE_PENDING;
       this.value = void 0;
       this.error = void 0;
       this.resFns = [];
       this.errFns = [];
       const resolve = ((value) => {
            if(this.statue === PROMISE_STATUE_PENDING) {
                queueMicrotask(() => {
                    if(this.statue !== PROMISE_STATUE_PENDING) return;
                    this.statue = PROMISE_STATUE_FULFILLED;
                    this.value = value;
                    this.resFns?.forEach(fn => {
                        fn(this.value);
                    });
                });
            }
            
       });

       const reject = ((error) => {
            if(this.statue === PROMISE_STATUE_PENDING) {
                queueMicrotask(() => {
                    if(this.statue !== PROMISE_STATUE_PENDING) return;
                    this.statue = PROMISE_STATUE_REJECTED;
                    this.error = error;
                    this.errFns.forEach(en => {
                        en(this.error);
                    });
                });
            }
            
        });
       executer(resolve, reject);
    }
    then(resFn, errFn) {
        const defaultOnRejected = err => {
            throw err;
        }
        errFn = errFn || defaultOnRejected;

        const defaultOnFulFilled = value => {
            return value;
        }
        resFn = resFn || defaultOnFulFilled;

        return new MyPromise((resolve, reject) => {
            if(this.statue === PROMISE_STATUE_FULFILLED  && !!resFn) {
                try {
                    const value = resFn(this.value);
                    resolve(value);
                } catch (error) {
                    reject(error);
                }
            }
            if(this.statue === PROMISE_STATUE_REJECTED && !!errFn) {
                try{
                    resolve(value);
                }catch(error){
                    reject(error);
                }
            }
            if(this.statue === PROMISE_STATUE_PENDING) {
                if(!!resFn) {
                    this.resFns.push(() => {
                        try {
                            const value = resFn(this.value);
                            resolve(value);
                        } catch (error) {
                            reject(error);
                        }
                    });
                }
                
                if(!!errFn) {
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
        })
        
    }
    catch(errFn){
        return this.then(undefined, errFn);
    }

    finally(fn) {
        setTimeout(() => {
            fn();
        }, 0);
    }
 }

 const p1 = new MyPromise((resolve, reject) => {
    console.log('状态pending');
    // resolve('22222');
    reject('3333333');
 });

 p1.then(res => {
    console.log('res1:', res);
    return '第二次的成功回调'
 }).catch(error => {
    console.log('err1:', error);
    throw new Error('第二次的失败回调');
 }).finally(()=> {
    console.log('finally');
 });