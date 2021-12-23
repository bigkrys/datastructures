/**
 * 动态规划
 * 一个模型 三个特征
 * 一个模型：动态规划适合解决的问题的模型：“多阶段决策最优解模型”
 * 三个特征：1、最优子结构(可以通过问题的子问题的最优解推导出问题的最优解)、无后效性、重复子问题
 * 解决动态规划的两种思路：1、状态转移表法和状态转移方程
 * 1、状态转移表：拿到问题的时候，定义状态，每个状态代表一个节点，然后画出递归树，从递归树中就可以看出来，
 * 是否存在重复子问题。然后画出一个状态表，每个状态包含三个变量，行、列、数组值。
 * 根据决策的先后过程，从前往后，根据递推关系，分阶段填充状态表中的每个状态，然后翻译成代码。
 * 
 * 2、状态转移方程：需要分析某个问题是如何通过子问题来递归求解，根据最优子结构写出地推公式。
 * 
 */








/**
 * 01背包
 * 对于一组不同重量，不可分割的物品，需要选一些装入背包，在满足背包
 * 最大重量限制的前提下，背包中的物品总重量的最大值是多少
 * 
 * 
 * 动态规划的01背包：把整个求解过程分为n个阶段，每个阶段决策一个物品是否放到背包中。
 * 然后记录每一个阶段的状态的集合（去掉重复的）,然后通过当前阶段的状态的集合 来推导下一个阶段的状态的集合，动态的往前推进
 * 比如 一个物品的重量分别是2，2，4，6，3
 * 那么每次选择放或者不放的情况就像下面这样
 *                                                 (0,0)
 *                  (1,0)                                                    (1,2)
 *          (2,0)                      (2,2)                     (2,2)                     (2,4)
 *   (3,0)        (3,4)          (3,2)      (3,6)          (3,2)       (3,6)       (3,4)         (3,8)
 * (4,0) (4,6)  (4,4) (4,10)  (4,2) (4,8)  (4,6) (4,14) (4,2) (4,10) (4,6) (4,12) (4,4)(4,10) (4,8) (4,14)
 * ....第五个太多了 以此类推
 * 
 * 接下来 遍历每一层的时候 就把重复的节点合并，只记录不同的状态，来保证每一层不同的状态不会超过w个。
 * 用一个二维数组来记录每层可以达到的不同状态
 * 我们这里一共有5个物品，背包的总重量为9，所以列数为9，确保每次决策完背包的重量不超过9
 * 初始状态的数组如下(下标从0开始，上面的序号依次减1)
 *   0 1 2 3 4 5 6 7 8 9
 * 0 0 0 0 0 0 0 0 0 0 0
 * 1 0 0 0 0 0 0 0 0 0 0
 * 2 0 0 0 0 0 0 0 0 0 0
 * 3 0 0 0 0 0 0 0 0 0 0
 * 4 0 0 0 0 0 0 0 0 0 0
 * 
 * 当决策完第一个的时候 数组如下(下标从0开始，上面的序号依次减1)
 *   0 1 2 3 4 5 6 7 8 9
 * 0 1 0 1 0 0 0 0 0 0 0
 * 1 0 0 0 0 0 0 0 0 0 0
 * 2 0 0 0 0 0 0 0 0 0 0
 * 3 0 0 0 0 0 0 0 0 0 0
 * 4 0 0 0 0 0 0 0 0 0 0
 * 
 * 当决策完第二个物品后的数组这样(2,0)(2,2)(2,2)(2,4)把重复的（2，2）只存一次，所以如下；(下标从0开始，上面的序号依次减1)
 *   0 1 2 3 4 5 6 7 8 9
 * 0 1 0 1 0 0 0 0 0 0 0
 * 1 1 0 1 0 1 0 0 0 0 0
 * 2 0 0 0 0 0 0 0 0 0 0
 * 3 0 0 0 0 0 0 0 0 0 0
 * 4 0 0 0 0 0 0 0 0 0 0 
 * 当决策完第三个物品后的数组这样如下；(下标从0开始，上面的序号依次减1)
 *   0 1 2 3 4 5 6 7 8 9
 * 0 1 0 1 0 0 0 0 0 0 0
 * 1 1 0 1 0 1 0 0 0 0 0
 * 2 1 0 1 0 1 0 1 0 1 0
 * 3 0 0 0 0 0 0 0 0 0 0
 * 4 0 0 0 0 0 0 0 0 0 0 
 * 当决策完四个物品后的数组这样如下；(下标从0开始，上面的序号依次减1)
 *   0 1 2 3 4 5 6 7 8 9
 * 0 1 0 1 0 0 0 0 0 0 0
 * 1 1 0 1 0 1 0 0 0 0 0
 * 2 1 0 1 0 1 0 1 0 1 0
 * 3 1 0 1 0 1 0 1 0 1 0
 * 4 0 0 0 0 0 0 0 0 0 0 
  * 当决策完五个物品后的数组这样如下；(下标从0开始，上面的序号依次减1)
 *   0 1 2 3 4 5 6 7 8 9
 * 0 1 0 1 0 0 0 0 0 0 0
 * 1 1 0 1 0 1 0 0 0 0 0
 * 2 1 0 1 0 1 0 1 0 1 0
 * 3 1 0 1 0 1 0 1 0 1 0
 * 4 1 0 1 1 1 1 1 1 1 1 
 * 
 * 所以可以看到此时最后一种就是最大物品重量和的情况了
 */
 function knapsack(){
    let items = [
        {
            name:'苹果',
            weight:2,
            value:5
        },
        {
           name:'雪梨',
           weight:2,
           value:2
       },
       {
           name:'草莓',
           weight:4,
           value:4,
       },
       {
           name:'波罗蜜',
           weight:6,
           value:2
       },
       {
           name:'皇帝柑',
           weight:3,
           value:10
       }
    ]
   let bagWeight = 9;//背包的容量
   let state =[];//创建一个state数组
    for(let i = 0;i<5;i++){
        let array = [];
        for(j=0;j<10;j++){
            array[j] = false;
        }
        state.push(array);
    }
 
    state[0][0] = true;//第一行的数据 不放进包里
    if(items[0].weight <= bagWeight){
        state[0][items[0].weight] = true;//第一行的数据 选择放进包里
    }
    for(let i = 1;i<items.length;i++){
        for(let j = 0;j<=bagWeight;j++){//当前物品不放进背包，但是要把上一层的状态拷贝到当前层 这个很重要
            if(state[i-1][j]){
                state[i][j] = state[i-1][j]
            }
        }
        for(let j = 0;j<=bagWeight - items[i].weight;j++){
            //把当前物品放进背包，但是不能超过背包的容量
            if(state[i-1][j]){
                state[i][j+items[i].weight] = true;//把当前物品标志
            }
        }
    }
   for(let i = bagWeight;i>=0;i--){//输出结果  最大的肯定是在后面，所以从后面算起
       if(state[items.length -1][i]){//所有物品决策完 结果肯定是在最后一行
           return i;
       }
   }

   return 0;
}

console.log( knapsack())
function knapsack2(items,w){
    let state = new Array(w+1).fill(false);
    state[0] = true;//第一个物品的不选择
    if(items[0]<=w){
        state[items[0]] = true;//第一个物品的选择
    }
    for(let i = 1;i<items.length;i++){
        for(let j = w-items[i];j>=0;--j){
            if(state[j]){
                state[j+items[i]] = true//放进去
            }
        }
    }
 for(let i = w;i>=0;i--){
     if(state[i]){
         return i;
     }
 }
}
console.log( knapsack2([2,2,4,6,3],9))



/**
 * 01背包物品带价值计算。
 * 对于一组不同重量、不同价值、不可分割的物品，在满足背包最大重量限制的前提下，背包中可装入的物品总
 * 价值最大是多少。
 * 在递归树中，在背包中物品总重量一样的情况下，节点对应的物品总价值更大，就选择这个节点，然后沿着这个决策路线
 * 往下决策就可以。
 * 也就是说对于(i,cw)相同的不同节点，只需要保留cv更大的那个节点，
 */
 function knapsackValue() {
  
    let items = [
        {
            name:'苹果',
            weight:2,
            value:5
        },
        {
           name:'雪梨',
           weight:2,
           value:2
       },
       {
           name:'草莓',
           weight:4,
           value:4,
       },
       {
           name:'波罗蜜',
           weight:6,
           value:2
       },
       {
           name:'皇帝柑',
           weight:3,
           value:10
       }
    ]
   let bagWeight = 9;//背包的容量
   let state =[];//创建一个state数组
    for(let i = 0;i<items.length;i++){
        let array = [];
        for(j=0;j<=bagWeight;j++){
            array[j] = -1;
        }
        state.push(array);
    }
    state[0][0] = 0;
    if(items[0].weight<=bagWeight){
        state[0][items[0].weight] = items[0].value
    }
    for(let i = 1;i<items.length;i++){
        for(let j = 0;j<=bagWeight;j++){//不放当前物品 就把上一层的状态复制过来
            if(state[i-1][j]>=0){
                state[i][j] = state[i-1][j];
            }
        }
        for(let j = 0;j<=bagWeight-items[i].weight;j++){
            if(state[i-1][j]>=0){
                let value = state[i-1][j]+items[i].value
                if(value > state[i][j+items[i].weight]){
                    state[i][j+items[i].weight] = value
                }
            }
        }
    }

    let maxValue = -1;
    for(let j = 0;j<=bagWeight;j++){
        if(state[items.length-1][j]>maxValue){
            maxValue = state[items.length-1][j]
        }
    }
    return maxValue
}
console.log(knapsackValue())
/**
 * 
 * 完全背包
 * 有N件物品和一个容量是V的背包。每个物品只能使用一次，每种物品有无限件可以使用。
 * 第i件物品的体积是wi，价值是vi。求将那些物品装入背包，可以使这些物品的总体积不超过背包容量、
 * 且总价值最大呢？
 * 请输出最大价值。
 * 
 * 与01背包不一样的是，物品有无限件可以使用，那就不能根据物品一个个的来决策构造二叉树，从而构造状态表了。
 * 换一个思路，我们的节点仍然使用state[i][j]来表示，在物品[0,i]中，不超过指定背包重量j，获得的最大价值。
 * 那么每次我们怎么选择呢？
 * 我们换做从物种来选择，每次选择一个物品进入背包的时候，都是从[0,i]这么多物种中，选择一个，然后选择价值最大的一个。
 * 
 * 假设 物种重量数组是 [2,2,4,6,3],价值数组是[5,2,4,2,10]，背包重量是9
 * 
 * i = 0的时候，选择物品0，
 * 
 * 个数如下
 *    0  1  2  3  4  5  6  7  8  9
 * 0  0  0  1  0  2  0  3  0  4  0
 * 
 * 加上对应的价值就是下面这样
 *    0  1  2  3  4   5  6   7  8  9
 * 0  0  0  5  0  10  0  15  0  20  0 
 * 
 * 当i=1的时候，代表可以选择下标为1这两个物品 ,

 * 加上价值就是这样
  *    0  1  2  3  4   5  6   7  8  9
 * 0   0  0  5  0  10  0  15  0  20  0 
 * 1   0  0  5  2  10  4  15  6  20  8  
 * 
 * 依次类推，得到矩阵如下：
 *     0  1  2  3  4   5  6   7  8  9
 * 0   0  0  5  0  10  0  15  0  20  0 
 * 1   0  0  5  2  10  4  15  6  20  8  
 * 2   0  0  5  2  10  4  15  6  20  8
 * 3   0  0  5  2  10  4  15  6  20  8
 * 4   0  0  5  10 10  15 20  20 25  30 
 * 
 * 
 * 
 * 可以看到
 * 1、当i>=1的时候，选取的个数i要满足i*weights[i]<=maxWeight
 * 2、每次选取第i个物品的时候，逐个的去选取k个物品，其中k*weight[i]<=j,j是当前背包的内容
 * 3、每次决策一个节点的时候有 当前选取k个i物品对应的价值，还有不选取k个物品对应的价值
 * 其中选取k个i物品对应的价值 = state[i-1][j-k*weights[i]]+k*values[i];
 * 其中，j-k*weights[i]代表 没装k个i物品之前背包的容量，再加上k*values[i]，表示装入k个i物品
 * 
 * 不选取就是 state[i][j],什么都不做
 * 
 * 所以 state[i][j] = Math.max(state[i][j],state[i-1][j-k*weights[i]]+k*values[i])
 * 
 */

 function CompletePack(weights,values,maxWeight){
    //先初始化状态数组
    let n = weights.length;
    let state = new Array(n+1);
    for(let i = 0;i<n;i++){
        state[i] = new Array(maxWeight+1).fill(0);
    }
    //初始化第一行 枚举第一个物品可以选择的个数 然后赋值
    for(let i = 0;i * weights[0]<=maxWeight;i++){
        state[0][i*weights[0]] = i*values[0]
    }
    for(let i = 1;i<n;i++){
        for(let j = 0;j<=maxWeight;j++){
            for(let k = 0;k*weights[i]<=j;k++){
                //枚举下标为i的物品 可以选择的个数
                 state[i][j] = Math.max(state[i][j],state[i-1][j-k*weights[i]]+k*values[i])
            }
         }
    }
    return state[n-1][maxWeight]
}










/**
 * 计算购物车中
 * 比如“满 200 元减 50 元”。假设购物车中有 n 个（n>100）想买的商品，希望从里面选几个，
 * 在凑够满减条件的前提下，让选出来的商品价格总和最大程度地接近满减条件（200 元）
 * 
 */

 function double11advance(items,w) {
    let state = [];
    for(let i = 0;i<items.length;i++){
        let array = [];
        for(let j = 0;j<=2*w;j++){
            array[j] = false
        }
        state[i] = array;
    }
    state[0][0] = true;
    if(items[0].value<=2*w){
        state[0][items[0].value] = true
    }
    for(let i = 1;i<items.length;i++){
        for(let j = 0;j<=2*w;j++){
            if(state[i-1][j]){
                state[i][j] = state[i-1][j];
            }
        }
        for(let j = 0;j<=2*w - items[i].value;j++){
            if(state[i-1][j]){
                state[i][j+items[i].value] = true
            }
        }
    }
    let j;
    for(j = w;j<2*w;j++){
        if(state[items.length-1][j]) break;
    }
    if(j == 2*w) return ;
    for(let i = items.length-1;i>=1;i--){
        if(j-items[i].value>=0 && state[i-1][j-items[i].value]){
            console.log(items[i],'买')
            j = j-items[i].value;
        }
    }
    if(j!=0) console.log(items[0],'买')
    console.log(state)
}
let items = [
    {
        name:'货品1',
        value:20,
    },
    {
        name:'货品2',
        value:40,
    },
    {
        name:'货品3',
        value:50,
    },
    {
        name:'货品4',
        value:20,
    },
    {
        name:'货品5',
        value:80,
    },
    {
        name:'货品6',
        value:30,
    },
    {
        name:'货品7',
        value:45,
    }
]
console.log(double11advance(items,200))


/**
 * 假设我们有一个n*n的矩阵，存储的都是正整数。现在要从矩阵的左上角走到矩阵的右下角，计算最短路径长度
 * 
 *   0 1 2 3
 * 0 1 3 5 9
 * 1 2 1 3 4
 * 2 5 2 6 7
 * 3 6 8 4 3
 * 
 * 先用回溯解决这个问题
 * 
 * 思路-》回溯解决 画出递归树-》找出子问题-》翻译成代码
 * 
 */
 function getMiniDist(){
    let minDist = 9999;
    let array = [
        [1,3,5,9],
        [2,1,3,4],
        [5,2,6,7],
        [6,8,4,3]
    ];
    miniDistBt(0,0,0,array)
    function miniDistBt(i,j,dist,w) {
        if(i == w.length-1 && j == w.length-1){
            if(dist<minDist) {
                minDist = dist;
                return;
            }
        }
        if(i < w.length-1){
            //往下走
            miniDistBt(i+1,j,dist+w[i][j],w);
        }
        if(j<w.length-1){
            //往右走
            miniDistBt(i,j+1,dist+w[i][j],w);
        }
    }
    console.log(minDist)
    return minDist;
}
/**
 * 接下来 我们画出递归树
 *                                               (0,0,1)
 *                   (1,0,3)                                             (0,1,4)
 *         (2,0,8)           (1,1,4)                           (1,1,4)            (0,2,9)
 *    (3,0,14) (2,1,10)   (2,1,6)  (1,2,7)                (2,1,6)  (1,2,7)   (1,2,12)  (0,3,18)
 * .....以此类推
 * 
 * 那么 用一个状态表来存储这个过程，数组中的i,j代表当前位置，数组中的值代表起点到当前位置的最短路径。
 *   0  1  2  3
 * 0 1  4  9  18
 * 1 3  4  7  11
 * 2 8  6  12 18
 * 3 14 14 16 19
 * 
 * 所以最短路径就是19
 */
 function minDistDP(array){
    let state = [],sum = 0;
    for(let i = 0;i<array.length;i++){
        let temp = []
        for(let j = 0;j<array.length;j++){
            temp[j] = 0
        }
        state.push(temp)
        
    }
    for(let i = 0;i<array.length;i++){
        //初始化第一行数据
        sum += array[0][i];
        state[0][i] = sum;
    }
    sum = 0;
    for(let i = 0;i<array.length;i++){
        //初始化第一行数据
        sum += array[i][0];
        state[i][0] = sum;
    }
    let i = 0
    for( i = 1;i<array.length;i++){
        for(let j = 1;j<array.length;j++){
            let min = Math.min(state[i-1][j],state[i][j-1]);
            state[i][j] = array[i][j]+min;
        }
    }
    let n = state.length-1
    return state[n][n];

}
let array = [
        [1,3,5,9],
        [2,1,3,4],
        [5,2,6,7],
        [6,8,4,3]
    ];
minDistDP(array)


/**
 * 状态转移方程
 * 根据最优子结构 写出递归公式（状态转移方程）
 * 两种实现方法：1、递归加状态表；2、迭代递推
 * 就像上面的例子中 递归公式就是
 * minDist(i,j) = w[i][j] + Min(w[i-1][j],w[i][j-1])
 */

 function minDist(array){
    let mem = [],sum = 0,n = array.length;
    for(let i = 0;i<n;i++){
        let temp = []
        for(let j = 0;j<n;j++){
            temp[j] = 0
        }
        mem.push(temp)
        
    }
    return miniDistBt(n-1,n-1)
    function miniDistBt(i,j){
        if(i == 0 && j == 0){return array[0][0];}//递归终止条件
        if(mem[i][j] > 0 ) return mem[i][j];//已经遍历过了 直接返回
        let minLeft = Number.MAX_VALUE,minUp = Number.MAX_VALUE
        if(j-1>=0){
            minLeft = miniDistBt(i,j-1);//他左边的子节点的值
        }
        if(i - 1>=0){
            minUp = miniDistBt(i-1,j);//他上边的子节点的值
        }
        let cur = array[i][j] + Math.min(minLeft,minUp);
        mem[i][j] = cur;
        return cur;
    }
   

}
let array2 = [
        [1,3,5,9],
        [2,1,3,4],
        [5,2,6,7],
        [6,8,4,3]
    ];
console.log(minDist(array2),'minDIst')

/**
 * 计算两个字符串的莱温斯坦距离：
 * 字符串距离：将一个字符串转换成另一个字符串 ，需要最少编辑的操作数
 * 莱温斯坦距离：允许增加、删除、替换字符三个操作
 * 
 * 匹配两个字符串，当匹配到a[i]和b[j]
 * 1、当a[i] == b[j],那么直接匹配下一个字符a[i+1],b[j+1]
 * 2、当a[i] != b[j]，那么可以有这几种情况
 * 
 * a、删除a[i]或者在b[j]前面添加一个字符，然后继续匹配，也就是变成了a[i+1] 是否与b[j]相等
 * b、删除b[j]或者在a[i]前面添加一个字符，然后继续匹配，也就是变成了a[i] 是否与b[j+1]相等
 * c、将a[i]替换成b[j]，或者把b[j]替换成a[i]。然后继续匹配a[i+1]与b[j+1]
 * 
 * 我们先用代码实现上面的过程
 */
 function lwst(string1,string2){
    let n = string1.length-1,m = string2.length-1,minDist = Number.MAX_VALUE;
    lwstBack(0,0,0);
    function lwstBack(i,j,edist){
        if(i == n || j == m){
            //匹配完成了
            if(i<n){edist += (n - i);}
            if(j<m){edist += (m - j);}
            if(edist<minDist){minDist = edist;}
            return;
        }
        if(string1[i] == string2[j]){
            //匹配 继续匹配下一个字符
            lwstBack(i+1,j+1,edist);
        }else{
            lwstBack(i+1,j,edist+1);
            lwstBack(i,j+1,edist+1);
            lwstBack(i+1,j+1,edist+1)
        }
    }
    return minDist;

}
/**
 * 接下来我们画出递归树
 *                       （0，0，0）
 *                        （1，1，0）
 *      (2,1,1)             (1,2,1)            (2,2,1)
 *      (3,2,1)      (2,2,2) (1,3,2) (2,3,2)   (3,2,2)(2,3,2)(3,3,2)
 * 
 * 可以看到i，j是有不一样的，所以是有重复子问题的，edit不一样的时候就选最小的那个
 * 那么节点就变成了(i,j,minedist(i,j))
 * 
 * 可以知道 (i,j,minedist(i,j))这个节点有可能从三个地方过来分别是
 *  1、(i-1,j,min)
 *  2、(i,j-1,min)
 *  3、(i-1,j-1,min)
 * 
 * 那么当a[i] == b[j]是
 * 状态表 就变成了 min_edist(i-1,j)+1,min_edist(i,j-1)+1,min(i-1,j-1)
 * 三个值中的最小值
 * 当不等的时候就是
 * min_edist(i-1,j)+1,min_edist(i,j-1)+1,min(i-1,j-1)+1,三个值中的最小值
 * 那么表就变成下面这样 mitcmu mtacnu
 *   0 1 2 3 4 5 
 * 0 0 1 2 3 4 5
 * 1 1
 * 2 2
 * 3 3
 * 4 4
 * 5 5
 * 
 */
 function lwstDP(string1,string2){
    let n = string1.length-1,m = string2.length-1;
    let minedist = new Array(n+1).fill().map((item)=>new Array(m).fill(0)),sum = 0;

    //初始化第一行第一列
    for(let i = 0;i<=m;i++){
        if(string1[0] == string2[i]){
            minedist[0][i] = i;//将前面的全部删掉，edist = i
        }else if(i != 0){
            minedist[0][i] = minedist[0][i-1]+1;
        }else{
            minedist[0][i] = 1;//第一个不相等的时候 edist = 1
        }
    }
    for(let i = 0;i<=n;i++){
        if(string1[i] == string2[0]){
            minedist[i][0] = i;//将前面的全部删掉，edist = i
        }else if(i != 0){
            minedist[i][0] = minedist[i-1][0]+1;
        }else{
            minedist[i][0] = 1;//第一个不相等的时候 edist = 1
        }
    }
    for(let i=1;i<=n;i++){
        for(let j = 1;j<=m;j++){
            if(string1[i] == string2[j]){
                minedist[i][j] = Math.min(Math.min(minedist[i-1][j]+1,minedist[i][j-1]+1),minedist[i-1][j-1])
            }else{
                minedist[i][j] = Math.min(Math.min(minedist[i-1][j]+1,minedist[i][j-1]+1),minedist[i-1][j-1]+1)
            }
        }
    }
    return minedist[n][m]
} 




/**
 * 计算最长公共子串长度
 * 最长公共子串只允许增加、删除字符两种操作，
 * 匹配两个字符串，当匹配到a[i]和b[j]
 * 
 * 每个状态用(i,j,max_lcs)来记录当前最长公共子串长度。
 * 
 * 如果a[i]与b[j]互相匹配，将最大公共子串长度加1，继续考察a[i+1],b[j+1]
 * 如果不匹配 z最长公共子串长度不
 *  1、删除a[i]，或者在b[i]前面插入一个a[i]，继续考察a[i+1]和b[j]
 *  2、删除b[i]，或者在a[i]前面插入一个b[j]，继续考察a[i]和b[j+1]
 * 
 * 所以当前最大子串有可能有三个状态转移过来
 * 当a[i] == b[j]
 * max_lcs(i,j) = Max(max(i-1,j) ,max(i,j-1),max(i-1,j-1)+1)
 * 当a[i] != b[j]
 * max_lcs(i,j) = Max(max(i-1,j) ,max(i,j-1),max(i-1,j-1))
 * 
 * mitcmu mtacnu
 *   0 1 2 3 4 5
 * 0 1 
 * 1
 * 2
 * 3
 * 4
 * 5
 */
 function lcs(string1,string2){
    let n = string1.length-1,m = string2.length-1;
    let maxLcs = new Array(n+1).fill().map((item)=>new Array(m).fill(0)),sum = 0;

    //初始化第一行第一列
    for(let i = 0;i<=m;i++){
        if(string1[0] == string2[i]){
            maxLcs[0][i] = 1;//与第一个字符相等，最长子串为1
        }else if(i != 0){
            maxLcs[0][i] = maxLcs[0][i-1];
        }else{
            maxLcs[0][i] = 0;
        }
    }
    for(let i = 0;i<=n;i++){
        if(string1[i] == string2[0]){
            maxLcs[i][0] = 1;//与第一个字符相等，最长子串为1
        }else if(i != 0){
            maxLcs[i][0] = maxLcs[i-1][0];
        }else{
            maxLcs[i][0] = 0;
        }
    }
    for(let i = 1;i<=n;i++){
        for(let j = 1; j<= m;j++){
            if(string1[i] == string2[j]){
                maxLcs[i][j] = Math.max(Math.max(maxLcs[i-1][j],maxLcs[i][j-1]),maxLcs[i-1][j-1]+1)
            }else{
                maxLcs[i][j] = Math.max(Math.max(maxLcs[i-1][j],maxLcs[i][j-1]),maxLcs[i-1][j-1])
            }
        }
    }
    return maxLcs[n][m];
}
/**
 * “杨辉三角”不知道你听说过吗？我们现在对它进行一些改造。
 * 每个位置的数字可以随意填写，经过某个数字只能到达下面一层相邻的两个数字。
 * 假设你站在第一层，往下移动，我们把移动到最底层所经过的所有数字之和，定义为路径的长度。
 * 请你编程求出从最高层移动到最底层的最短路径长度。
 */



/**
 * 118. 杨辉三角
 * https://leetcode-cn.com/problems/pascals-triangle/
 */
 var generate = function(numRows) {
    //1、先把dp数组初始化了
    let result = new Array(numRows);
    for(let i = 0;i<numRows;i++){
        let sonArray = new Array(i+1);
        sonArray[0] = 1;
        sonArray[i] = 1;
        result[i] = sonArray
    }

    //2、回溯法 就是遍历 
    for(let i = 2;i<numRows;i++){
        for(let j = 1;j<i;j++){
            result[i][j] = result[i-1][j-1] + result[i-1][j]
        }
    }
    return result;
};
/**
 * 
119. 杨辉三角 II
https://leetcode-cn.com/problems/pascals-triangle-ii/
 */
var getRow = function(rowIndex) {
    let numRows = rowIndex+1
 let result = new Array(numRows);
    for(let i = 0;i<numRows;i++){
        let sonArray = new Array(i+1);
        sonArray[0] = 1;
        sonArray[i] = 1;
        result[i] = sonArray
    }

   
    for(let i = 2;i<numRows;i++){
        for(let j = 1;j<i;j++){
            result[i][j] = result[i-1][j-1] + result[i-1][j]
        }
    }
    return result[rowIndex];
};
 /**
         * 给你一个整数数组 coins ，表示不同面额的硬币；以及一个整数 amount ，表示总金额。
         * 计算并返回可以凑成总金额所需的 最少的硬币个数 。如果没有任何一种硬币组合能组成总金额，返回 -1 。
         * 你可以认为每种硬币的数量是无限的
         * 
         * 1、首先定义状态，每个状态代表一个节点。
         * 那么这里怎么定义一个节点呢？
         * (i,nums)来定义一个节点，代表，组成金额i至少需要nums个硬币。
         * coins = [1, 2, 5], amount = 11
         * 比如amout = 11，那么一共有 0 1 2 3 4 5 6 7 8 9 10 11个节点
         * 其中state[0] = 0 ，因为组成0元面额，不需要硬币
         * state[1] = 1,组成1元面额 ，需要一个1元硬币
         * state[2] = 1,组成2元面额，需要一个2元硬币
         * state[3] = 2,组成3元面额，需要一个1元一个2元硬币
         * state[4] = 2，组成4元面额，需要2个2元硬币
         * state[5] = 1,组成5元面额，需要1个1元硬币
         * state[6] = 2,组成6元面额，需要1个1元硬币，1个5元硬币
         * state[7] = 2，组成7元硬币，需要1个2元硬币，1个5元硬币
         * state[8] = 3，组成8元硬币，需要1个1元、1个2元、1个5元硬币
         * state[9] = 3，组成9元硬币，需要2个2元硬币，1个5元硬币
         * state[10] = 2，组成10元硬币，需要2个5元硬币
         * state[11] = 3，组成1元硬币，需要2个5元硬币，1个1元硬币
         * 
         * 那么反过来是不是可以这样看
         * 求state[11]的时候，只需要看使用state[10]、state[9]、state[6] 三者最小的值再+1
         * 因为你选一个硬币，就是在当前硬币总金额基础上再选择一个硬币
         * 那么 state[i] = Min(state[i-coins(j)])+1
         *  
        */
    var coinChange = function(coins, amount) {
        let state = new Array(amount+1).fill(amount+1);
        state[0] = 0;
        for(let i = 1;i<=amount;i++){
            //组成i元需要的币数
            for(let j = 0;j<coins.length;j++){
                //每次 探索对应硬币面值
                if(i-coins[j]>=0 && state[i-coins[j]]!=amount+1){
                    //选取的硬币面值 只能小于等于当前金额 并且对应的金额基础已经赋值
                    state[i] = Math.min(state[i],state[i-coins[j]]+1)
                }

            } 
        }
        if(state[amount] == amount+1){
            return -1;
        }else{
            return state[amount];
        }
    };
    var coinChange3 = function(coins, amount) {
        //使用完全背包的方法：
        let n = coins.length;
        let state =  new Array(amount+1).fill(amount+1);
        state[0] = 0;
        for(let i = 0;i<n;i++){
            let coin = coins[i];
            for(let j = coin;j<=amount;j++){
                state[j] = Math.min(state[j],state[j-coin]+1)
            }
        }
        if(state[amount] == amount+1){
            return -1;
        }else{
            return state[amount]
        }
    };

/**
 * 我们有一个数字序列包含 n 个不同的数字，如何求出这个序列中的最长递增子序列长度？
 * 比如 2, 9, 3, 6, 5, 1, 7 这样一组数字序列，它的最长递增子序列就是 2, 3, 5, 7，所以最长递增子序列的长度是 4。
 */