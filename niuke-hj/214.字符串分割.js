/**
 * 214.字符串分割
 * 给定一个非空字符串S，其被N个‘-’分隔成N+1的子串，
 * 给定正整数K，要求除第一个子串外，其余的子串每K个字符组成新的子串，
 * 并用‘-’分隔。对于新组成的每一个子串，
 * 如果它含有的小写字母比大写字母多，
 * 则将这个子串的所有大写字母转换为小写字母；
 * 反之，如果它含有的大写字母比小写字母多，
 * 则将这个子串的所有小写字母转换为大写字母；
 * 大小写字母的数量相等时，不做转换。
 *
 * 输入描述:
 * 输入为两行，第一行为参数K，第二行为字符串S。
 * 输出描述:
 * 输出转换后的字符串。
 *
 * 示例1
 * 输入
 * 3
 * 12abc-abCABc-4aB@
 * 输出
 * 12abc-abc-ABC-4aB-@
 * 说明
 * 子串为12abc、abCABc、4aB@，
 * 第一个子串保留，后面的子串每3个字符一组为abC、ABc、4aB、@，
 * abC中小写字母较多，转换为abc，ABc中大写字母较多，转换为ABC，
 * 4aB中大小写字母都为1个，不做转换，
 * @中没有字母，连起来即12abc-abc-ABC-4aB-@
 *
 * 示例2
 * 输入
 * 12
 * 12abc-abCABc-4aB@
 * 输出
 * 12abc-abCABc4aB@
 * 说明
 * 子串为12abc、abCABc、4aB@，第一个子串保留，
 * 后面的子串每12个字符一组为abCABc4aB@，
 * 这个子串中大小写字母都为4个，不做转换，连起来即12abc-abCABc4aB@
 */

function stringSplit(num, str) {
  let first_ = str.indexOf("-");
  if (!first_) return str;
  let arr = [...str];
  let new_str = [String(arr.splice(0, first_).toString()).replace(/\,/g, "")];
  arr = arr.filter((item) => item !== "-");
  let len = parseInt(arr.length / num);
  for (let i = 0; i < len + 1; i++) {
    let newStr = "";
    let min = 0;
    let max = 0;
    let linStr = i === len ? arr.length : num;
    for (let j = 0; j < linStr; j++) {
      //   console.log(linStr);
      let s = arr.splice(0, 1)?.[0];
      if (s >= "a" && s <= "z") {
        min++;
      } else if (s >= "A" && s <= "Z") {
        max++;
      }
      //   console.log(s, j);
      newStr += s;
    }
    // console.log(newStr, arr);
    if (max > min) {
      new_str.push(newStr.toLocaleUpperCase());
    } else if (max < min) {
      new_str.push(newStr.toLowerCase());
    } else {
      new_str.push(newStr);
    }
  }

  return new_str.filter((item) => !!item).join("-");
}

console.log(stringSplit(3, "12abc-abCABc-4aB@"));
console.log(stringSplit(4, "12abc-abCABc-4aB@"));
console.log(stringSplit(5, "12abc-abCABc-4aB@"));
console.log(stringSplit(12, "12abc-abCABc-4aB@"));
