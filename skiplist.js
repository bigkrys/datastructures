/**
 * 
 * 跳表：
 * 
 * 普通的单链表，一个节点指向下一个节点，如果想要在单链表中查找一个元素，必须要遍历整个链表才可以搜索到这个元素。
 * 那么，如果我们想要像二分查找那样对链表进行搜索查找呢？
 * 
 * 此时我们可以用另一个链表简历索引，每两个元素建立一个索引。比如
 * 
 * 1->2->3->4->5->6->7->8->9->10
 * 
 * 如果要查找的元素是10，那么我们就要从1开始遍历链表，查找到10则需要遍历了10次才找到。
 * 
 * 此时我们简历一个索引如下
 * 1->3->5->7->9
 * 
 * 我们先遍历索引，走到1发现比1大，继续往后走，可以看到只要找到索引9再走一步就可以找到10了，一共遍历了5次。是不是减少了一半的时间呢。
 * 
 * 需要注意的是，索引聊表除了有一个value和next指针，还有一个down指针，用来指向他在原来链表中的值。
 * 
 * 当链表的长度比较大的时候，可以构建多级索引，二级索引指向一级索引，以此类推，查找的速率会大大提升。
 * 
 */
const MAX_LEVEL = 16;
class Node{
    //先定义一个节点类
    //传入一个对象
    constructor({
        data = -1,
        maxLevel = 0,
        refer = new Array(MAX_LEVEL)
    } = {}){
        this.data = data;//节点值
        this.maxLevel = maxLevel;//
        this.refer = refer;//一个数组，数组前n-2都是存储下当前值在每一个层级中所在的位置，n-1指向的是当前层级的下一个节点。
        ///////////////////比如当前一共有三层，refer[0]存储的是下下层中当前值的指针C  refer[1]存储的是下一个层级中当前值的指针B refer[2]存储的是当前层级中的下一个节点的指针D
        //////////////////然后 B节点中的refer[0]是他下一层当前值的指针E refer[1] 是当前层中当前值的指针F
        /////////////////所以 C 和 F指向的都是同一个节点

    }
}

class SkipList{
    constructor(){
        this.head = new Node(); //头指针
        this.levelCount = 1;//当前跳表索引的总级数 
    }
    randomLeverl(){
        //用来生成一个不大于 MAX_LEVEL（最多只能到多少层索引）的值，这个值，在向跳表中添加元素的时候，生成一个随机的索引数
        //
    }
    
}