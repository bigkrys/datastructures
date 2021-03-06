/**
 * 贪心算法
 * 贪心算法有：霍夫曼编码、prim和kruskal最小生成树算法、Dijkstra最短路径算法。
 * 
 * 什么是贪心算法：
 * 
 * 1、针对一组数据，问题有限制值和期望值，希望从中选出几个数据，在满足限制值的情况下，期望值最大。
 * 2、每次选择当前情况下，在对限制值同等贡献量的情况下，对期望值贡献最大的数据。
 * 3、举几个例子看下贪心算法产生的结果是否是最优的。
 * 
 * 
 * 举例子
 * 1、区间覆盖
 * 假设有n个区间，区间的起始断点和结束断点分贝是[l1,r1],[l2,r2],....[ln,rn],
 * 从这些区间中选出一部分区间，使得这部分区间满足两两不想交，最多能选出多少个区间呢？
 * 
 * 暴力解决：遍历n个区间，取其端点值，判断两个区间端点值是否相交
 * 
 * 贪心算法：先将这n个区间根据起始断点从小到大的顺序排序，然后选取到带最左端点lmin，最右端点rmax。
 * 然后每次选取区间的时候，选择，左端点跟前面已经覆盖的区间不重合的，右端点又尽量小的，这样可以让剩下的未覆盖的区间尽可能的大，就可以放置更多的区间。
 * 比如我们有区间[1,5],[2,4],[3,5],[5,9],[6,8],[9,10].
 * 我们获取到最小端点1,最大端点10，区间 [1,10]。现在我们想要选取不重合的区间来填满这个区间。
 * 首先根据区间端点大小排序，我们先选到[1,5]，但是它的右端点不是最小的，所以我们选取到[2,4]区间。
 * 然后轮到[3,5],但是[3,5]和[2,4]重合了3，所以不要，
 * 轮到[5,9],右边端点不是最小的，所以我们选择了[6,8]
 * 最后选择了[9,10]
 * 因此我们选择的区间是[2,4],[6,8],[9,10]
 * 当然他还有一组满足的是[1,5],[5,10],但是他的区间数量不是最多的。
 * 
 * 怎么用代码实现呢
 */
 function getArray(array){
    let m = array.length;
    let minMaxArray = array.sort(compare());//按照右端点大小排序的数组
    let result = [],l = 0,r = 0;//结果数组
    for(let i = 0;i<m;i++){
        //首先要判断是否包含在已覆盖的区间内
        let left = minMaxArray[i][0];
        let right = minMaxArray[i][1];
        if(left>r || right<l){
            result.push(minMaxArray[i]);
            l = left;
            r = right;
        }
    }
    return result;
}
function compare(){
    return function(a,b){
      var value1 = a[1];
      var value2 = b[1];
      return value1 - value2;
    }
}
let array = [
    [1,5],
    [9,10],
    [6,8],
    [2,4],
    [5,9],
    [3,5]
]
console.log(getArray(array))



/**
 * 贪心算法解决霍夫曼编码
 * 什么是霍夫曼编码：
 * 假如我有A,B,C,D,E五个字符，出现的频率（即权值）分别为5,4,3,2,1,那么我们第一步先取两个最小权值作为左右子树构造一个新树，即取1，2构成新树，其结点为1+2=3
 *   3
 * 1   2
 * 
 * 第二步再把新生成的权值为3的结点放到剩下的集合中，所以集合变成{5,4,3,3}，再根据第二步，取最小的两个权值构成新树
 *       6
 *    3     3
 *       1     2
 * 
 * 接着集合变成{6,4,5},继续构成树
 *     9
 *  4    5
 *  接着集合变成{9,6} 继续构成树
 *                15
 *          6            9
 *     3.       3      4.     5.
 *           1.    2.
 * 
 * 
 * 其中左边为0，右边为1
 * E1 -> 010
 * D2 -> 011
 * C3 -> 00
 * B4 -> 10
 * A5 -> 11 
 */

 class HuffmanNode{
    constructor(data,weight){
        this.data = data;//节点字符
        this.weight = weight;//节点权重
        this.left = null;//左子树
        this.right = null;//右子树
    }
}

 class Huffman {
     constructor(array){
         //构建哈夫曼树
         let Nodes = [];
        for(let i = 0;i<array.length;i++){
            let node = new HuffmanNode(array[i].data,array[i].weight);
            Nodes.push(node);
        }
        let sortArray = Nodes.sort((a,b)=>a.weight - b.weight);//根据权重大小排序
        while(sortArray.length>1){
            let node1 = sortArray.shift();
            let node2 = sortArray.shift();
            let newnode = new HuffmanNode('X',node1.weight+node2.weight);
            newnode.left = node1;
            newnode.right = node2;
            sortArray.push(newnode);
            sortArray = sortArray.sort((a,b)=>a.weight - b.weight);
        }
        this.HuffmanTree = sortArray;
     }
     getCodes(){
        let huffmanCodes = [],string = [];
        function getCode(node,code,string){
            //根据哈夫曼树生成字符编码
            let string2 = [...string];
            string2.push(code);
            if(node != null){
                if(node.data == 'X'){
                    if(node.left != null) getCode(node.left,'0',string2);
                    if(node.right != null) getCode(node.right,'1',string2);
                }else{
                    huffmanCodes[node.data] = string2.join('')
                }
            }
        }
        getCode(this.HuffmanTree[0],'',string);
        return huffmanCodes
     }
   
}
let f = [
    {data:'a',weight:5},
    {data:'b',weight:4},
    {data:'c',weight:3},
    {data:'d',weight:2},
    {data:'e',weight:1},
]
let nf = new Huffman(f)
console.log(nf)
console.log(nf.getCodes())

