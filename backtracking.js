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
             weight:3,
             value:5
         },
         {
            name:'雪梨',
            weight:2,
            value:2
        },
        {
            name:'草莓',
            weight:1,
            value:4,
        },
        {
            name:'波罗蜜',
            weight:1,
            value:2
        },,
        {
            name:'皇帝柑',
            weight:4,
            value:10
        }
     ]
     let bag = 8;//背包总容量
     let i = 0,cw = 0;//cw 为背包当前容量
     function find(i,cw){
         if(cw == bag || i == items.length-1){
             //装满或者考察完所有物品
             console.log(cw,result)
             return
         }
         find(i+1,cw);
         if(cw + items[i] <= w){
             result.push(items[i])
             f(i+1,cw+items[i])
         }
    }
 }
 