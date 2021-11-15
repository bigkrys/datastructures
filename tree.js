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
 * 3    
 * 
 */
function binaryFind(data,node){
    let p = node;
    while(p != null){
        if(p.data == data) {
            return p
        }else if(p.data > data){
            p = p.right;
        }else {
            p = p.left;
        }
    }
    return null;
}

function binaryInsert(data,node){
    let p = node;
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