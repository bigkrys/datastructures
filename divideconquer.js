/**
 * 分治算法
 * 将原问题划分成n个规模较小，并且结构与原问题相似的子问题，递归的解决这些子问题，然后再合并其结果，就得到
 * 原问题的解。
 * 分解：将原问题分解成一系列的子问题；
 * 解决：递归地求解各个子问题。若子问题足够小，则直接求解；
 * 合并：将子问题的结果合并成原问题。
 */

/**
 * 使用归并排序 来求逆序对的个数
 * 
 */
 function getReverseDegree(nums){
    return mergeSort(nums,0,nums.length-1)
 }

 function mergeSort(nums,p,r){
    if(p>=r) return 0;
    let q = Math.floor((p+r)/2);
    let left = mergeSort(nums,p,q);
    let right  = mergeSort(nums,q+1,r);
    let m = merge(nums,p,q,r);
    return left+right+m;
     
 }
 function merge(array,p,q,r){
    let i=p,j=q+1,k=0,result = [],count = 0;
    while(i<=q && j<=r){
        if(array[i] <= array[j]){
            result.push(array[i]);
            i++;
        }else{
            count += (q -i+1);//统计p-q之间 比a[j]大的个数，因为数组本来是已经有序了，既然当前这个数比他大，那么在它右边的都比它大
            result.push(array[j]);
            j++;
        }
    }
    if(i<=q){
        result =  result.concat(array.slice(i,q+1));
    }
    if(j<=r){
        result = result.concat(array.slice(j,r+1));
    }
    for( i = 0;i<result.length;i++){
        array[i + p] = result[i]
    }
    return count;
 }
 console.log(getReverseDegree([1,5,6,2,3,4]))


 /**
  * 有两个 n*n 的矩阵 A，B，如何快速求解两个矩阵的乘积 C=A*B
  * 矩阵的乘积
  * C = A * B
  * C = [
  *       C11  C12
  *       C21  C22
  *     ]
  * A = [
  *      A11  A12
  *      A21  A22
  * ]
  * 
  * B = [
  *      B11 B12
  *      B21 B22
  * ]
  * 
  * 那么C11 = A11 * B11 + A12 * B21
  *     C12 = A11 * B12 + A12 * B22
  *     C21 = A21 * B11 + A22 * B21
  *     C22 = A21 * B12 + A22 * B22
  * 
  * n *n 矩阵被分成4个（n/2）*(n/2)的子矩阵（假设是正方形的矩阵）
  * 
  * 
  */

  function matrixMultiply(a,b){
    let n = a.length,c ;
    if(n == 1) {
        c = makeArray(1);
        c[0][0] = a[0][0] * b[0][0]
    }else{
        c = makeArray(n)
        //将a,b分别分区成四个a11,a12,a21,a22
        let [a11,a12,a21,a22] = partitionMatrix(a);
        let [b11,b12,b21,b22] = partitionMatrix(b);
        let [c11,c12,c21,c22] = partitionMatrix(c);
        c11 = addMatrix(matrixMultiply(a11,b11),matrixMultiply(a12,b21));
        c12 = addMatrix(matrixMultiply(a11,b21),matrixMultiply(a12,b22));
        c21 = addMatrix(matrixMultiply(a21,b11),matrixMultiply(a22,b12));
        c22 = addMatrix(matrixMultiply(a21,b12),matrixMultiply(a21,b22));
        c = mergeMatrix(c11,c12,c21,c22);
    }
    return c;

}
function partitionMatrix(a){
    //将一个矩阵分成四个
    let n = a.length,n2 = n/2,a11 = makeArray(n2),a12 = makeArray(n2),a21 = makeArray(n2),a22 = makeArray(n2);
    for(let i = 0;i<n2;i++){
        for(let j = 0;j<n2;j++){
            let value1 = a[i][j],value2 = a[i][j+n2],value3 = a[i+n2][j],value4 = a[i+n2][j+n2];
            a11[i][j] = value1;
            a12[i][j] = value2;
            a21[i][j] = value3;
            a22[i][j] = value4;
        }
    }
    return [a11,a12,a21,a22];
}
function makeArray(n){
    let newarray = [];
    for(let i = 0;i<n;i++){
        let array = [];
        for(j=0;j<n;j++){
            array[j] = 0
        }
        newarray.push(array);
    }
    return newarray;
}
function addMatrix(a,b){
    //将两个矩阵相加
    let n = a.length,c = makeArray(n);
    for(let i = 0;i<n;i++){
        for(let j = 0;j<n;j++){
            c[i][j] = a[i][j ] + b[i][j]
        }
    }
    return c;
}
function mergeMatrix(a11,a12,a21,a22){
    //将四个小矩阵 整合成一个大的矩阵。
    // console.log(a11,a12,a21,a22)
    let n2 = a11.length,n = n2 *2,array = makeArray(n);
    for(let i = 0;i<n;i++){
        for(let j = 0;j<n;j++){
            if(i<=n2-1 && j<=n2-1){
                array[i][j] = a11[i][j];
            }else if(i<=n2-1 && j>n2-1){
                array[i][j] = a12[i][j-n2];
            }else if(i>n2-1 && j<=n2-1){
                array[i][j] = a21[i-n2][j];
            }else{
                array[i][j] = a22[i-n2][j-n2];
            }
        }
    }
    return array;
}
let array = [
    [1,2,3,4],
    [5,6,7,8],
    [9,10,11,12],
    [13,14,15,16]
]
console.log(matrixMultiply(array,array))



 /**
  * 二维平面上有 n 个点，如何快速计算出两个距离最近的点对？
  * https://zhuanlan.zhihu.com/p/296231213
  */

  function distance(x,y){
    //根据两个点的坐标求两点之间直线距离
    return Math.sqrt( Math.pow((x[0] - y[0]),2)+ Math.pow(x[1] - y[1],2) );
 }
 function divideMinDistance(points){
     let n = points.length;
     if(n<2){
         return 99999
     }else if(n == 2){
         return (distance(points[0],points[1]))
     }
     let newpoints = points.sort((a,b)=>a[0]-b[0]);//点根据x轴坐标排序
     //根据x轴分开两边分别求最短距离
     let half = Math.floor(n/2);
     let lefnew = newpoints.slice(0,half);
     let rightnew = newpoints.slice(half,n)
     let d1 = divideMinDistance(lefnew);
     let d2 = divideMinDistance(rightnew);
     let d = Math.min(d1,d2);
     console.log(n,half,d1,d2,d,newpoints,lefnew,rightnew)
     //中间线的点
     let calibration = newpoints[half][0];
     let left = [],right = [];
     for(let u in newpoints){
         if(calibration - d < u[0] && u[0] < calibration){
             left.push(u);
         }else if(calibration <= u[0] && u[0] < calibration + d){
             right.push(u);
         }
     }
     right = right.sort((a,b)=>a[0]-b[0]);//右侧点集根据x轴坐标排序
     let res = d;
     for(let u in left){
         let l = -1,r = right.length-1
         while(r - l >1){
             let m = (l + r) >> 1 ;// /2
             if(right [m][1] <= u[1] -d){
                 //在框内
                 l = m;
             }else{
                 r = m;
             }
         }
         let idx = r;
         for(let j = 0;j< 7;j++){
             if(j + idx >= right.length){
                 break;
             }
             let dd = distance(u,right[idx+j])
             if( dd < res){
                 res = dd;
             }
         }
     }
     return res;

 }
 
 function getPoints(n){
    let points = [];
    for(let i = 0;i<n;i++){
        let point = [Math.ceil(Math.random()*100),Math.ceil(Math.random()*100)];
        points.push(point);
    }
    return points;
 }
 let points = getPoints(20);
//  console.log(points)
 console.log(divideMinDistance(points))