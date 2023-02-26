/**
 * 215.组成最大数
 * 小组中每位都有一张卡片，卡片上是6位内的正整数，将卡片连起来可以组成多种数字，计算组成的最大数字。
 * 
 * 输入描述:
 * “,”号分割的多个正整数字符串，不需要考虑非数字异常情况，小组最多25个人
 * 输出描述:
 * 最大的数字字符串
 * 
 * 示例1
 * 输入
 * 22,221
 * 输出
 * 22221
 * 
 * 示例2
 * 输入
 * 4589,101,41425,9999
 * 输出
 * 9999458941425101
 */

function largetNumbe(arr) {
    if(arr.length <= 0) return '0';
    arr = arr.sort((a, b) => {
        let ax = 10, by = 10;
        // 缺点两个数都是相同位数
        while (ax <= a) {
            ax *= 10;
        }

        while (by <= b) {
            by *= 10;
        }
        return '' + (b * ax + a ) - ('' + (a * by + b));
    })
    return arr.join('')
}

console.log(largetNumbe([]));
console.log(largetNumbe([4589, 101, 41425, 9999]));
console.log(largetNumbe([22,221]));