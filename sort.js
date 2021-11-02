//排序、查找

//v8引擎的sort 采用的是插入排序和快速排序，数组中元素少于10的时候采用插入排序，大于10的时候采用快速排序



/***************************************时间复杂度是n的平方，适合小规模数据的排序****************************************************** */

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
 * 选择排序是每次从未排序区间中找到一个最小的值插入到已排序区间中的末尾。
 * 那么可以这样去思考，首先我每次拿当前i对应的元素作为最小值，然后用它去和每个j进行比较
 * 如果比这个元素还小的值，就先把后面的值存放这个比较小的值，直到退出循环，则找到了最小的值，此时再把num[i]进行赋值
 */
function selectionSort(nums){
  if(nums.length <= 1) return nums;
  for(let i=0;i<nums.length;i++){
      let min = nums[i];
      for(let j = i;j<nums.length;j++){
          let temp = nums[j];
          if(temp<min){
              nums[j] = min;
              min = temp;
          }
      }
      nums[i] = min;
  }
  return nums;
}


/****************************时间复杂度为nlog(n)，适合大规模数据的排序******************************************** */


/**
 * 
 *归并排序
 *归并排序就是，把区间p-r分成两个部分 p~q,q+1~r,每次先对p~q 、q+1~r进行排序,然后再把这两个区间 合并成有序的p~r.
 *这个过程就是不断的执行上面的过程，因为不断的对区间进行切割，这也就是一个递归的过程。
 */

 function mergeSort(nums){
     //归并排序
    let p = 0,r = nums.length,q = Math.floor(r/2);
    if(r == 1) return nums;
    let left = nums.slice(p,q);
    let right = nums.slice(q,r);
    return merge(mergeSort(left),mergeSort(right));
 }
 
 function merge(nums1,nums2){
     //合并两个有序数组
     //合并的算法：新建一个新的数组，每次都对两个数组中的元素进行比较，较小的元素先进入这个数组。最后如果其中一个数组
     //已经结束的话，就把另一个数组剩下的元素全部搬迁到这个新数组中
     let i = 0,j = 0,a_length = nums1.length,b_length = nums2.length;
     let newArray = [];
     while(i<a_length && j<b_length){
         if(nums1[i]<nums2[j]){
             newArray.push(nums1[i]);
             i++;
         }else{
             newArray.push(nums2[j]);
             j++;
         }
     }
     //退出循环了，肯定是有一个数组空了
     if(i<=a_length){
        newArray =  newArray.concat(nums1.slice(i,a_length));
     }
     if(j<=b_length){
        newArray =  newArray.concat(nums2.slice(j,b_length));
     }
     return newArray;

 }







/**
    * 
    * 快速排序
    * 
    * 
    * 8 10 2 3 6 1 5
    * 此时 p指向8，r指向5，q指向5，i=0,j=6
    * 
    * 首先 i从作向右走，找到一个比p大的值，找到了就停下来，那么第一个就是了，此时p=8,i=0
    * 然后 j从右向左走，找到一个比p小的值，找到了就停下来，此时走到1的时候发现1比5小，r = 1，j = 5
    * 然后p 和 r 互换变成了 1 10 2 3 6 8 5
    * 在继续往下走 i++ ,j--
    * 
    * 此时i继续往右走，，此时发现10比5大，i停下来了,p=10,j=1
    * 然后j往左走，走到6比5大继续往左走，走到3的时候发现3比5要小，于是停下来，此时r = 3，j=3
    * 交换两个值 此时数组变成 1 3 2 10 6 8 5
    * 
    * 此时继续往下走，i++,j--
    * 
    * i继续往右走，此时发现了10比5大，停了下来此时p=10,i = 3
    * 此时发现i停在了j所在的地方，i和j相遇，退出这次循环
    * 
    * 
    * 
    * 然后比较当前i和j相遇时候的值p 10 与5相比，发现5比10要小 交换两个值
    * 完成了一次遍历后 数组就变成了下面这样 1 3 2 5 6 8 10
    * 
    * 可以发现 此时5左边的逗比5小，右边的比5大。
    * 此时i=j=3,然后对两边进行上面同样的操作
    * 
    * 那么此时数组分成了1 3 2 和 6 8 10
    * 现对 1 3 2 进行上面的排序
    * 此时i = 0，j= 2 ，p= 1,q = 2
    * 发现1 比 2 小，继续往下走 走到 3 的时候发现 3 比 2大，停下来，此时p=3，i=1
    * 然后j往前走，也在3 这里停下来，发现 i= j,退出循环
    * 然后3 和2对比，2比3要小，交换两个值，此时左边变成了 1 2 3.
    * 
    * 接下来看看右边 6 8 10 
    * i往右走，发现6 、8 都比10小，然后i停在了10这里，此时p= 10，i= 2
    * 然后j还没走呢，发现j已经等于10了，退出循环
    * 此时对比两个值，发现一样的就不坐操作了
    * 
    * 
    * 此时所有循环结束 数组变成了 1 2 3 5 6 8 10,
    * 
    */
    function quickSort(nums){
        if(nums.length == 1) return nums;
        return quickSort_c(nums,0,nums.length-1);
    }
    function quickSort_c(nums,start,end){
        if(start >= end || nums.length == 1) return ;//不用进行排序
        let i = start,j = end,q = nums[end];
        while(i < j){
            while(nums[i]<=q && i<end){i++;}
            while(nums[j]>=q && j>0 && i<j){j--;}
            if(nums[i] != nums[j]){
                let temp = nums[i];
                nums[i] = nums[j];
                nums[j] = temp;
            }
        }
        if(nums[i]>q){
            let temp = nums[i];
            nums[i] = q;
            nums[end] = temp;
            q = nums[i];
        }
        quickSort_c(nums,start,i-1);
        quickSort_c(nums,i+1,end);
        return nums;
    }








/****************************线性排序 ******************************************** */
/****************************重点在于掌握使用这些排序的场景*******************************************************/


/**
 * 桶排序
 * 桶排序适合 数据存储在外部磁盘中，数据量比较大，内存有限的情况。
 * 桶排序就是先讲数据分到几个有序的桶里，然后再对每个桶进行快速排序。桶内排序完成后，再一次从每个桶里的数据取出来，就是有序的了。
 * 
 * 那么，桶排序是要在什么样的条件下才开始使用呢？
 * 1） 要排序的数据很容易就分成m个桶，并且桶之间有递增大小关系 
 * 2）数据在各个桶之间的分布是均匀的
 * 
 * 
 * 
 * 桶排序的难点在于，如何获取到桶的个数以及如何根据数值进入哪个桶
 * 
 * 桶的个数 = （最大值-最小值）/每个桶的大小
 * 
 * 我们来设想一下 那么怎么根据数值来进入桶呢
 * 5,1,10,6,7,15,19 size=5
 * min = 1, max=19 (19-1)/5 = 3 count = 4
 * 所以区间就变成了 1-5,6-10,11-15,16-20四个区间
 * 如何判断值处于哪个区间呢
 * 比如 5/size = 1 1/size=0 10/size=2 证明value/size是不可行的
 * 如果是(5-1)/size = 0 (1-1)/size = 0 (10-1)/size = 1
 * (6-1)/size = 1, (19-1)/size = 3
 * 
 * 所以应该是 (value-min)/size
 * 
 * 
 * 
 * 
 */

function bucketSort(nums,bucketSize){
    if(nums.length <=1) return nums
    //先获取到最大最小值
    let max = nums[0],min = nums[0],result = [],bucket = [];
    for(let i = 0; i< nums.length;i++){
        if(nums[i] < min) {min = nums[i];}
        if(nums[i] > max) {max = nums[i];}
    }
    //申请桶的个数，根据桶的size来设计桶的个数
    let count = Math.floor((max - min)/bucketSize) +1;
    for(let i = 0 ; i< count;i++){
        bucket[i] = [];
    } 
    //数据进入桶
    for(let i = 0;i < nums.length ; i++){
        bucket[Math.floor((nums[i] - min)/bucketSize)].push(nums[i]);
    }

    //桶内数据进行排序，此处使用快速排序,排序完成以后 接入到结果里面去
    for(let i = 0;i<count;i++){
        let array = quickSort(bucket[i]);
        result = result.concat(array)
    }
    return result

}




































function a(){}








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