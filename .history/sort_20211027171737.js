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
    if(nums <= 1) return nums;
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
 * 
 * 插入排序的概念：将数组中的数据分为两个区间，已排序的区间和未排序的区间。初始已排序区间就是数组中的第一个元素。
 * 从未排序区间中的元素，在已排序区间中找到合适的插入位置将其插入，并保证已排序区间数据一直有序。
 * 重复这个过程，知道未排序区间中元素为空，算法结束;
 * 首先i代表未排序的区间，j代表已经排序的区间。
 * 每次遍历，我们都需要做两个操作，一是先把比需要插入元素大的元素，全部往后移一位，腾出空间给元素插入。
 * 二是，插入这个元素。
 * 所以我们每次遍历的时候，如果碰到比插入元素大的，全部执行nums[j+1] = nums[j]
 * 这个循环结束了以后，代表已经找到可以插入的位置了，再把元素插入到j中(因为每一次执行完都已经把j--了，所以插入的时候要+1)
 */
function inserSort(nums){
   
    if(nums.length <= 1) return nums;
    for(let i = 1;i< nums.length;i++){
        let temp = nums[i];
        let j = i-1;
        for(j;j>=0;j--){
            if(nums[j]>temp){
               nums[j+1] = nums[j]
            }else{
                break;
            }
        }
        nums[j+1] = temp

    }
    return nums;
}


/**
 * 
 * 选择排序
 * 选择排序和插入排序有点像，也是分成已排序区间和未排序区间，不过和插入排序不一样的是，
 * 选择排序是每次重未排序区间中找到一个最小的值插入到已排序区间中的末尾。
 */
function selectionSort(nums){
    if(nums.length<=1) return nums;
    for(let i = 0;i<nums.length;i++){
       let min = nums[i];
        for(let j = i;j<nums.length;j++){
            let temp = nums[j];
           if(nums[j]<min){
               nums[j] = min
               min = temp
           }else{
               break;
           }
        }
        nums[i] = min;
       
    }
    return nums;
}








































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