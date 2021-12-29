/**
 * 拓扑排序
 * 
 * 假设几个源文件之间两两之间的依赖关系已知，如何确定一个全局的编译的顺序呢？
 * 比如a依赖b，b依赖c，d依赖b
 * 那么编译顺序就是 c->b->a->d
 * 或者c->b->d->a
 * 
 * 
 * 我们使用一个有向无环图来实现拓扑排序。
 * 文件之间的依赖关系抽象成一个有向图，每个源文件就是一个图中的一个顶点，源文件之间的依赖关系就是
 * 顶点之间的边。
 * 如果a先于b执行，也就是说b依赖于a，那么就在顶点a和顶点b之间，构建一个从a指向b的边。
 * 首先定义图的数据结构如下
 */
class Graph{
    constructor(v){
        this.v = v;//顶点的数组
        let adj = new Array(v.length);//邻接矩阵
        for(let i = 0;i<v.length;i++){
            adj[i] = new Array();//点之间的关系
        }
        this.adj = adj;
    }
    addEdge(s,t){
        //s->t s指向t的边 t依赖s
        this.adj[s].push(t)
    }
}
/**
 * Kahn算法
 * 算法思想：
 * 如果s需要先于t执行，就添加一条s指向t的边。比如a依赖b，那么就是b->a
 * 
 * 那么如果当前顶点没有任何边指向它，证明它可以先执行了
 * 也就是在第i列如果没有任何数据为1，那么顶点i就可以先执行了。
 * 所以算法的第一步，就是找出入度为0的顶点
 * 在这里的入度代表是否有文件依赖那个顶点，那么就是第i列的1的个数
 * 
 * 那么先从图中找出一个入度为0的顶点，然后输出，然后把所有他指向的顶点中的入度减1.
 * 然后不断的找入度为0的顶点，输出，其他顶点入度-1.
 */
 class Graph{
    constructor(v){
        this.v = v;//顶点的数组
        let adj = new Array(v.length);//邻接矩阵
        for(let i = 0;i<v.length;i++){
            adj[i] = new Array();//点之间的关系
        }
        this.adj = adj;
    }
    addEdge(s,t){
        // s指向t的边 t依赖s
        this.adj[t].push(s)
    }
    topoSortByKahn(){
        //统计每个顶点的入度  顶点的入度就是第i列中为1的个数
        let inDegree = new Array(this.v.length).fill(0);
        for(let i = 0;i<this.v.length;i++){
            for(let j = 0;j<this.adj[i].length;j++){
                let w = this.adj[i][j]//顶点w这里的j只是邻接表的一个下表，指向的w才是顶点
                inDegree[w]++;
            }
        }
        let queue = [],string = '';
        for(let i = 0;i<this.v.length;i++){
            if(inDegree[i] == 0) {
                queue.push(i);//先把入度为0的装进队列
                break;
            }
        }
        while(queue.length>0){
            let i  = queue.shift();//队头出队
            string  += i+':'+this.v[i]+'->';
            for(let j = 0;j<this.adj[i].length;j++){
                //对i->k的顶点k，全部入度-1
                let k = this.adj[i][j];
                inDegree[k]--;
                if(inDegree[k] == 0 ) {
                    queue.push(k);
                }
            }
        }
        console.log(string)
    }
}
let s = new Graph(['a','b','c','d']);
s.addEdge(0,1);
s.addEdge(1,2);
s.addEdge(3,1);
s.topoSortByKahn()


/**
 * DFS算法
 * 
 */