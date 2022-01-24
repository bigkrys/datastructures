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
 * 此时我们建立一个索引如下
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
/**
 * Node 类属性解释
 * 1、data：当前节点存储的值
 * 2、maxLevel：当前节点处于整个索引的层级
 * 3、refer：一个有着MAX_LEVEL大小的数组，存放着很多个索引。
 * 如果p是当前节点，那么level 就是节点p所处索引的级数，p[level]在这一层级p节点的next节点,p[level-n]表示level级下面n级的节点
 */
class Node{
    constructor({
        data = -1,
        maxLevel = 0,
        refer = new Array(MAX_LEVEL)
    } = {}){
        this.data = data;
        this.maxLevel = maxLevel;
        this.refer = refer;
    }
}

class SkipList{
    constructor(){
        this.head = new Node(); //头指针
        this.levelCount = 1;//当前跳表索引的总级数 
    }
    /**
     * 在跳表里面插入数据的时候，随机生成索引的级数
     * 这里要理解一下随机数的意义：假设随机函数生成了一个值K，那么就将节点添加到第一级到第K级这k级索引中
     */
    randomLeverl(){
        let level = 1;
        for(let i = 1; i < MAX_LEVEL; i++){
            if(Math.random() < 0.5){
                level++;
            }
        }
        return level;
    }
    insert(value){
        const level = this.randomLeverl();//获取一个随机数 更新0-level层级中的索引
        const newNode = new Node();
        newNode.data = value;
        newNode.maxLevel = level;
        const newNodeRefer = new Array(level).fill(new Node());//先初始化refer，从第一层到第level层都有newNode节点
        let p = this.head;//当前链表头节点
        for(let i = level - 1; i >= 0; i--){
            //先初始化他的down指针，指向下面每一层中的节点
            //p.refer[i] 是p在第i层中的next指针 这里每次while循环都是在寻找第i层中最后一个小于value的值
            while(p.refer[i] != undefined && p.refer[i].data < value){
                p = p.refer[i];
            }
            //记录下来第i层中最后一个小于value的节点
            newNodeRefer[i] = p;
        }

        for(let i = 0 ; i < level ; i++){
            //refer[i] 就是节点在第i层中的next指针
            //将每个层级中最后一个小于value的节点后面插入newNode 就等于在每个层级中插入了newNode
            newNode.refer[i] = newNodeRefer[i].refer[i];
            newNodeRefer[i].refer[i] = newNode;
        }
        if(this.levelCount < level){
            this.levelCount = level;//更新索引的总级数
        }
    }
    find(value){
        if(!value){return null;}
        let p = this.head;
        for(let i = this.levelCount - 1; i >= 0; i--){
            //从最上面的索引层开始 每层遍历查找最后一个小于value值的节点
            while(p.refer[i] != undefined && p.refer[i].data < value){
                p = p.refer[i];
            }
        }
        //停留在最后一层最后一个小于value值的节点 第0层就是原始链表层 如果在第0层最后一个小于value的节点的next指针指向的还不是就没有了
        if(p.refer[0] != undefined && p.refer[0].data == value){
            return p.refer[0];
        }
        return null;
    }
    remove(value){
        let _node;
        let  p = this.head;
        const update = new Array();
        update.push(new Node());
        for(let i = this.levelCount - 1;i>=0 ;i--){
            while(p.refer[i] != undefined && p.refer[i].data < value){
                p = p.refer[i];
            }
            update[i] = p;
        }
        if(p.refer[0] != undefined && p.refer[0].data == value){
            _node = p.refer[0];
            for(let i = 0;i<= this.levelCount - 1 ; i++){
                if(update[i].refer[i] != undefined && update.refer[i].data == value){
                    update[i].refer[i] = update[i].refer[i].refer[i];
                }
            }
        }
        return null;
    }
    printAll(){
        let p = this.head;
        while(p.refer[0] != undefined){
            console.log(p.refer[0].data)
            p = p.refer[0];
        }
    }
    
}