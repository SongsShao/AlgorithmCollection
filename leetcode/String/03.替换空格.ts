function replaceSpace(s: string): string {
  let arr: string[] = s.split("");
  let oldLength: number = arr.length;
  let spendLen: number = 0;
  for (let i = 0; i < oldLength; i++) {
    if (arr[i] === " ") {
      spendLen++;
    }
  }
  // console.log(spendLen, oldLength, oldLength + 2 * spendLen);
  arr.length = oldLength + 2 * spendLen;
  let cur = oldLength - 1;
  for (let i = arr.length - 1; i >= 0; i--, cur--) {
    if (arr[cur] !== " ") {
      arr[i] = arr[cur];
    } else {
      arr[i] = "0";
      arr[--i] = "2";
      arr[--i] = "%";
    }
  }
  return arr.join("");
}
