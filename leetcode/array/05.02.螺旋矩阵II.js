/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function(n) {
  let startX = (startY = 0);
  let loop = Math.floor(n / 2);
  let mid = Math.floor(n / 2);
  let offset = 1; // 每一层的偏移量
  let number = new Array(n).fill(0).map(() => new Array(n).fill(0));
  let count = 1;
  while (loop--) {
    let row = startX,
      col = startY;
    for (; col < startY + n - offset; col++) {
      number[row][col] = count++;
    }
    for (; row < startX + n - offset; row++) {
      number[row][col] = count++;
    }
    for (; col > startY; col--) {
      number[row][col] = count++;
    }
    for (; row > startX; row--) {
      number[row][col] = count++;
    }
    startX++;
    startY++;
    offset += 2;
  }
  if (n % 2 === 1) {
    number[mid][mid] = count;
  }
  return number;
};

console.log(generateMatrix(1));
console.log(generateMatrix(2));
console.log(generateMatrix(3));
console.log(generateMatrix(4));
