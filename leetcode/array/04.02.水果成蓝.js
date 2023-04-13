/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
  let start = 0;
  let max = 0;
  let set = new Map();
  for (let end = 0; end < fruits.length; end++) {
    let fruit = fruits[end];
    if (!set.has(fruit)) {
      set.set(fruit, 0);
    }
    set.set(fruit, set.get(fruit) + 1);
    while (set.size > 2) {
      let startNum = fruits[start];
      set.set(startNum, set.get(startNum) - 1);
      if (set.get(startNum) === 0) {
        set.delete(startNum);
      }
      start++;
    }
    max = Math.max(end - start + 1, max);
  }
  return max;
};

// console.log(totalFruit([1, 2, 1]));
// console.log(totalFruit([0, 1, 2, 2]));
// console.log(totalFruit([1, 2, 3, 2, 2]));
console.log(totalFruit([3, 3, 3, 1, 2, 1, 1, 2, 3, 3, 4]));
