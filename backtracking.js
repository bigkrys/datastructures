/**
 * 回溯
 * 回溯的处理思想，就是列出所有的解，找到满足条件的解。为了有规律的枚举所有的可能的解，
 * 把问题求解的过程分为多个阶段。每个阶段都会面对一个分叉口，先选一条路走到尽头，当还是没有办法
 * 解决的时候，就往回走，回退到上一个分叉口，选择另一种走法继续。
 */

/**
 * 八皇后问题
 * 在一个8*8的棋盘里面，放入8个棋子，使得每个棋子的行、列、对角线都不能有另一个棋子。
 * 找出所有满足要求的放棋子的方法
 * 
 * 解决方案：
 * 将第i个棋子依次放在
 */
 class Queen{
    constructor(){
        this.result = [];
        this.count = 0;
    }
    setQuene(row){
        //在第row行放下棋子
        if(row == 8){
            //8个棋子都放慢了
            this.printQueen();
            return
        }
        for(let column = 0;column<8;column++){
            if(this.isCantSet(row,column)){
                this.result[row] = column;
                this.setQuene(row+1);
            }
        }
    }
    isCantSet(row,column){
        //判断在row行column列放置棋子是否合适
        let leftup = column -1,rightdown = column + 1;
        for(let i = row -1;i>=0;i--){
            if(this.result[i] == column){return false;}//先判断当前行是否有棋子放在 想放置位置的列上
            if(leftup>=0 && this.result[i] == leftup){//判断左上角
                return false;
            }
            if(rightdown<8 && this.result[i] == rightdown){
                //判断右下角
                return false;
            }
            leftup--;
            rightdown ++;


        }
        return true;
    }
    printQueen(){
        this.count++;
        let string = ''
        for(let row = 0;row < 8;row++){
            for(let column = 0;column<8;column++){
                if(this.result[row] == column){
                    string+='Q'
                }else{
                    string+='*'
                }
            }
            string+='\n'
        }
        console.log(string,this.count)
    
    }

}

let q = new Queen();
q.setQuene(0)

 /**
  * 01 背包
  * 有一个背包，背包的总的承载重量是Wkg，现在有n个物品，每个物品的重量不等，并且不可分割。
  * 现在选择几件物品，装载到背包中，在不超过背包所能装载重量的前提下，如何让背包中的物品总重量最大？
  * 
  * 对于每个物品来说，都有两种选择，装或者不装。
  * 对于剩下n个物品，总的装法就是2的n次方，去掉总重量超过Wkg的，从剩下的选择总重量最接近Wkg的。
  * 
  * 
  */
  function backBag(){
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
   let maxW = 0,maxV = 0;//背包最大容量
 
   let result =[];
    for(let i = 0;i<5;i++){
        let array = [];
        for(j=0;j<10;j++){
            array[j] = 0
        }
        result.push(array);
    }
    //i是当前考察的第i个物品，cw是当前背包的容量,cv是总价值
   function findItems(i,cw,cv){
       if(cw == bagWeight || i == items.length-1){
           //背包装满了 或者考察完所有的物品
           if(cw>maxW){
               maxW = cw;
           }
           if(cv>maxV){
               maxV = cv;
           }
           
           return
       }
       if(result[i][cw]) return;//result用来记录已经访问过的i,cw，如果已经访问过了就返回，减少重复访问
       result[i][cw] = true;
       findItems(i+1,cw,cv);//当前物品不装进背包，考察下一个物品
       if(cw + items[i].weight <= bagWeight){
           findItems(i+1,cw + items[i].weight,cv+items[i].value);//当前物品加进来
       }
   }
   findItems(0,0,0);
   return {
    maxW,
    maxV
   };
}
console.log( backBag())





/**
 * 正则表达式
 * 
 */
 class Pattern{
    constructor(pattern){
        this.matched = false;
        this.pattern = pattern;
        this.plen = pattern.length;
    }
    match(text) {
        this.matched = false;
        this.rmatch(0,0,text);
        return this.matched;
        
    }
    rmatch(ti,pj,text){
        if(this.matched)return;//如果已经匹配 就不继续递归
        if(pj == this.plen) {
            //到达结尾
            if(ti == text.length){
                this.matched = true
            }
            return;
        }
        if(this.pattern[pj] == '*'){
            for(let k = 0;k<text.length - ti;k++){
                //把从0到ti的位置的字符 与pattern*后面的字符都匹配一次
                this.rmatch(ti+k,pj+1,text)
            }
        }else if(this.pattern[pj] == '?'){
            //完全相等 或者前面多一个字符 后面全部相等
            this.rmatch(ti,pj+1,text)//完全相等的情况
            this.rmatch(ti+1,pj+1,text)//字符串比它多一个字符 然后后面全部相等的情况
        }else if(ti<text.length && this.pattern[pj] == text[ti]){
            //两个字符都往后移进行对比
            this.rmatch(ti+1,pj+1,text)
        }

    }
}
let p = new Pattern('?.com');
console.log(p.match('.com'))