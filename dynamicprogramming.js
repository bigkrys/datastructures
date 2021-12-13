/**
 * 动态规划
 * 
 */

/**
 * 01背包
 * 对于一组不同重量，不可分割的物品，需要选怎一些装入背包，在满足背包
 * 最大重量限制的前提下，背包中的物品总重量的最大值是多少
 * 
 * 
 * 动态规划的01背包：把整个求解过程分为n个阶段，每个阶段决策一个物品是否放到背包中。
 * 然后记录每一个阶段的状态的集合（去掉重复的）,然后通过当前阶段的状态的集合 来推导下一个阶段的状态的集合，动态的往前推进
 * 比如 一个物品的重量分别是2，2，4，6，3
 * 那么每次选择放或者不放的情况就像下面这样
 *                           (0,0)
 *                  (1,0)                                                    (1,2)
 *          (2,0)                      (2,2)                     (2,2)                     (2,4)
 *   (3,0)        (3,4)          (3,2)      (3,6)          (3,2)       (3,6)       (3,4)         (3,8)
 * (4,0) (4,6)  (4,4) (4,10)  (4,2) (4,8)  (4,6) (4,14) (4,2) (4,10) (4,6) (4,12) (4,4)(4,10) (4,8) (4,14)
 * ....第五个太多了 以此类推
 * 
 * 接下来 遍历每一层的时候 就把重复的节点合并，只记录不同的状态，来保证每一层不同的状态不会超过w个。
 * 用一个二维数组来记录每层可以达到的不同状态
 * 我们这里一共有4个物品，背包的总重量为9，所以列数为9，确保每次决策完背包的重量不超过9
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
