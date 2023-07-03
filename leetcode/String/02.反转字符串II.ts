function reverseStr(s: string, k: number): string {
  let left: number, right: number;
  let sArr: string[] = s.split("");
  let length: number = 0;
  let temp: string;
  for (let i = 0, length = sArr.length; i < length; i += 2 * k) {
    left = i;
    right = i + k - 1 >= length ? length - 1 : i + k - 1;
    while (left < right) {
      temp = sArr[left];
      sArr[left] = sArr[right];
      sArr[right] = temp;
      left++;
      right--;
    }
  }
  return sArr.join("");
}
