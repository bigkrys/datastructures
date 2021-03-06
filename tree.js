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
 * 94. 二叉树的中序遍历 https://leetcode-cn.com/problems/binary-tree-inorder-traversal/
 */

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
 var inorderTraversal = function(root) {
    let result = [],p = root;
    if(p == null) return [];
    if(p.left!=null){
        let leftresult = inorderTraversal(p.left);
        result = result.concat(leftresult)
     }
     result.push(p.val);
     if(p.right != null){
        let rightresult =  inorderTraversal(p.right);
        result = result.concat(rightresult);
     }
    return result;
};


/**
 * 100. 相同的树
 * https://leetcode-cn.com/problems/same-tree/
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
 var isSameTree = function(p, q) {
     if(p == null && q == null) return true;
     if(p == null && q != null) return false;
     if(p != null && q == null) return false;
     if(p!= null && q != null){
         if(p.val != q.val){
             return false
         }
         return isSameTree(p.left,q.left) && isSameTree(p.right,q.right);//左右相等
     }
};
/**
 * 104. 二叉树的最大深度
 * https://leetcode-cn.com/problems/maximum-depth-of-binary-tree/
 */
 var maxDepth = function(root) {
    if(root == null) return 0;
    let left = maxDepth(root.left);
    let right = maxDepth(root.right);
    return Math.max(left,right)+1;
};

/**
 * 111. 二叉树的最小深度
https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
 */
var minDepth = function(root) {
    if(root == null) return 0;
    let left = minDepth(root.left);
    let right = minDepth(root.right);
    return Math.min(left,right)+1;
};



/**
 * 二叉树的深度优先搜索（就是二叉树的前序遍历）
 * 从根节点触发，沿着左子树方向进行纵向遍历，直到找到叶节点为止。
 * 然后回溯到前一个节点，进行右子树节点的遍历，知道遍历完所有可达到节点。
 * 
 *       17     
 *   16     13  
 * 5   6   7   8    
 * 像上面这样的二叉树，深度优先遍历输出就是
 * 
 * 17 16 5 6 13 7 8
 *      
 */

 function treeDFS(node){
    console.log(node.value);
    if(node.left){
        treeDFS(node.left);
    }
    if(node.right){
        treeDFS(node.right);
    }
    return
}
function treeDFS(node,data){
    if(node == null) return false;
    if(node.value == data){
        return true
    }
    let left = treeDFS(node.left,data);
    let right = treeDFS(node.right,data);
    return left || right
}


/**
 * 广度优先搜索
 * 从根节点开始，一层一层的输出
 *       17     
 *   16     13  
 * 5   6   7   8    
 * 
 * 输出：17 16 13 5 6 7 8
 * 拿一个队列来记录：首先将元素push进队列，不断的判断队列中是否还有元素。如果有，证明还没有遍历完树。
 * 然后将左右子树push进队列。此时每次循环都是 先把当前节点出队，然后将左右子节点push进队列中。
 */

 function treeBFS(node){
    if(node == null) return nul;
    let quene = [],result = [];
    quene.push(node);
    while(quene.length>0){
        let root = quene.shift()//取队首元素
        result.push(root.value);
        if(root.left){quene.push(root.left)}
        if(root.right){quene.push(root.right)}
    }
    return result;
}

/**
 * 102. 二叉树的层序遍历
 * https://leetcode-cn.com/problems/binary-tree-level-order-traversal/
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
 var levelOrder = function(root) {
     if(root == null) return [];
     let q = [],result = [];
     q.push(root)
     while(q.length >0){
        let currentSize = q.length;//当前层的长度
        result.push([]);//先构造一个空的数组
        for(let i = 1;i <= currentSize;i++){
            //把属于当前层的节点取出来,再将它们的左右子节点push进队列
            let node = q.shift();
            result[result.length-1].push(node.val);
            if(node.left){q.push(node.left)}
            if(node.right){q.push(node.right)}
        }
       
     }
     return result;
};



/**]
 * LCP 44. 开幕式焰火
 * https://leetcode-cn.com/problems/sZ59z6/
 */

var numColor = function(root) {
    let set = new Set()
    treeDFS(root,set);
    return set.size
  };
   function treeDFS(node,set){
       if(node.val){
           set.add(node.val);
       }
      if(node.left){
          treeDFS(node.left,set);
      }
      if(node.right){
          treeDFS(node.right,set);
      }
      return
  }

  /**
   * 144. 二叉树的前序遍历
   * https://leetcode-cn.com/problems/binary-tree-preorder-traversal/
   */
  /**
 * @param {TreeNode} root
 * @return {number[]}
 */
var preorderTraversal = function(root) {
    if(root == null) return [];
    let result = [];
    preorder(root,result);
    return result;
   
    
};
var preorder = function(root,result){
    if(root){
        if(root.val) result.push(root.val);
        if(root.left) preorder(root.left,result);
        if(root.right) preorder(root.right,result);
    }
}

//解答二
var preorderTraversal = function(root) {
    if(root == null) return [];
    let visited = [],result = [];
    visited.push(root)
    while(visited.length>0){
        let currentNode = visited.pop()
        result.push(currentNode.val)
        if(currentNode.right) visited.push(currentNode.right);
        if(currentNode.left) visited.push(currentNode.left);
    }
    return result;
        
};

/**
 * 145. 二叉树的后序遍历
 * https://leetcode-cn.com/problems/binary-tree-postorder-traversal/
 */
 var postorderTraversal = function(root) {
    if(root == null) return [];
   let visited = [],result = [];
   postorder(root,result)
   return result;
                                                              

};
var postorder = function(root,result){
   if(root){
       if(root.left) postorder(root.left,result);
       if(root.right) postorder(root.right,result);
       if(root.val) result.push(root.val);
   }
}
//解答二 利用前序改顺序 然后翻转
var postorderTraversal = function(root) {
    if(root == null) return [];
    let visited = [],result = [];
    visited.push(root)
    while(visited.length>0){
        let currentNode = visited.pop()
        result.push(currentNode.val)
        if(currentNode.left) visited.push(currentNode.left);
        if(currentNode.right) visited.push(currentNode.right);

    }
    return result.reverse();
                                                               

};

/**
 * 226. 翻转二叉树
 * https://leetcode-cn.com/problems/invert-binary-tree/
 */
 var invertTree = function(root) {
   if(root == null) return null;
   let left =  invertTree(root.left);
   let right = invertTree(root.right);
   root.left = right;
   root.right = left;
   return root;
};
