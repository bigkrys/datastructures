/**
 * 树
 * 树的概念
 * 
 * 节点的高度 = 节点到叶子节点的最长路径（边数）
 * 节点的深度 = 根节点到节点的路径（边的个数）
 * 节点的层数  = 节点的深度 + 1
 * 树的高度 = 根节点的高度（根节点到叶节点的个数）
 */

/**
 * 二叉树
 * 二叉树的概念
 * 二叉树，每个节点最多有两个子节点，分别是左子节点和右子节点。
 * 
 * 当除叶节点以外所有的节点都拥有左右子节点，且叶节点都在最底层的树，叫 满二叉树。
 * 
 * 当除了最后一层的节点以外所有层中的节点都是满的，且最后一层的叶节点都靠左的树叫做完全二叉树。
 * 
 * 二叉树的顺序存储法：把根节点存储在子下标i=1的位置，那么左子节点存储在2*i=2的位置，右子节点存储在2*i+1=3的位置。
 * 
 * 那么，如果节点X存储在下标i的位置，那么2*i的位置就是它的左子节点，2*i+1就是右子节点的位置。
 * 反过来，如果知道节点的位置在j，那么他的父节点就在j/2的位置。
 * 
 * 
 * 
 * 
 * 二叉树的遍历
 * 就是当前节点所在排序的顺序。
 * 前序遍历 -> 先遍历当前节点，然后遍历它的左子节点，然后遍历它的右子节点。
 * 中序遍历 -> 先遍历左子节点，然后遍历当前节点，最后遍历右子节点。
 * 后序遍历 -> 先遍历左子节点，然后遍历右子节点，最后遍历当前节点。
 * 
 */

function preOrder(node){
    //前序遍历
    if(node == null) return;
    console.log(node.data);
    preOrder(node.left);
    preOrder(node.right);
}
function inOrder(node){
    //中序遍历
    if(node == null) return;
    inOrder(node.left);
    console.log(node.data);
    inOrder(node.right);
}
function postOrder(node){
    //后序遍历
    if(node == null) return ;
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.data);
}


/**
 * 二叉查找树
 * 二叉查找树的要求是，在树中任意一个节点，它左子树的值比它小，他右子树的值比它大。
 * 
 * 
 * 1、二叉查找树的查找
 * 先区根节点，如果它等于我们要查找的数据，就返回，
 * 如果要查找的数据比根节点的值小，就在它的左子树中进行查找；
 * 如果要查找的数据比根节点的值大，就在它右子树中进行查找。
 * 
 * 
 * 2、二叉查找树的插入：新插入的数据一般都是在叶子节点上。
 * 如果要插入的数据比节点的数据大，并且节点的右子树为空，就将新数据直接插入到右子节点的位置。如果不为空，就再遍历右子树，查找插入位置。
 * 如果要插入的数据比节点小，并且节点的左子树为空，就将新数据直接插入到左子节点的位置。如果不为空，就再遍历右子树，查找插入位置。
 * 
 * 3、二叉查找树的删除
 * a、如果要删除的节点没有子节点，直接把父节点的指向要删除的节点的指针置为null。
 * b、如果要删除的节点只有一个子节点，将父节点指向要删除的节点的指针 更改为 指向它的子节点。
 * c、如果要删除的节点中有两个子节点，需要找到这个节点的 右子树中的最小节点，将它移到到要删除的节点的位置上来。
 * 
 * 
 * 4、二叉树的时间复杂度：二叉树的时间复杂度与树的高度成正比。
 * 如何求一棵包含n个节点的完全二叉树的高度？
 * 完全二叉树中 节点n与层数h的关系如下
 * n >= 1+ 2 + 4 + 8 + ... + 2^(h-2) + 1 最后一层只有一个节点
 * n <= 1+ 2 + 4 + 8 + ... + 2^(h-2) + 2^(h-1) 最后一层也是满的
 * 那么h <= log2n
 */

class Node{
    constructor(data){
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree{
    constructor(data){
        this.tree = new Node(data);
    }
    binaryFind(data){
        let p = this.tree;
        while(p != null){
            if(p.data == data) {
                return p;
            }else if(p.data > data){
                p = p.right;
            }else {
                p = p.left;
            }
        }
        return null;
    }
    
    binaryInsert(data){
        let p = this.tree;
        while( p != null){
            if(data > p.data){
                if(p.right == null){
                    p.right = new Node(data);
                    return;
                }else{
                    p = p.right;
                }
            }else{
                if(p.left == null){
                    p.left = new Node(data);
                    return;
                }else{
                    p = p.left;
                }
            }
        }
    }
    binaryDelete(data){
        let p = this.tree,pp = null;//pp用来记录节点的父节点
        while(p != null && p.data != data){
            pp = p;
            if(p.data > data){
                p = p.right;
            }else{
                p = p.left;
            }
        }
        if(p == null) return;//没有找到这个节点
        
        //找到了要删除的节点，如果他有两个子节点 -> 查找右子树中最小的节点(找到右子树中最左边的叶节点)
        if(p.left != null &&  p.right != null){
            let minp = p.right,minpp = p;
            while(minp.left != null){
                minpp = minp;
                minp = minp.left;
            }
            //找到了最左边的叶节点 进行迁移哦
            p.data = minp.data;
            p = minp;//为了兼容下面的删除操作哦
            pp = minpp;
        }
        let child;
        if(p.left != null) child = p.left;
        else if(p.right != null) child = p.right;
        else  child = null;
        if(pp == null){this.tree = child}
        else if(pp.left == p) pp.left = child;
        else pp.right = child;

    }
}



/**
 * 红黑树
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */



