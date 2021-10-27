
/**写链表代码的时候 注意边界
 * 如果链表为空时，代码是否能正常工作？
 * 如果链表只包含一个结点时，代码是否能正常工作？
 * 如果链表只包含两个结点时，代码是否能正常工作？
 * 代码逻辑在处理头结点和尾结点的时候，是否能正常工作？
 */

/**
 * 1、警惕指针丢失
 * 2、利用哨兵简化实现难度
 */

/**
 * 单链表反转
 * 链表中环的检测
 * 两个有序的链表合并
 * 删除链表倒数第 n 个结点
 * 求链表的中间结点
 * 
 */


/**
 * 
 * @param {节点值}} val 
 */
class ListNode {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}
class SingleList{
    constructor(){
        this.head = null//表头
        this.length = 0;//表长
    }
    /**
     * 表头插入
     * @param {插入节点} node 
     */
    insert(node){
        if(this.head != null){
           node.next = this.head
        }else{
            //表空 直接插入
            node.next = null
        }
        this.head = node
        this.length ++
    }
    /**
     * 链表反转
     */
    reverse(){
        let head = this.head,cur = null,prev = head; 
        if(head == null || head.next==null){return head}
        while(prev){
            cur = prev.next;
            let temp = cur;
            prev.next = cur;
            prev = temp;
        }
        return prev;
    }
}