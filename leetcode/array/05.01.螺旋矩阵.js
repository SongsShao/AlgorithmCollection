/**
 *  1,   2,   3,   4,   5
 *  _____________________
 * |6,   7,   8,   9,  10|
 *       ————————————    |
 *  11, 12,  13,  14,  15|
 *  ————————————————
 *
 *
 */

/**
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function(matrix) {
  let top = (left = 0);
  let down = matrix.length - 1,
    right = matrix[0].length - 1;
  let newMatrix = new Array();
  while (true) {
    for (let i = left; i <= right; i++) {
      newMatrix.push(matrix[top][i]);
    }
    top++;
    if (top > down) break;
    for (let j = top; j <= down; j++) {
      newMatrix.push(matrix[j][right]);
    }
    right--;
    if (left > right) break;
    for (let i = right; i >= left; i--) {
      newMatrix.push(matrix[down][i]);
    }

    down--;
    if (top > down) break;
    for (let j = down; j >= top; j--) {
      newMatrix.push(matrix[j][left]);
    }
    left++;
    if (left > right) break;
  }
  return newMatrix;
};

console.log(
  spiralOrder([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ])
);

console.log(
  spiralOrder([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
  ])
);
