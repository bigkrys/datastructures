/**
 * 图
 * 图的概念
 * 图中的元素我们就叫做顶点，顶点与其他顶点之间的连接关系叫做边。
 * 一个顶点中有多少相连接的边的条数叫做顶点的度。
 * 有方向的边叫做有向图，其中箭头指向顶点的边叫做入度，顶点指出去的边叫做入度。
 * 而每条边中，如果都带有一个权重，这个权重可以代表顶点之间的关系复杂度，这种图叫做带权图。
 * 
 * 
 * 图的存储方法有两种，一种是邻接矩阵，一种是邻接表。
 * 
 * 1、邻接矩阵的存储方法
 * 邻接矩阵的底层依赖一个二维数组。如果顶点i和顶点j之间有边，
 * 如果是无向图，a[i][j]和a[j][i]就标记为1。
 * 如果是有向图，如果是i指向j,那么a[i][j]为1，同理，j指向i，a[j][i]=1.
 * 如果是带权图，那么对应的位置存储对应的权重值。
 * 
 * 
 * 比如 无向图如下
 * 1 ------3
 * |       |
 * |       |
 * |       |
 * 2-------4
 * 
 * a = [ 0 1 1 0
 *       1 0 0 1
 *       1 0 0 1
 *       0 1 1 0
 *      ]
 * 
 * 
 * 邻接矩阵的存储浪费了很多空间，但是它的存储方式简单、直接，获取两个顶点之间的关系非常方便和搞笑。
 * 而且还方便矩阵计算。
 * 
 * 
 * 
 * 
 * 2、邻接表的存储方式
 * 先看一下下面这个图
 * 1 ---> 2 ---->3
 * ^      ^
 * |      |
 * |      |
 * |      |
 * 4 <----5
 * 
 * 如果用邻接表存储就是这样
 *  ----------
 * |  1  | -> | -> 2
 * ------------
 * |  2  | -> | -> 3
 * ------------
 * |  3  |  \ |
 * ------------
 * |  4  | -> | -> 1
 * ------------
 * |  5  | -> | -> 2 -> 4
 * ------------
 * 
 * 
 * 首先将图中所有的顶点存储在一个表里面，表中对接着一个链表，链表中存储的是与这个顶点连接的其它顶点（上面是有向图，
 * 所以存储的是顶点指出去的点）
 * 
 * 虽然邻接表比较节省空间，但是使用起来就比较耗费时间。
 * 
 */

 class Graph{
    //无向图的邻接矩阵表示
    constructor(nodes,links){
        this.node =  nodes;//所有顶点数组,links是边之间的关系。
        let  matrix = [];
        for(let i = 0;i<nodes.length;i++){
            matrix[i] = new Array(nodes.length);//每一层都有一个数组，数组长度为顶点的个数
            for(let j = 0;j<nodes.length;j++){
                matrix[i][j] = i==j?0:null;//初始化邻接矩阵
            }
        }
        for(let link of links){
            //读取边的关系
            let v1 = nodes.indexOf(link[0]);//读取第一个边所在的下标
            let v2 = nodes.indexOf(link[1]);//读取第二个边所在的下标
            matrix[v1][v2] = matrix[v2][v1] = link[2] || 1;
        }
        this.matrix = matrix;
    }
   
}

class VEX{
    //邻接表中的散列表顶点
    constructor(value){
        this.data = value;
        this.link = null;//紧接着的邻接表
    }
}
class Link{
    //散列表中的链表顶点
    constructor(node,weight,value){
        this.node = node;//指向的是哪个顶点
        this.weight = weight;//权重
        this.next = null;
        this.value = value;
    }
}
class GraphTable{
    //无向图的邻接表 表示
    constructor(nodes,links){
        let table = new Array(nodes.length);
        for(let i = 0;i<nodes.length;i++){
            //初始化散列表
            table[i] = new VEX(nodes[i])
        }
        for(let link of links){
            let v1 = nodes.indexOf(link[0]);
            let v2 = nodes.indexOf(link[1]);


            let linknode2 = new Link(v2,link[2],link[1]);
            linknode2.next = table[v1].link;
            table[v1].link = linknode2;

            let linknode = new Link(v1,link[2],link[0]);
            linknode.next = table[v2].link;
            table[v2].link = linknode;
        }
        this.vex = table;
        this.nodes = nodes;
    }
}


/**
 * 图的搜索算法
 * 图的搜索算法：从图中找出一个顶点出发，到另一个顶点的路径。
 * 、
 * 深度优先遍历：总是对最近才发现的顶点出发边进行探索，直到该顶点的所有出发边都已经被发现为止。
 * 一旦当前顶点的所有出发边都已经被发现，搜索则“回溯”到其前驱顶点，来搜索该前驱顶点的出发边。该过程一直持续到源顶点
 * 所有可以达到的边都被发现为止。
 * 
 * 广度优先搜索：先搜索当前层，遍历完再搜索下一层，直到遍历完所有节点。
 * 广度优先能够计算从源节点到达每个可到达节点的最短距离。
 * 从图中的一个顶点触发，访问了这个顶点一次以后，访问它的各个未曾访问过的邻接点，然后分别从这些邻接点出发一次访问它们的邻接点，
 * 直到所有顶点都被访问。
 */
function GraphDFS(graph){
    //邻接矩阵的深度优先搜素
    //传入一个图 node是顶点集合 matrix是矩阵
    let visited = new Array(graph.nodes.length).fill(false);//用来存储 未被访问过的顶点
    for(let i = 0;i<graph.nodes.length;i++){
        //第一重遍历 是用来给他回溯用的
        if(!visited[i]){
            visited[i] = true;
            DFS(i);//从当前顶点开始深度遍历
        }
    }
    function DFS(i){
        console.log(graph.nodes[i]);//使用这个顶点
        for(let j = 0;j<graph.nodes.length;j++){
            if(graph.matrix[i][j] == 1 && !visited[j]){
                //如果当前两个顶点之间有边，且第二个顶点未被访问过（因为不要重复访问i的邻接顶点）
                visited[j] = true;
                DFS(j);//再从j开始往下深度遍历。
            }
        }
        //当走到没有头的时候退出循环了，等于回溯到原始i的位置，接着i++就是从下一个邻接点开始深度遍历

    }
    
}

function GraphTableDFS(graph){
    //邻接表的深度优先搜索
    let visited = new Array(graph.table.length).fill(false);//用来存储 未被访问过的顶点
    for(let i = 0;i<graph.table.length;i++){
        //第一重遍历 是用来给他回溯用的
        if(!visited[i]){
            visited[i] = true;
            DFS(i);//从当前顶点开始深度遍历
        }
    }
    function DFS(i){
        console.log(graph.table[i].data);//使用这个顶点
        //获取这个顶点的邻接表
        let link = graph.table[i].link;
        while(link){
            //先从这个邻接表开始深度搜索
            if(!visited[link.node]){
                visited[link.node] = true;
                DFS(link.node);
            }
            //获取当前邻接表的顶点深度遍历结束 跳到下个顶点继续循环
            link = link.next;
        }
        //当走到没有头的时候退出循环了，等于回溯到原始i的位置，接着i++就是从下一个邻接点开始深度遍历

    }
}

function GraphBFS(graph){
    //邻接矩阵的广度优先搜索 你可以这样想 邻接矩阵是一个二维的数组 广度优先搜索就是一层一层的遍历。遍历完这一个数组遍历下一个数组
    let quene = [];//用队列保存当前层的数据哦
    let visited = new Array(graph.nodes.length).fill(false);
    for(let i = 0;i<graph.nodes.length;i++){
        if(!visited[i]){
            visited[i] = true;
            quene.push(i);//将当前点入队
            while(quene.length>0){
                let current  = quene.shift();
                console.log(graph.nodes[current]);
                for(let j = 0;j<graph.nodes.length;j++){
                    if(graph.matrix[i][j] == 1 && !visited[j]){
                        visited[j] = true;
                        quene.push(j);
                    }
                }

            }
        }
    }

}
function GraphTableBFS(graph){
    let quene = [];//用队列保存当前层的数据哦 每次遍历一当前邻接表，当当前邻接表访问结束，则访问下一个邻接表
    let visited = new Array(graph.table.length).fill(false);
    for(let i = 0;i<graph.table.length;i++){
        if(!visited[i]){
            visited[i] = true;
            quene.push(i);//将当前点入队
            while(quene.length>0){
                let current  = quene.shift();
                console.log(graph.table[current].data);
                let link = graph.table[current].link;
                while(link){
                    if(!visited[link.node]){
                        visited[link.node] = true;
                        quene.push(link.node);
                    }
                    link = link.next;
                }

            }
        }
    }
}