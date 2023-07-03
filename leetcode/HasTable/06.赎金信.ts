function canConstruct(ransomNote: string, magazine: string): boolean {
  let helperArr: number[] = new Array(26).fill(0);
  let base: number = "a".charCodeAt(0);
  for (let i = 0; i < magazine.length; i++) {
    helperArr[magazine[i].charCodeAt(0) - base]++;
  }
  let index: number;
  for (let i = 0; i < ransomNote.length; i++) {
    index = ransomNote[i].charCodeAt(0) - base;
    if (!helperArr[index]) {
      return false;
    }
    helperArr[index]--;
  }
  return true;
}
