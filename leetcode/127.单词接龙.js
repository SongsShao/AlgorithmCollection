/**
 * 字典 wordList 中从单词 beginWord 和 endWord 的 转换序列
 * 是一个按下述规格形成的序列 beginWord -> s1 -> s2 -> ... -> sk：
 *
 * 每一对相邻的单词只差一个字母。
 *  对于 1 <= i <= k 时，每个 si 都在 wordList 中。注意， beginWord 不需要在 wordList 中。
 * sk == endWord
 * 给你两个单词 beginWord 和 endWord 和一个字典 wordList ，
 * 返回 从 beginWord 到 endWord 的 最短转换序列 中的 单词数目 。如果不存在这样的转换序列，返回 0 。
 *
 * 示例 1：
 *
 * 输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
 * 输出：5
 * 解释：一个最短转换序列是 "hit" -> "hot" -> "dot" -> "dog" -> "cog", 返回它的长度 5。
 * 示例 2：
 *
 * 输入：beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
 * 输出：0
 * 解释：endWord "cog" 不在字典中，所以无法进行转换。
 *
 * 提示：
 * 1 <= beginWord.length <= 10
 * endWord.length == beginWord.length
 * 1 <= wordList.length <= 5000
 * wordList[i].length == beginWord.length
 * beginWord、endWord 和 wordList[i] 由小写英文字母组成
 * beginWord != endWord
 * wordList 中的所有字符串 互不相同
 *
 * 来源：力扣（LeetCode）
 * 链接：https://leetcode.cn/problems/word-ladder
 * 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 */

function ladderLength(beginWord, endWord, wordList) {
  // 第 1 步：先将 wordList 放到哈希表里，便于判断某个单词是否在 wordList 里
  let wordSet = new Set(wordList);
  if (wordSet.size === 0 || !wordSet.has(endWord)) {
    return 0;
  }
  // 删除第一个单词
  wordSet.delete(beginWord);
  // 第 2 步：图的广度优先遍历，必须使用队列和表示是否访问过的 visited 哈希表
  const queue = new Array();
  queue.push(beginWord);
  const visited = new Set();
  visited.add(beginWord);

  // 第 3 步：开始广度优先遍历，包含起点，因此初始化的时候步数为 1
  let step = 1;
  while (!(queue.length === 0)) {
    let currentSize = queue.length;
    // console.log(currentSize);
    for (let i = 0; i < currentSize; i++) {
      let currentWord = queue.shift();
      let isTrue = isExist(currentWord, endWord, queue, visited, wordSet);
      if (isTrue) {
        return step + 1;
      }
      // console.log(step, endWord, queue);
    }
    step++;
  }
  return 0;
}

/**
 *
 * @param {*} currentWord 当前单词
 * @param {*} endWord 结束单词
 * @param {*} queue 已经遍历的对列
 * @param {*} visited 是否访问过hash表
 * @param {*} wordSet  先将 wordList 放到哈希表里，便于判断某个单词是否在 wordList 里
 */

function isExist(currentWord, endWord, queue, visited, wordSet) {
  let arr = [...currentWord];
  for (let i = 0; i < endWord.length; i++) {
    const originChar = arr[i];
    for (let c = 0; c < 26; c++) {
      let res = String.fromCharCode(97 + c);
      if (res === originChar) {
        continue;
      }
      arr[i] = res;
      let nextWord = arr.join("");
      // 判断是否存在
      if (wordSet.has(nextWord)) {
        if (nextWord === endWord) {
          return true;
        }
        if (!visited.has(nextWord)) {
          queue.push(nextWord);
          // 注意：添加到队列以后，必须马上标记为已经访问
          visited.add(nextWord);
        }
      }
    }
    arr[i] = originChar;
  }
  return false;
}
console.log(
  ladderLength("hit", "cog", ["hot", "dot", "dog", "lot", "log", "cog"])
);
