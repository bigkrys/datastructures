/**
 * 哈希表（散列表）
 * 
 * 散列的思想，就是用key对应着一个value。将key转换为value的方法叫做散列函数，而散列函数得到的value就是散列值，
 * 散列值也叫做哈希值。这个value就对应着数组的下表，然后根据value去数组中对应的位置存取数据。
 * 
 * 散列函数，hash(key)，其中key表示着元素的键值，has(key)-》value就是经过散列函数计算得到的散列值（哈希值）。
 * 
 * 散列函数设计的基本要求
 *  a.散列函数计算得到的散列值是一个非负整数
 *  b.如果key1 = key2 ,has(key1) = has(key2)
 *  c.如果key1 != key2,has(key1) != has(key2)
 * 
 * 
 * 散列冲突：就是两个不同的key 得到了一样的哈希值，就是散列冲突。
 * 
 * 常用的解决散列冲突的方法
 * 
 * （一） 开放寻址法：如果出现了散列冲突，重新探测一个空闲位置，将其插入。适合数据量较少，装载因子比较小的情况
 * 
 * 那么如何来探测是否有空闲位置，先来说一个
 * 
 * （1）.线性探测的方法：当我们往散列表中插入数据的时候，如果发生了散列冲突，就从当前位置开始，依次往后面查找，查看是否有空闲位置，直到找到为止。
 * 
 * 
 * 
 * 就是当你从散列函数中得到一个哈希值，然后根据这个哈希值去找到数组的下标，发现已经存放数据了，那么就从这个位置开始，按顺序地往后一个一个点着，看还有没有空位置，如果到了数组尾部，
 * 还是没有空闲位置，那么就从数组开头再往后查找，直到查找到了一个位置，于是插入元素。
 * 
 * 
 * 查找的过程也是这样，先通过散列函数求出哈希值，然后对比这个哈希值下标对应位置点数据是否和查找的元素一致，如果相等就找到了，如果不等，就按顺序往后依次查找。
 * 如果找到了一个空闲位置还是没有找到这个元素，证明查找元素不在散列表中。
 * 
 * 散列表删除一个元素的时候，不是直接把这个数据从散列表中提出掉，而是将其标志为deleted，当查找一个元素的时候，遇到deleted的元素块点时候，直接往下走，而不是
 * 认定为空。
 * 
 * 
 * 
 * (2).二次探测的方法：
 * 二次探测和线形探测的区别就是，
 * 线形探测每次往下走的时候是一步，而二次探测原来的二次方，比如当你遇到了散列冲突，需要往下查找位置插入元素的时候，第一次是hash(key)+0 ，第二次就是hash(key) + 1*1,
 * 第三次就是hash(key) + 2*2 ...以此类推
 * 
 * (3).双重散列：不仅使用一个散列函数，使用一组散列函数hash1(key),hash2(key),hash3(key)...，先用第一个hash1(key),如果此时发生散列冲突了，
 * 就使用第二个散列函数hash2(key),以此类推，直到找到空闲的存储位置。
 * 
 * 
 * 
 * 
 * 当空闲位置变小点时候，散列冲突的概率就会不断的变大，一般情况下，需要保证散列表中有一定比例的空闲槽位。空闲位置的多少，就是装载因子。
 * 装载因子越大，空闲位置越小，散列冲突的概率就会变大。
 * 
 * 装载因子的计算方式是：装载因子 = 填入元素中的个数/散列表的长度
 * 
 * 
 * 
 * （二）、链表法解决散列冲突
 * 链表法是更常用的解决散列冲突的方法，在散列表中存放的是一个链表的表头，当哈希值一样的数据，存放在这个链表中。更适合存储大对象、大数据量的散列表。
 * 
 * 比如 hash(5) = 5,hash(15) = 5,hash(20) = 5
 * 5\15\20都指向了5的下标位置，那么数组中，下标为5的位置存放的是一个链表的表头，链表是5->15-20。
 * 
 * 
 * 当插入元素的时候，只要通过散列函数得到哈希值，就将其插入对应的链表中。当查找的时候也是这样，先由散列函数得到一个哈希值，然后遍历对应的链表，查看是否有该值。
 * 删除元素的时候，通过散列函数得到哈希值，在对应的链表中删除这个元素。
 * 
 * 
 * 
 * 
 * 如何设计一个好的散列表？
 * 
 * （一）设计散列函数
 * 散列函数生成的值，要尽可能的随机并且均匀分布。
 * 
 * 比如我们设计一个 检查单词是否拼写正确的方法， 首先将10个字符以内的作为一个散列表。散列表中的散列函数设计如下
 * 
 * 假设散列表的大小是2MB 就是 2 * 1024 *1024 = 2097152
 * 
 * 那么krysliang的哈希值就是
 * 
 * hash('krys) = (('k' - 'a')* nthPower(26,4) + ('r' - 'a')* nthPower(26,3) +('y' - 'a')* nthPower(26,2) + ('s' - 'a')* 26     )/2097152
 * 
 * nthPower(value,n) = n个value相乘
 * 
 * 
 * 
 * （二）、解决散列冲突
 * 当动态散列表中，数据不断的插入，散列冲突不断的变大，我们可以动态的扩展散列表的大小。
 * （1）插入：
 *  当散列表中装载因子过大的时候，我们先申请一个新的空间，但是先不将老的数据搬移到新的散列表中。
 * 当有数据要插入的时候，先将新的数据 经过hash函数计算后，插入到下标指定的位置中，并且从老的散列表中，从下往下的查找第一个元素，取出来，重新计算哈希值，插入到新表中。
 * 每次插入一个新数据的时候，都重复上面的过程，经过多次插入操作以后，老的散列表就会慢慢的全部搬移到新的散列表中，这样没有某一次的集中申请空间、搬移数据，插入操作就会变得很快。
 * 
 * （2）在此期间的查询，为了兼容新老表的数据，先从新的散列表中进行查找，查找不到就从旧表中进行查找。
 * 
 * 
 * 
 * 
 */

/**
 * 1、LRU 缓存淘汰算法（Least Recently Used）
 * 
 * 只用链表实现的LRU缓存淘汰算法：维护一个按照访问时间从大到小点有序排列的链表结构，（当有访问的时候，就把节点取出插到链表尾部，这样以来头节点就是使用时间最久远的。）
 * 因为缓存大小有限，当缓存空间不足的时候，需要淘汰一个数据的时候，就直接将链表的头部节点删除
 * 
 * 使用散列表和链表结合使用：
 * 首先原链表是一个双向链表，链表中的每个节点存储数据data，前继指针prev，后继指针next。
 * 此外，为了在散列表中使用链表法解决散列冲突，在原来的链表当基础上添加一个字段hnext，用来指向当前这个下标中，链表指向的下一个节点。
 * 
 * 
 * 插入：添加数据之前，先要看这个数据是否已经在缓存中，如果已经在缓存，将其移动到双向链表的尾部。如果没有，首先查看缓存是否已经满了，如果满了就将
 * 双向链表中的头节点删除，然后再插入到链表的尾部。如果没有满，就直接插入到链表的尾部。
 * 
 */


/**
 * 哈希算法
 * 什么是哈希算法：任意长度的二进制值经过哈希算法计算，返回一个固定长度的二进制值（哈希值）。
 * 
 * 哈希算法的要求：
 * a.从哈希值不能反向推导出原始数据；
 * b.对输入数据很敏感，只要原始数据不一样，得到的哈希值也不相同。
 * c.散列冲突要很小，对于不同的原始数据，哈希值相同的概率非常小。
 * d.执行高效，无论输入什么样的文本，也能很快的得出哈希值。
 * 
 * 
 * 哈希算法的应用：安全加密、唯一标识、数据校验、散列函数、负载均衡、数据分片、分布式存储
 * 
 * 1、安全加密
 * 常用的加密哈希算法就是MD5(消息摘要算法)和SHA(安全散列算法),DES(数据加密标准)，AES(高级加密标准)
 * 
 * 2、唯一标识
 * 比如一个查找一个文件是否存在，我们可以从文件的中取出若干位置的二进制码，然后通过哈希算法，得到一个哈希值，用它作为文件的唯一标识。
 * 然后将这个唯一标识中对应在散列表中的位置，存放文件的路径。
 * 
 * 当要查看文件是否存在的时候，先通过哈希算法对这个文件取唯一标识，然后在散列表中查找是否存在这个唯一标识，如果不存在则代表不存在。如果存在，就可以在
 * 散列表中取出这个文件的路径，然后查看和对目标文件进行对比，如果一致则证明存在，取出。如果不一致，就是标识相同的，但不是相同的文件。
 * 
 * 
 * 3、数据校验
 * 有时候进行数据传输的时候，担心数据被人恶意篡改，就可以在数据包中的某些数据进行哈希算法取得哈希值放在数据包中，然后接收方在接收完成后对下载好的数据
 * 进行也去哈希值，跟对应位的哈希值进行对比，如果不同就放弃这个数据包。
 * 
 * 4、散列函数
 * 
 * 
 * 5、负载均衡()
 * 通过哈希算法，对客户端ip地址或者会话id计算哈希值，将取得的哈希值与服务器列表的大小进行取模运算，最终得到的值就是服务器的编号了。
 * 这样就可以把同一个ip过来的所有请求，都定向到同一个后端服务器。
 * 
 * 
 * 
 * 6、数据分片
 * 
 * 7、分布式存储。
 * 
 * 
 * 
 * 
 * 
 * 
 */





/**
 * 13. 罗马数字转整数
 * https://leetcode-cn.com/problems/roman-to-integer/
 * 
 * 解题思路：先将所有的结果列出来，然后每次先判断是否要走一步还是要走两步。
 * 如果当前位置和下一个位置的字符串加起来，在罗马数字组合中，那就走两步，
 * 否则就走一步
 */
 let ROMAN = {
    'I':1,
    'V':5,
    'X':10,
    'L':50,
    'C':100,
    'D':500,
    'M':1000,
    'IV':4,
    'IX':9,
    'XL':40,
    'XC':90,
    'CD':400,
    'CM':900,
}
var romanToInt = function(s) {
   let value = 0;
   if(s.length == 0) return 0;
   if(s.length == 1) return ROMAN[s[0]];
   for(let i = 0;i<s.length;){
       if(ROMAN[s[i]+s[i+1]]){
           value += ROMAN[s[i]+s[i+1]];
           i = i+2;
       }else{
           value += ROMAN[s[i]];
           i++;
       }
      
   }
   return value;
};





/**
 * 169. 多数元素
 * https://leetcode-cn.com/problems/majority-element/
 * 解题思路：遍历数组中的元素，然后建立哈希表，下标是数组中的值，如果存在就加一，如果不存在就加入到 哈希表中
 * 
 */
 var getHash = function(number){
    return 's'+number;
}
var majorityElement = function(nums) {
    let hash = []
    for(let i = 0;i<nums.length;i++){
        if(hash[getHash(nums[i])]){
            hash[getHash(nums[i])]++;
        }else{
            hash[getHash(nums[i])] = 1;
        }
    }
    for(let key in hash){
        if(hash[key] > Math.floor(nums.length/2)){
            return key.split('s')[1]
        }
    }
};
var majorityElement = function(nums) {
    nums.sort((a,b) =>a-b);
    return nums[Math.floor(nums.length/2)]
}
/**
 * 141. 环形链表
 * https://leetcode-cn.com/problems/linked-list-cycle/
 * 解题思路：用集合存放走过的节点，每次都判断一下集合是否有这个节点，如果有就返回true
 */
 var hasCycle = function(head) {
    let hash = new Set(),p = head;
              while(p){
                  if(p.val &&  !hash.has(p)){
                     hash.add(p)
                  }else if(p.val &&  hash.has(p)){
                      return true
                  }
                  
                  p = p.next;
              }
              return false;
  };
/**
 * 160. 相交链表
* https://leetcode-cn.com/problems/intersection-of-two-linked-lists/
*
*
*/
var getIntersectionNode = function(headA, headB) {
    let p = headA,q = headB,aSet = new Set();
    while(p){
        aSet.add(p);
        p = p.next;
    }
    while(q){
        if(aSet.has(q)){
            return q;
        }else{
            q = q.next;
        }
    }
    return null;
};
/**
 * 202. 快乐数
 * https://leetcode-cn.com/problems/happy-number/
 */
var getPow = function (numbers){
    let string = '' + numbers;
    let value = 0
    for(let i = 0;i < string.length;i++){
        let item = parseInt(string[i])
        value  += (item * item) 
    }
    return value
}
 var isHappy = function(n) {
    let aSet = new Set();
    let newvalue = getPow(n);
    while(newvalue != 1){
        newvalue = getPow(newvalue)
        if(aSet.has(newvalue)){
            return false
        }else(
            aSet.add(newvalue)
        )
    }
    return true;
     
};

/**
 * 3. 无重复字符的最长子串
 * https://leetcode-cn.com/problems/longest-substring-without-repeating-characters/
 * 
 */