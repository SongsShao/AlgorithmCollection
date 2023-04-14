function minWindow(s, t) {
  const charCount = new Map(); // 存储 t 中每个字符出现的次数
  for (const char of t) {
    charCount.set(char, charCount.has(char) ? charCount.get(char) + 1 : 1);
  }

  let left = 0,
    right = 0; // 滑动窗口的左右指针
  let formed = 0; // 当前窗口中已形成完整的 t 中字符的数量
  let result = ""; // 记录最小子串

  while (right < s.length) {
    const char = s[right];
    if (charCount.has(char)) {
      charCount.set(char, charCount.get(char) - 1);
      if (charCount.get(char) === 0) formed++; // 当前窗口中已形成完整的 t 中字符的数量加 1
    }

    while (formed === charCount.size) {
      // 当前窗口已经包含了 t 中所有字符
      const windowSize = right - left + 1;
      if (result === "" || windowSize < result.length) {
        result = s.substr(left, windowSize); // 更新最小子串
      }

      const leftChar = s[left];
      if (charCount.has(leftChar)) {
        if (charCount.get(leftChar) === 0) formed--; // 当前窗口中已形成完整的 t 中字符的数量减 1
        charCount.set(leftChar, charCount.get(leftChar) + 1);
      }
      left++; // 移动左指针，缩小窗口
    }

    right++; // 移动右指针，扩大窗口
  }

  return result;
}
