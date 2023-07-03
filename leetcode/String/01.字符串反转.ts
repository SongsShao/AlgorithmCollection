/**
 Do not return anything, modify s in-place instead.
 */
function reverseString(s: string[]): void {
  let left: number = 0;
  let right: number = s.length - 1;
  while (right > left) {
    swap(s, left, right);
    left++;
    right--;
  }
}

function swap(s, a, b) {
  let temp = s[b];
  s[b] = s[a];
  s[a] = temp;
}
