/**
 * 二分查找法
 * 
 * 二分查找针对的是一个有序的数据集合，查找思想有点类似于分治思想。
 * 每次都通过跟区间的中间元素对比，待查找的区间缩小为之前的一半，等找到要查找到的元素，或者区间被缩小为0. 
 * 时间复杂度为O(logn)，非常高效的时间复杂度。
 * 
 * 
 * 
 * 二分查找的局限性
 * 1）只能依赖于数组的这种数据结构，因为二分查找依赖于随机访问下标。
 * 2）只能依赖于有序的数组。如果数据还没排序过，需要先排序再进行二分查找
 * 3）只能使用与一组静态的数据，也就是说数据不能频繁的插入和删除。因为插入删除后无法保证数组是否还依然有序。
 * 4）数据量太小或太大都不适用二分查找
 */

/**
 * 最简单的情况 有序数组中不存在重复元素
 */
function binarySearch_1(array,value){
    return binarySearch_1_Internally(array,value,0,array.length-1)
}
function binarySearch_1_Internally(array,value,low,high){
    if(low>high) return -1;//没找到返回-1,找到了返回下标
    if(low == high ){
        if(array[low] == value){
            return low;

        }else{
            return -1
        }
    }
    let mid = Math.floor((low + high)/2);
    if(array[mid] == value){
        return mid;
    }else if(array[mid]> value){
        //搜索左边
        return binarySearch_1_Internally(array,value,low,mid-1);
    }else{
        //搜索右边
        return binarySearch_1_Internally(array,value,mid+1,high);
    }
}
function binarySearch_1_While(array,value){
    let low = 0,high = array.length-1;
    while(low <= high){
        let mid = Math.floor((low+high)/2);
        if(array[mid] == value){return mid;}
        else if(array[mid]>value){
            high = mid-1;
        }else{
            low = mid+1;
        }
    }
    return -1;
}


/**
 * 二分查找的变体
 * 
 * a.查找第一个等于给定值的元素
 * b.查找最后一个等于给定值的元素
 * c.查找第一个大于等于给定值的元素
 * d.查找最后一个小于等于给点值的元素
 * 
 * 
 * 
 */
//查找第一个出现的
function searchA(nums,value){
    let low = 0,high = nums.length -1;
    while (low <= high){
        let mid = low + ((high - low)>> 1);
        if(nums[mid] == value){
            if(mid == 0 || nums[mid-1]!= value){
                return mid;
            }else{
                high = mid - 1;
            }
        }else if(nums[mid]>value){
            high = mid -1;
        }else{
            low = mid + 1
        }
    }
    return -1;
}
//查找最后一个出现的
function searchB(nums,value){
  
      let low = 0,high = nums.length -1;
      while(low <= high){
          let mid = low + ((high - low)>>1);
          if(nums[mid] == value){
              if(mid==nums.length-1 || nums[mid+1]!= value){
                  return mid;
              }else{
                  low = mid+1;
              }
          }else if(nums[mid]> value){
              high = mid - 1;
          }else{
              low = mid + 1;
          }
      }
      return -1;
}
//查找第一个大于等于的
function searchC(nums,value){
      let low = 0,high = nums.length - 1 ;
      while(low <= high){
          let mid = low + ((high - low)>>1);
          if(nums[mid]>= value){
              if(mid == 0 || nums[mid-1]<value){
                  return mid;
              }else{
                  high = mid -1;
              }
          }else{
              low = mid + 1;
          }
      }
      return -1;
}
//查找最后一个小于等于的
function searchD(nums,value){
      let low = 0,high = nums.length-1;
      while(low <= high){
          let mid = low + ((high - low) >> 1);
          if(nums[mid]<=value){
              if(mid == nums.length -1 || nums[mid -1]>value){
                  return mid;
              }else{
                  low = mid + 1;
              }
          }else{
              high = mid -1;
          }
      }
      return -1;
  
}


/**
 * 力扣 35. 搜索插入位置 https://leetcode-cn.com/problems/search-insert-position/
 * 
 * 
 * 如果存在，就返回索引，说过不存在就返回它可以插入的位置
 * 
 * 如果存在就返回索引：就是最基本的二分查找
 * 
 * 不存在就返回它可以插入的位置 这句话的理解就很关键了，这个符合我们上面的cd这两种情况都可以。
 * 但是要注意的是，等最大的元素都比它小，最小的都比它它这两种额外的情况
 * 
 * 
 */
var searchInsert = function(nums, target) {
    let length =  nums.length, low = 0,high = length-1,mid = 0;
    if(nums[0]>target) return 0;
    if(nums[high] < target) return length;
    while(low <= high){
        mid = low + ((high - low) >> 1);
        if(nums[mid]<target){
            low = mid + 1;
        }else{
            // 》= 第一个大于等于
            if(mid == 0 || nums[mid - 1] < target){
                return mid
            }else{
                high = mid -1;
            }
        }
    }
    return mid
};



/**
 * 力扣 69. Sqrt(x)
 * 给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

x=4 => 2
x=8 => 2

这道题可以演变为 查找最后一个 自己乘积小于target的：
比如 输入一个target 9
low=0,high=9,mid = 5
5*5 > 9 所以继续往左边查找

low =0 high = 4,mid = 2
2*2 <9 ,但是右边的值 3*3=9 不是最后一个小于的 所以继续往右边查找

low = 3 high = 4,mid = 4
4*4 > 9 所以继续往左边查找

low = 3 high = 3,mid = 3
3*3 ==9 退出 返回 mid=3


再比如输入target 8
low = 0,high = 8,mid=4
4*4 > 8 所以继续往左边查找

low = 0,high = 3,mid = 2
2*2<8,然后后面一个值 3*3>8 所以2是最后一个小于等于的 返回2

*/
var mySqrt = function(x) {
    let low = 0,high = x,mid=1;
    while(low<=high){
        mid = low + ((high - low) >> 1);
        if(mid * mid > x){
            high = mid - 1;
        }else{
            let next = mid + 1;
            if(next * next > x){
                return mid
            }else{
                low = next;
            }
        }
    }
    return mid;
};

/**
 * 剑指 Offer 53 - II. 0～n-1中缺失的数字
 * 二分法处理，如果中间的元素 值等于序号，那么左边的元素都是没问题的，查找右边的元素i=mid+1
 * 如果中间的值不等于序号，那么左边的值就是有问题的，查找左边的元素j=mid-1;
 */
 var missingNumber = function(nums) {
    let i = 0,j = nums.length-1;
    while(i<=j){
        let mid = Math.floor((i+j)/2);
        if(nums[mid] == mid){i = mid+1;}
        else{j = mid-1;}
    }
    return i;
};

/**
 * 力扣 167. 两数之和 II - 输入有序数组 https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted/
 * 给定一个已按照 非递减顺序排列  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。

    函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 1 开始计数 ，所以答案数组应当满足 1 <= answer[0] < answer[1] <= numbers.length 。

    你可以假设每个输入 只对应唯一的答案 ，而且你 不可以 重复使用相同的元素。

     
    示例 1：

    输入：numbers = [2,7,11,15], target = 9
    输出：[1,2]
    解释：2 与 7 之和等于目标数 9 。因此 index1 = 1, index2 = 2 。
    示例 2：

    输入：numbers = [2,3,4], target = 6
    输出：[1,3]
    示例 3：

    输入：numbers = [-1,0], target = -1
    输出：[1,2]
     

    来源：力扣（LeetCode）
    链接：https://leetcode-cn.com/problems/two-sum-ii-input-array-is-sorted
    著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
 * 
 * 
 */
    var twoSum = function(numbers, target) {
        let length = numbers.length,result = [];
        for(let i = 0;i<length-1;i++){
            let cur = numbers[i],low = i+1,high = length - 1;
            while(low <= high){
                let mid = low + ((high - low) >> 1);
                if(numbers[mid] + cur == target){
                    result = [i+1,mid+1];
                    break;
                }else if(numbers[mid] + cur > target){
                    high = mid - 1;
    
                }else {
                    low = mid + 1;

                }
            }
        }
       
        return result;
    };





/**
 * 
 * 349. 两个数组的交集
 * 给定两个数组，编写一个函数来计算它们的交集。

 

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
 
可以理解成查找最后一个等于的
 * 
 */
//这样写是错的，因为输出的顺序不对，所以不允许先排序
var intersection = function(nums1, nums2) {
    let result = [];
    nums1 = nums1.sort();
    nums2 = nums2.sort();
    for(let i = 0;i<nums1.length;i++){
        let temp = nums1[i];
        let low = 0,high = nums2.length-1;
        while(low<=high){
            let mid = low + ((high - low) >> 1);
            if(nums2[mid] == temp){
                if(mid == nums2.length || nums2[mid+1] != temp){
                    result.push(temp);
                }else{
                    low = mid + 1;
                }
            }else if(nums2[mid]>temp){
                high = mid - 1;
            }else{
                low = mid + 1;
            }
        }
    }
    return result

};