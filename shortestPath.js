/**
 * 最短路径

 * Dijkstra算法
 * 首先根据起始顶点到当前顶点的dist 构建小顶堆，然后区堆顶元素。
 * 取堆顶元素以后，需要从下往上堆化
 * 然后取堆顶元素对应的邻接表中，更新每个顶点的dist值，并且入队。
 */
 class Graph{
    constructor(v){
        this.v = v;//图中的顶点
        this.n = v.length;
        this.adj = new Array(this.n);//图中的邻接表
        for(let i = 0;i<this.n;i++){
            this.adj[i] = [];
        }

    }
    addEdge(s,t,w){
        this.adj[s].push(new Edge(s,t,w));
    }
    dijkstar(s,t){
        //从顶点s到顶点t的最短路径
        let predecessor = [];
        let vertexes = [];
        for(let i = 0;i<this.n;i++){
            vertexes[i] = new Vertex(i,Number.MAX_SAFE_INTEGER);//初始化顶点集合，使起始顶点到当前顶点的距离是最大的数字
        }
        let queue = new PriorityQueue(this.v);//构造小顶堆
        let inQueue = new Array(this.n).fill(false);//标记是否进入过队列
        vertexes[s].dist = 0;//初始化起始顶点的距离为0
        queue.add(vertexes[s]);
        inQueue[s] = true;//标记初始顶点已经入队了
        while(!queue.isEmpty()){
            let minVertex = queue.poll();//取堆顶元素 就是距离最小的那个
            if(minVertex.id == t){
                //到达终点
                break;
            }
            //逐个访问最小元素的邻接表中的顶点 更新他们的dist
            for(let i = 0;i<this.adj[minVertex.id].length;i++){
                let e = this.adj[minVertex.id][i];//取出邻接点相连的边
                let nextVertex = vertexes[e.e];//对应的顶点
                //更新顶点中 初始顶点到当前顶点中的最小距离·
                if(minVertex.dist + e.w < nextVertex.dist){
                    nextVertex.dist = minVertex.dist + e.w;
                    predecessor[nextVertex.id] = minVertex.id;//记录nexvertex的上一个顶点是 堆顶元素
                    if(inQueue[nextVertex.id]){
                        //这个邻接节点已经进队 就更新队列中的dist
                        queue.update(nextVertex);
                    }else{
                        queue.add(nextVertex);
                        inQueue[nextVertex.id] = true;
                    }
                }
            }
        }
        console.log('->',s)
        this.print(s,t,predecessor);

        

    }

    print(s,t,predecessor){
        if(s == t) return;
        this.print(s,predecessor[t],predecessor);
        console.log('->',t)
    }
}
class Edge{
    //图中的边，带权
    constructor(s,e,w){
        this.s = s;//起始顶点
        this.e = e;//终点
        this.w = w;//权重
    }
}
class Vertex{
    //顶点
    constructor(id,dist){
        this.id = id;//顶点编号
        this.dist = dist;//起始顶点到当前顶点的距离
    }
}
class PriorityQueue{
    constructor(v){
        this.heap = [];
    }
    swap(i,j){
        const temp = this.heap[i];
        this.heap[i] = this.heap[j];
        this.heap[j] = temp;
    }
    add(data){
        //添加一个元素
        this.heap.push(data);
        this.heapify();
        
    }
    heapify(){
        //从下往上堆化
        let i = this.heap.length-1;
        let fatherIndex = Math.floor(i/2);
        while(fatherIndex >= 0 && this.heap[i].dist < this.heap[fatherIndex].dist){
            //如果当前节点的值比父节点大，就对两个节点进行交换
            this.swap(i,fatherIndex)//交换两个节点的值
            i = fatherIndex;
            fatherIndex = Math.floor(i/2);
        }
    }
    poll(){
        //获得堆顶元素 并且出队
        
        if (this.heap.length>0) {
            return this.heap.shift();
        }
        return null;
    }
    update(vertex){
        //更新结点的值，并且从下往上堆化
        for(let i = 0;i<this.heap.length;i++){
            if(this.heap[i].id == vertex.id){
                this.heap[i] = vertex;
            }
        }
        this.heapify()

    }
    isEmpty(){
        //队列是否为空
        return this.heap.length==0

    }

}

let g = new Graph([0,1,2,3,4,5]);
g.addEdge(0,1,10);
g.addEdge(0,4,15);
g.addEdge(1,2,15);
g.addEdge(1,3,20);
g.addEdge(1,4,2);
g.addEdge(3,2,1);
g.addEdge(3,5,12);
g.addEdge(4,5,10);
g.addEdge(1,5,6);

g.dijkstar(0,5)