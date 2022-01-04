/**
 * 堆
 * 
 * 堆的概念：堆是一个完全二叉树，且堆中的每一个节点的值都必须大于等于（或小于等于）其子树中的每个节点的值。
 * 其中，每个节点大于等于其子树中每个节点的值的叫做大顶堆，节点小于等于其子树中每个节点的值叫做小顶堆。
 * 
 * 
 * 1、往堆里插入一个元素（大顶堆）
 * 记住！二叉树插入都是在叶节点插入！也就是在数组末端插入
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


class MaxHeap{
    constructor(n){
        this.maxCount = n+1;
        this.heap = [0];
    }
    heapify(array,n,i,data){
        //从上到下堆化 保持父节点比左右子节点都要大
        //将数组元素从i->n之间的元素进行堆化
        n = n-1;
        while(true){
            let minPos = i;
            if(i*2 <= n && array[i] < array[i*2]){
                minPos = i*2;
            }
            if(i*2+1 <= n && array[minPos] < array[i*2+1]){
                minPos = i*2+1;
            }
            
            if(minPos == i) break
            array = this.swap(array,i,minPos)
            i = minPos;

        }
        return array

    }
    swap(array,i,j){
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }
    add(data){
        //添加一个元素
        this.heap.push(data);
         //从下往上堆化
        let i = this.heap.length-1;
        let fatherIndex = Math.floor(i/2);
        while(fatherIndex > 0 && this.heap[i] > this.heap[fatherIndex]){
            //如果当前节点的值比父节点大，就对两个节点进行交换
            this.heap = this.swap(this.heap,i,fatherIndex)//交换两个节点的值
            i = fatherIndex;
            fatherIndex = Math.floor(i/2);
        }
    }
    removeTop(){
        //删除一个元素 从上往下堆化
        this.heap.shift()
        this.heap[0] = 0
        this.heap = this.heapify(this.heap,this.heap.length,1);
    }
    peak(){
        //获得堆顶元素
        if (this.heap.length>1) {
            return this.heap[1];
        }
        return null;
    }

}

class MinHeap{
    constructor(n){
        this.maxCount = n+1;
        this.heap = [0];
    }
    heapify(array,n,i,data){
        //从上到下堆化 保持父节点比左右子节点都要小
        //将数组元素从i->n之间的元素进行堆化
        n = n-1;
        while(true){
            let minPos = i;
            if(i*2 <= n && array[i] > array[i*2]){
                minPos = i*2;
            }
            if(i*2+1 <= n && array[minPos] > array[i*2+1]){
                minPos = i*2+1;
            }
            
            if(minPos == i) break
            array = this.swap(array,i,minPos)
            i = minPos;

        }
        return array

    }
    swap(array,i,j){
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }
    add(data){
        //添加一个元素
        this.heap.push(data);
         //从下往上堆化
        let i = this.heap.length-1;
        let fatherIndex = Math.floor(i/2);
        while(fatherIndex > 0 && this.heap[i] < this.heap[fatherIndex]){
            //如果当前节点的值比父节点大，就对两个节点进行交换
            this.heap = this.swap(this.heap,i,fatherIndex)//交换两个节点的值
            i = fatherIndex;
            fatherIndex = Math.floor(i/2);
        }
    }
    removeTop(){
        //删除一个元素 从上往下堆化
        this.heap.shift()
        this.heap[0] = 0
        this.heap = this.heapify(this.heap,this.heap.length,1);
    }
    insert(data){
        //维护一个k大小的插入
        if(this.heap.length >= this.maxCount){
            //插入后发现数据超出k
            if(data > this.heap[1]){
                this.heap[1] = data;
                this.heap = this.heapify(this.heap,this.maxCount,1);
            }
            
        }else{
            this.add(data);//从数组尾部插入数据

        }
    }
    peak(){
        //获得堆顶元素
        if (this.heap.length>1) {
            return this.heap[1];
        }
        return null;
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


/**
 * 堆的应用
 * 
 * 一、优先级队列
 * 优先级队列中，数据的出队顺序不是先进先出，而是按照优先级来，优先级最高的，最先出队。
 * 实现一个优先级队列最直接有效的方法就是使用堆。一个堆可以看做是一个优先级队列，往优先级队列中插入一个元素，
 * 相当于在堆中插入一个元素，从优先级队列中取出优先级最高的元素，就相当于取出堆顶元素。
 * 
 * 
 * 1、合并有序文件
 * 假设我们有100个小文件，每个文件的大小是100MB，每个文件中存储的都是有序的字符串。我们希望将100个小文件合并成一个有序的大文件。
 * 
 * 我们将从小文件中取出来一个字符放入到小顶堆中，然后进行堆化，那么此时堆顶的元素，就是最小的字符串，也就是优先级
 * 队列队首的元素，就是最小的字符串。我们把这个字符串放入到大文件中，并且从堆中删除这个元素（删除堆顶元素），
 * 然后再从小文件中取出一个字符串加入小顶堆，依次执行上面的过程，直到所有文件中的数据都放到大文件中。
 * 
 * 
 * 
 * 2、高性能定时器
 * 
 * 当定时器中维护了很多个定时任务的时候，每个任务都设定了一个要触发执行的时间点。
 * 
 * 普通的做法：每秒去扫描一下这些任务是否需要执行，如果到达了执行时间，就拿出来执行。
 * 
 * 高性能：按照任务设定的执行时间，将这些任务存储在优先级队列中，队列首部的的存储的就是最先执行的任务。
 * 然后拿堆顶的任务执行时间，与当前时间点相减，获取到一个事件间隔T。
 * 设定一个定时器，在相隔T时间后，来执行队首的任务，执行完毕后。重新堆化，然后拿堆顶的任务执行时间，继续重复的操作。
 * 
 * 
 * 
 * 二、利用堆求topK
 * topK的问题可以抽象成两类：
 * 1、针对静态数据集合，也就是数据集合实现是确定的，此后不会再发生变化。
 * 2、针对动态数据集合，也就是说数据集合实现并不确定，有数据动态的加入到集合中。
 * 
 * 针对第一种情况，集合中都是静态的数据，先从集合中取出前K个数据，组成一个大小为k的小顶堆；
 * 注意是小顶堆，因为 它底部的数据全部都比它大，所以每次比较的时候只要和堆顶元素比较就可以了。
 * 然后从k+1个元素开始，每个元素和堆顶元素进行对比，如果比堆顶元素大，就删掉堆顶元素，然后将这个元素插入到堆中。
 * 然后堆化。重复上面的操作，等到数组中的数据都遍历完以后，堆中的数据就是前K大的数据了。
 * 
 * 这种情况的时间复杂度：遍历数组的时间复杂度是O（n），堆化的时间复杂度是(logK) ,所以最坏的情况是时间复杂度是
 * O(nlogk)；
 * 
 * 
 * 
 * 针对第二种情况，也是使用一个大小为k的小顶堆、
 * 如果有插入新的数据的时候，就拿它和堆顶元素进行对比。如果比堆顶元素大，就把堆顶元素删除，然后将这个元素
 * 插入到堆中；如果比堆顶元素小，则不作任何处理。
 * 
 * 
 * 
 * 
 * 
 * 三、利用堆来求中位数
 * 1、什么是中位数：处在中间位置的数。先对数据进行排序，排序过后。，数据的下标从0开始，数据的个数是奇数，那么n/2+1的位置就是中位数。
 * 蜀国数据是偶数，中位数就是n/2和n/2+1。
 * 
 * 2、对于静态数据来说，中位数是固定的，可以先排序，那么第n/2就是中位数了。
 * 
 * 3、对于动态数据来说，使用堆来求中位数的操作。
 * 首先需要两个堆，一个是大顶堆，一个是小顶堆。大顶堆存储前半部分数据，小顶堆存储后半部分数据。
 * 且小顶堆中的数据都大于大顶堆。
 * 也就是说，如果有n个数据，n是偶数，我们从小到大进行排序，那么前n/2个数据存储在大顶堆中，后n/2个数据存储在小顶堆中。
 * 这样，大顶堆中堆顶元素就是我们要找的中位数，如果n是奇数，那么大顶堆存储n/2+1个数据，小顶堆存储n/2个数据。
 * 
 * 因为数据是动态的，当新添加一个数据的时候，将数据与大顶堆的堆顶进行判断，如果数据小于等于大顶堆堆顶数据，
 * 就把这个新的数据插入到大顶堆中；否则就把数据插入到小顶堆中。当出现两个队的数据个数不符合要求的时候。
 * 可以从一个堆不停的将堆顶元素移动到另一个堆，通过这样的调整，来让两个堆中的数据满足上面的约定。
 * 
 * 
 * 
 * 四、求99%响应时间
 * 1、什么是99%响应时间：将一组数据从小到大排序，这个99百分位数就是大于前面99%数据的那个数据。
 * 
 * 2、还是需要两个堆，一个大顶堆，一个小顶堆。假设当前总数据个数是n，那么大顶堆中存储n*99%个数据，小顶堆中保存n*1%个数据。
 * 大顶堆 堆顶元素就是要找的99%响应时间，
 * 
 * 每次插入一个数据的时候，要判断这个数据跟大顶堆和小顶堆 堆顶数据的大小关系，如果新插入的数据比大顶堆要小，就插入大顶堆，否则插入小顶堆。
 * 不过每次插入的时候，要判断一下两个堆的大小，如果不符合大顶堆99%个数，小顶堆1%个数，就要对两个堆进行移动。
 * 
 * 
 */










/**
 * 剑指 Offer II 059. 数据流的第 K 大数值
 * https://leetcode-cn.com/problems/jBjn9C/
 * 
 * 1、建堆 小顶堆，且堆的大小为k 需要注意的是 入堆的数据必须在叶节点中插入
 * 2、堆没满的时候，从叶节点中插入，并且从下往上开始堆化；
 * 3、当堆满的时候，判断是否比堆头的数据大，如果是就替换堆头的数据，然后从上往下进行堆化
 * 
 */
 class MinHeap{
    constructor(n){
        this.maxCount = n+1;
        this.heap = [0];
    }
    heapify(array,n,i,data){
        //从上到下堆化 保持父节点比左右子节点都要小
        //将数组元素从i->n之间的元素进行堆化
        n = n-1;
        while(true){
            let minPos = i;
            if(i*2 <= n && array[i] > array[i*2]){
                minPos = i*2;
            }
            if(i*2+1 <= n && array[minPos] > array[i*2+1]){
                minPos = i*2+1;
            }
            
            if(minPos == i) break
            array = this.swap(array,i,minPos)
            i = minPos;

        }
        return array

    }
    swap(array,i,j){
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        return array;
    }
    add(data){
        //添加一个元素
        this.heap.push(data);
         //从下往上堆化
        let i = this.heap.length-1;
        let fatherIndex = Math.floor(i/2);
        while(fatherIndex > 0 && this.heap[i] < this.heap[fatherIndex]){
            //如果当前节点的值比父节点大，就对两个节点进行交换
            this.heap = this.swap(this.heap,i,fatherIndex)//交换两个节点的值
            i = fatherIndex;
            fatherIndex = Math.floor(i/2);
        }
    }
    insert(data){
        if(this.heap.length >= this.maxCount){
            //插入后发现数据超出k
            if(data > this.heap[1]){
                this.heap[1] = data;
                this.heap = this.heapify(this.heap,this.maxCount,1);
            }
            
        }else{
            this.add(data);//从数组尾部插入数据

        }
    }
    peak(){
        //获得堆顶元素
        if (this.heap.length>1) {
            return this.heap[1];
        }
        return null;
    }

}

var KthLargest = function(k, nums) {
    this.k  = k+1 ;
    this.nums = nums;
    this.heap = new MinHeap(k);
    for(let i = 0;i<nums.length;i++){
        this.heap.insert(nums[i])
    }

};
KthLargest.prototype.add = function(val) {
    this.heap.insert(val);
    this.nums.push(val);
   return this.heap.peak();
};


/**
 * 1464. 数组中两元素的最大乘积
 * https://leetcode-cn.com/problems/maximum-product-of-two-elements-in-an-array/
 * 
 * 或者 建立大顶堆 堆顶元素线程
 */
 var maxProduct = function(nums) {
    let result = nums.sort((a,b)=>a-b);
    return (result[result.length-2]-1) * (result[result.length-1]-1)
};
/**
 * @param {number[]} nums
 * @return {number}
 */
 var maxProduct = function(nums) {
    let m = new MaxHeap(nums.length-1);
    for(let i = 0;i<nums.length;i++){
        m.add(nums[i]);
    }
    let first = m.heap[1];
    m.removeTop()
    let two = m.heap[1];
    return (first-1)*(two-1);
};
