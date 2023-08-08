# 对 Promise 的理解

Promise 是异步编程的一种解决方案，它是一个对象，可以获取异步 操作的消息，他的出现大大改善了异步编程的困境，避免了地狱回调， 它比传统的解决方案回调函数和事件更合理和更强大。

所谓 Promise，简单说就是一个容器，里面保存着某个未来才会结束 的事件(通常是一个异步操作)的结果。从语法上说，Promise 是一 个对象，从它可以获取异步操作的消息。Promise 提供统一的 API， 各种异步操作都可以用同样的方法进行处理。

1. Promise 的实例有三个状态:

- Pending(进行中)

- Resolved(已完成)

- Rejected(已拒绝)

当把一件事情交给 promise 时，它的状态就是 Pending，任务完成了 状态就变成了 Resolved、没有完成失败了就变成了 Rejected。

2. Promise 的实例有两个过程:
    pending -> fulfilled : Resolved(已完成)
    pending -> rejected:Rejected(已拒绝)

    注意:一旦从进行状态变成为其他状态就永远不能更改状态了。

##### Promise 的特点

对象的状态不受外界影响。promise 对象代表一个异步操作，有三种 状态，pending(进行中)、fulfilled(已成功)、rejected(已失 败)。只有异步操作的结果，可以决定当前是哪一种状态，任何其他 操作都无法改变这个状态，这也是 promise 这个名字的由来——“承 诺”;

一旦状态改变就不会再变，任何时候都可以得到这个结果。promise 对象的状态改变，只有两种可能:从 pending 变为 fulfilled，从 pending 变为 rejected。这时就称为 resolved(已定型)。如果改 变已经发生了，你再对 promise 对象添加回调函数，也会立即得到这 个结果。这与事件(event)完全不同，事件的特点是:如果你错过 了它，再去监听是得不到结果的。

##### Promise 实现

Promise 实现是通过js class编写，主要包括status、value、error、resolve、reject、then、catch、all、race、allSettled、any等组成。

1. 状态

   ```ts
   const PROMISE_STATUE_PENDING = "pending"; // 进行中
   const PROMISE_STATUE_FULFILLED = "fulfilled"; // 已完成
   const PROMISE_STATUE_REJECTED = "rejected"; // 已拒绝
   ```

2. resolve 创建一个已解决的Promise对象，将给定的值作为其参数。

   ```js
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
   ```

   

3. reject 创建一个已拒绝的Promise对象，将给定的原因作为其参数

   ```js
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
   ```

   

4. then 添加对Promise对象解决或拒绝时的处理程序

   单个方法调用

   ```js
   constructor(executer) {
       this.statue = PROMISE_STATUE_PENDING;
       this.value = void 0;
       this.error = void 0;
       this.resFn;
       this.errFn;
   		
       executer(this.resolve, this.reject);
     }
   then(resFn, errFn) {
   	this.resFn = resFn;
     this.errFn = errFn;
   }
   ```

   

   ```
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
   ```

   

5. catch

6. all

7. race

##### Promise 的缺点

无法取消 Promise，一旦新建它就会立即执行，无法中途取消。

如果不设置回调函数，Promise 内部抛出的错误，不会反应到外部。

当处于 pending 状态时，无法得知目前进展到哪一个阶段(刚刚开始 还是即将完成)。

##### 总结:

Promise 对象是异步编程的一种解决方案，最早由社区提出。Promise 是一个构造函数，接收一个函数作为参数，返回一个 Promise 实例。 一个 Promise 实例有三种状态，分别是 pending、resolved 和 rejected，分别代表了进行中、已成功和已失败。实例的状态只能由 pending 转变 resolved 或者 rejected 状态，并且状态一经改变， 就凝固了，无法再被改变了。

状态的改变是通过 resolve() 和 reject() 函数来实现的，可以在 异步操作结束后调用这两个函数改变 Promise 实例的状态，它的原 型上定义了一个 then 方法，使用这个 then 方法可以为两个状态的 改变注册回调函数。这个回调函数属于微任务，会在本轮事件循环的 末尾执行。

注意:在构造 Promise 的时候，构造函数内部的代码是立即执行的。
