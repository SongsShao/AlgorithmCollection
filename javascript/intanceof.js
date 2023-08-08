/**
 * instanceof 操作符的实现原理及实现
 * instanceof 运算符用于判断构造函数的 prototype 属性是否出现 在对象的原型链中的任何位置。
 * @param {*} params
 */
function myInstanceof(left, right) {
  // 获取对象的原型
  let proto = Object.getPrototypeOf(left);
  // 获取构造函数的prototype 对象
  let protoType = right.prototype;

  // 判断构造韩式的 prototype 对象是否在对象的原型链上
  while (true) {
    if (!proto) return false;

    if (proto === protoType) return true;

    // 如果没有找到，就继续从原型上找，Object.getPrototypeOf 方法来获取指定对象的原型
    proto = Object.getPrototypeOf(proto);
  }
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

const john = new Person("John", 30);

console.log(john instanceof Person); // true
console.log(john instanceof Object); // true
console.log(myInstanceof(john, Object));
console.log(myInstanceof(john, Person));
console.log(myInstanceof("a", Boolean));
console.log(myInstanceof(2, Number));
console.log(myInstanceof([], Array));
