/**
 * 拓扑排序
 * 凡是需要通过局部顺序来推到全局顺序的，使用拓扑排序来解决。
 * 还可以使用拓扑排序来检测图中环的存在。
 * 
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
 * 如果s需要先于t执行，就添加一条s指向t的边。也就是说 a先执行，b依赖于a的执行，那么a->b
 * 
 * 如果当前顶点没有任何边指向它，证明它可以先执行了
 * 所以算法的第一步，就是找出入度为0的顶点，然后输出，然后把所有他指向的顶点中的入度减1.
 * 然后不断的找入度为0的顶点，输出，其他顶点入度-1.
 */
 class Graph{
    constructor(v){
        this.v = v;//顶点的数组
        let adj = new Array(v.length);//邻接表 每个顶点后面紧接着是他指向别的顶点 顶点的集合
        for(let i = 0;i<v.length;i++){
            adj[i] = new Array();//点之间的关系
        }
        this.adj = adj;
    }
    addEdge(s,t){
        // s依赖t，t先于s执行
        this.adj[t].push(s)
    }
    topoSortByKahn(){
        //统计每个顶点的入度  顶点的入度就是第i列中为1的个数
        let inDegree = new Array(this.v.length).fill(0);
        for(let i = 0;i<this.v.length;i++){
            for(let j = 0;j<this.adj[i].length;j++){
                let w = this.adj[i][j]//顶点w这里的j只是邻接表的一个下表，指向的w才是顶点  i->w
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
 * 算法思想：使用逆邻接表。
 * 比如s先于t执行，本来边是s->t，逆邻接就是t->s.
 * 为什么需要逆邻接呢，因为我们使用到了深度优先，不断的探寻最底层的顶点，然后将其输出，再把当前顶点输出。
 * 
 */
 class GraphTopoSortByDFS{
    constructor(v){
        this.v = v;//顶点的数组
        let inverseAdj = new Array(v.length);//邻接表 每个顶点后面紧接着是他指向别的顶点 顶点的集合
        for(let i = 0;i<v.length;i++){
            inverseAdj[i] = new Array();//点之间的关系
        }
        this.inverseAdj = inverseAdj;
    }
    addEdge(s,t){
        // s依赖t，t先于s执行  
        //构造的是逆邻接表 s->t
        this.inverseAdj[s].push(t)
    }
    topoSortByDFS(){
        let visited = new Array(this.v.length).fill(false);
        let result = '';
        for(let i = 0;i<this.v.length;i++){
            if(!visited[i]){
                visited[i] = true
                dfs(i,this.inverseAdj,visited,this.v)
            }
        }
        function dfs(vertex,inverseAdj,visited,v){
            for(let i = 0;i<inverseAdj[vertex].length;i++){
                //遍历当前节点的逆邻接表
                let w = inverseAdj[vertex][i];
                if(visited[w]){continue;}
                visited[w] = true;
                dfs(w,inverseAdj,visited,v);
            }
            result+= '->'+v[vertex];
        }
        console.log(result)

    }
    
 }

let s = new GraphTopoSortByDFS(['a','b','c','d']);
s.addEdge(0,1);
s.addEdge(1,2);
s.addEdge(3,1);
s.topoSortByDFS()


/**
 * 1203. 项目管理
 * https://leetcode-cn.com/problems/sort-items-by-groups-respecting-dependencies/
 * 1、要求相同项目的在列表中彼此相邻
 * 2、存在依赖关系
 * 
 * 思路：
 * 首先根据小组进行分类，先处理相同小组里面的依赖关系，然后根据下标来输出，最后将没有小组的放在最后面
 * 1、将项目根据小组进行分类 也就是组间拓扑排序
 * 2、小组内 根据先后顺序进行拓扑排序
 * 3、拼接
 */
 var sortItems = function(n, m, group, beforeItems) {
    let result = []
    let groupM = new Array(m+1); //-1归属于下表为m的小组
    let groupS = new Array(m+1).fill(0).map((item,i)=>i);
    let v = new Array(n).fill(0).map((item,i)=>i);
    let groupVisited = new Array(m+1).fill(false);
    for(let i = 0;i<group.length;i++){
        let item = group[i];
        if(item == -1){
            item = m
        }
        if(!groupM[item]){
            let array = []
            groupM[item] = []
        }
        groupM[item].push(i);
    }
    //先处理组与组之间的拓扑排序
    let groupGraph = new Graph(groupS);
    for(let i = 0;i<n;i++){
        let items = beforeItems[i];
        if(items.length>0){
            for(let j = 0;j<items.length;j++){
                groupGraph.addEdge(getGroup(i),getGroup(beforeItems[i][j]))
            }
        }
    }
    let groupSeq = groupGraph.topoSortByKahn();

    //处理组内之间的拓扑关系
    for(let i = 0;i<groupSeq.length;i++){
        let groupIndex = groupSeq[i];//当前应该先处理的组
        if(groupIndex != m){
            groupVisited[groupIndex] = true;
            //没有组别的先不处理 放到后面处理
            let groupItemGraph = new Graph(groupM[groupIndex]);
            for(let innerIndex = 0;innerIndex<groupM[groupIndex].length;innerIndex++){
                let items = beforeItems[groupM[groupIndex][innerIndex]]
                if(items.length>0){
                    let vertext = groupM[groupIndex][innerIndex]
                    for(let j = 0;j<items.length;j++){
                        let next = beforeItems[vertext][j]
                        if(groupM[groupIndex].indexOf(next)){
                            groupItemGraph.addEdge(innerIndex,groupM[groupIndex].indexOf(next));
                        }
                    }
                }
            }
            let groupIndexSeq = groupItemGraph.topoSortByKahn();
            result = result.concat(groupIndexSeq)
        }
    }
    //处理没有顺序的组
    for(let groupIndex= 0;groupIndex<groupM.length;groupIndex++){
        if(groupIndex != m && !groupVisited[groupIndex]){
            groupVisited[groupIndex] = true;
            //没有组别的先不处理 放到后面处理
            let groupItemGraph = new Graph(groupM[groupIndex]);
            for(let innerIndex = 0;innerIndex<groupM[groupIndex].length;innerIndex++){
                let items = beforeItems[groupM[groupIndex][innerIndex]]
                if(items.length>0){
                    let vertext = groupM[groupIndex][innerIndex]
                    for(let j = 0;j<items.length;j++){
                        let next = beforeItems[vertext][j]
                        if(groupM[groupIndex].indexOf(next)){
                            groupItemGraph.addEdge(innerIndex,groupM[groupIndex].indexOf(next));
                        }
                    }
                }
            }
            let groupIndexSeq = groupItemGraph.topoSortByKahn();
            result = result.concat(groupIndexSeq)
        }
    }
    for(let i = 0;i<groupM.length;i++){
        if(!groupVisited[i]){
            //将还没访问过的小组 输出
            result = result.concat(groupM[i])
        }
    }
    console.log(result,'res')
    return result;

    function getGroup(i){
        return group[i] ==-1?m:group[i]
    }

};
class Graph{
    constructor(v){
        this.v = v;//顶点的数组
        let adj = new Array(v.length);//邻接表 每个顶点后面紧接着是他指向别的顶点 顶点的集合
        for(let i = 0;i<v.length;i++){
            adj[i] = new Array();//点之间的关系
        }
        this.adj = adj;
    }
    addEdge(s,t){
        // s依赖t，t先于s执行
        if(this.adj[t].indexOf(s)==-1 && t!=s){
            this.adj[t].push(s)
        }
    }
    topoSortByKahn(){
        //统计每个顶点的入度  顶点的入度就是第i列中为1的个数
        let inDegree = new Array(this.v.length).fill(0);
        let number = [];
        for(let i = 0;i<this.v.length;i++){
            for(let j = 0;j<this.adj[i].length;j++){
                let w = this.adj[i][j]//顶点w这里的j只是邻接表的一个下表，指向的w才是顶点  i->w
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
            number.push(this.v[i]);
            for(let j = 0;j<this.adj[i].length;j++){
                //对i->k的顶点k，全部入度-1
                let k = this.adj[i][j];
                inDegree[k]--;
                if(inDegree[k] == 0 ) {
                    queue.push(k);
                }
            }
        }
        return number;
    }
}

sortItems(8,2,[-1,-1,1,0,0,1,0,-1],[[],[6],[5],[6],[3],[],[4],[]])