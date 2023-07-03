function threeSum(nums: number[]): number[][] {
  let result: number[][] = [];
  //   将数组进行排序从小到大
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    // 如果第一个值大于零直接返回
    if (nums[i] > 0) return result;
    // 去重第一个位置
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    // 第二个和第三个数，采用双指针法
    let left = i + 1,
      right = nums.length - 1;

    while (right > left) {
      let sum = nums[i] + nums[left] + nums[right];

      //   如果之和大于0 最右侧指针左移
      if (sum > 0) right--;
      //   如果之和小于0 左侧指针右移
      else if (sum < 0) left++;
      else {
        // 存储三元组信息
        result.push([nums[i], nums[left], nums[right]]);
        left++;
        right--;
        // 去重第二第三个元素
        while (nums[right] === nums[right + 1]) right--;
        while (nums[left] === nums[left - 1]) left++;
      }
    }
  }
  return result;
}
