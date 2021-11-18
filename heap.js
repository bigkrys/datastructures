/**
 * 堆
 * 
 * 堆的概念：堆是一个完全二叉树，且堆中的每一个节点的值都必须大于等于（或小于等于）其子树中的每个节点的值。
 * 其中，每个节点大于等于其子树中每个节点的值的叫做大顶堆，节点小于等于其子树中每个节点的值叫做小顶堆。
 * 
 * 
 * 1、往堆里插入一个元素（大顶堆）
 * 当将新插入的元素放到堆的最后的时候，因为有可能不符合堆的特性，需要对堆进行调整，也叫作堆化。
 * 
 * 堆化实际上有两种：从上往下和从下往上、
 * 
 * 比如从下往上的堆化方法：顺着节点的路径，从上开始，对比，然后进行交换。
 * 比如一个堆如下
 * 
 *             33
 *       17            21
 *   16     13      15      9
 * 5   6   7   8   1   2
 * 
 * 
 * 就像上面这个二叉树，如果我们要插入一个元素22，先在叶节点的位置插入。就变成下面这样
 *              33
 *       17            21
 *   16     13      15      9
 * 5   6   7   8   1   2  22
 * 
 * 
 * 这个时候，因为22比9 21 要大，所以要进行堆化
 * 
 * 首先 我们将新插入的节点22跟它的父节点8先进行对比，发现两个不符合子节点小于父节点的关系，于是将两个节点进行互换。变成下面这样
 *              33
 *       17            21
 *   16     13      15      22
 * 5   6   7   8   1   2  9
 * 
 * 
 * 然后再讲22 当前的父节点21进行对比，发现还是不符合，又进行互换
 *               33
 *       17            22
 *   16     13      15      21
 * 5   6   7   8   1   2  9
 * 
 * 再将22与它的父节点33进行对比，发现符合22 比33小的关系。就停下来。此时堆化结束。
 * 
 * 
 * 
 * 
 * 2、删除堆顶元素
 * 因为堆的节点之间是有大小关系的，
 * 比如大顶堆，
 * 比如当前堆是这样的
 *              33
 *       27            21
 *   16     13      15      19
 * 5   6   7   8   1   2  12
 * 
 * 
 * 当需要删除堆顶元素的时候，把最后一个节点放到堆顶中，然后利用父节点比子节点大的关系，互换两个节点，并且重复这个关系，直到父子节点
 * 之间满足大小关系，这个是从上往下的堆化。
 * 比如现在要删除堆顶，先把最后一个叶节点12换上去
 *             12
 *       27            21
 *   16     13      15      19
 * 5   6   7   8   1   2  
 * 
 * 然后此时 比较12 和他的两个子节点进行对比，谁比较大就换谁
 *              27
 *       12            21
 *   16     13      15      19
 * 5   6   7   8   1   2  
 * 
 * 继续往下
 *              27
 *       16            21
 *   12     13      15      19
 * 5   6   7   8   1   2  
 * 
 * 此时发现已经满足了，就停止
 */
 function swap(array,i,j){
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
}
class Heap{
    constructor(n){
        this.headArray = new Array(n+1);//用数组进行存储数据，下标1开始
        this.length = 0;//当前堆中的数据
        this.maxCount = n;//堆中可以存放最大的数据是多少
    }
    insert(data){
        //往堆里插入一个元素
        if(this.length >= this.maxCount) {return;}//堆满 不允许插入
        this.length++;
        this.headArray[this.length] = data;//插入元素
        //从下往上堆化
        let i = this.length;
        let fatherIndex = Math.floor(i/2);
        while(fatherIndex > 0 && this.headArray[i] > this.headArray[fatherIndex]){
            //如果当前节点的值比父节点大，就对两个节点进行交换
            swap(this.headArray,i,fatherIndex);//交换两个节点的值
            i = fatherIndex;
            fatherIndex = Math.floor(i/2);
        }
    }
   
    removeTop(){
        if(this.length == 0) {return -1;}//堆顶没有数据
        this.headArray[1] = this.headArray[this.length];//把堆尾部的叶节点换上去
        this.headArray[this.length] = null;//删除最后一个节点
        this.length--;

        //从上往下进行堆化
        let i = 1;
        while(true){
            let maxPos = i;
            if(i*2 < this.length && this.headArray[i] < this.headArray[i*2]){
                maxPos = i*2;
            }
            if(i*2 + 1 < this.length && this.headArray[maxPos] < this.headArray[i*2 +1]){
                maxPos = i*2 +1;
            }
            if(maxPos == i){ break;}//左右子元素都不大于自己就退出循环
            swap(this.headArray,i,maxPos);//交换两个节点
            i = maxPos;//往下继续
        }

    }
}




/**
 * 堆排序：一个事件复杂度为O（nlogn）的原地排序算法：建堆-排序
 * 首先将数组原地建成一个堆，其中建堆的思想如下：
 * 
 * 1、第一种思路：在堆中逐渐的插入一个元素。尽管数组中包含n个数据，但是初始化的时候可以看做堆现在只有
 * 下标为1的堆顶元素，然后调用上面的插入操作，把下标为2到n的数据的插入到堆中。这样就包含n个数据的数组，组成了一个新的堆。
 * 这种建堆的方法，堆化的时候使用的是从下往上堆化。
 * 
 * 2、第二种思路：从后往前处理数组，并且每个数据都是从上往下进行堆化。
 * 建堆结束以后，数组中的数据已经是按照大顶堆的特性来存储了。数组中第一个元素就是最大的元素。
 * 此时将它与最后一个元素交换，那么最大的元素就放在了下标为n的位置。然后再进行堆化，将剩下的n-1个元素
 * 重新构建成堆。堆化完成后，再取堆顶的元素，放到下标是n-1的位置，一直重复这个过程，知道最后堆中只剩下
 * 下标为1的元素，排序工作就完成了。
 */
function buildHeap(array){
    for(let i = Math.round(array.length/2);i>=1;i--){
        heapify(array,array.length,i)
    }
    return array;
}
function heapify(array,n,i){
    while(true){
        let maxPos = i;
        if(i*2<n && array[i] < array[i*2]){
        maxPos = i*2;
        }
        if((i * 2 + 1)<n && array[maxPos] <array[i*2+1] ){
            maxPos = i*2 + 1;
        }
        if(maxPos == i) break;
        swap(array,maxPos,i);
        i = maxPos;

    }
}
function HeapSort(array){
    array =  buildHeap(array);
    let k = array.length-1;
    while(k>1){
        swap(array,1,k);//堆顶元素与最后的叶节点进行交换
        k--;
        heapify(array,k,1);//堆化
    }
    return array;
}
