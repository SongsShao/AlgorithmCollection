function reverseWords(s: string): string {
  function removeSpend(arr: string[]): void {
    let left: number = 0;
    let right: number = 0;
    let len: number = arr.length;
    while (right < len && arr[right] === " ") {
      right++;
    }
    while (right < len) {
      if (arr[right] === " " && arr[right - 1] === " ") {
        right++;
        continue;
      }
      arr[left++] = arr[right++];
    }
    if (arr[left - 1] === " ") {
      arr.length = left - 1;
    } else {
      arr.length = left;
    }
  }

  function reverse(arr: string[], start: number, end: number) {
    let temp: string;
    while (start < end) {
      temp = arr[start];
      arr[start] = arr[end];
      arr[end] = temp;
      start++;
      end--;
    }
  }

  let arr: string[] = s.split("");
  removeSpend(arr);
  let len: number = arr.length;
  reverse(arr, 0, len - 1);
  let start: number = 0;
  let end: number = 0;
  while (start < len) {
    end = start;
    while (arr[end] !== " " && end < len) {
      end++;
    }
    reverse(arr, start, end - 1);
    start = end + 1;
  }
  return arr.join("");
}

console.log(reverseWords("the sky is blue"));
