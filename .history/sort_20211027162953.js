//排序、查找

/**
 * 
 * 冒泡排序
 * 冒泡排序只会操作相邻的两个数据。每次操作对相邻的两个元素进行比较，如果满足大小关系要求，就不动，
 * 如果不满足则将两个元素进行调换。
 * 为什么冒泡的空间负责度是n的平方呢？
 * 因为每一次冒泡，只会对一个元素进行排序完成，如果n个元素，就要进行n * n的操作
 */

function bubbleSort(nums){
    for(let i = 0;i<nums.length;i++){
        for(let j = 0;j<nums.length-i;j++){
            if(nums[j]>nums[j+1]){
                let temp = nums[j];
                nums[j] = nums[j+1];
                nums[j+1] = temp;
            }
        }
    }
    return nums;
}



/**
 * 
 * 插入排序
 */












































/**
 *1、 数组中如果是已经有序的，查找某个元素的，使用二分法
 * 
 */

 /**剑指 Offer 03. 数组中重复的数字 https://leetcode-cn.com/problems/shu-zu-zhong-zhong-fu-de-shu-zi-lcof/
  * 解题思路：先对数组进行排序，然后遍历数组，只要和相邻的元素相等，那么这个元素就是重复的，输出即可
  */
  function compare(a,b){return a-b;}
  var findRepeatNumber = function(nums) {
      //先排序 排序完 遍历数组 查看相邻元素是否一致
      nums = nums.sort(compare);
      for(let i = 0;i<nums.length-1;i++){
          if(nums[i] == nums[i+1]){
              return nums[i]
          }
      }
  };

  /**
   * 剑指 Offer 53 - I. 在排序数组中查找数字 I https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof/
   * 解题思路：最暴力的方法 遍历 然后查找
   * 还有一个二分法，一会讲解完二分法以后，再用二分法进行解题
   * 
   */
   var search = function(nums, target) {
    let count = 0;
    for(let i = 0; i< nums.length;i++){
        if(nums[i] == target){count++;}
    }
    return count
};