/**
 * 位图
 * 就是使用一个bit来记录一个数据；
 * 布隆过滤器：使用一个b位图，然后通过哈希函数，对数据进行处理，让数据落在位图大小范围内。
 * 布隆过滤器的处理思路：使用K个哈希函数，对同一个数字进行求哈希值，得到K个不同的哈希值，分别计作
 * X1,X2,...,Xk。将这K个数字作为位图的下标，将对应的BitMap[X1],BitMap[X2],...,BitMap[Xk],
 * 都设置为true，用k个二进制位来表示一个数字的存在。
 * 
 * 同样的，当需要查询某个数字是否存在的时候，使用同样的K个哈希函数，对这个函数求哈希值，分别得到
 * Y1,Y2,...,YK,查看这K个哈希值对应位图中的值是否都为true，则说明，这个数字存在，如果有其中一个不存在，
 * 则说明数字不存在。
 * 
 */
 class BitMap{
    constructor(nbits){
        this.nbits = nbits;
        this.bytes = new Array(16+1);

    }
    set(k){
        if(k > this.nbits) return ;
        let byteIndex = Math.trunc(k/16);
        let bitIndex = k%16;
        this.bytes[byteIndex] |= (1 << bitIndex);
    }
    get(k){
        if (k > this.nbits) return false;
        let byteIndex = Math.trunc(k/16);
        let bitIndex = k%16;
        return this.bytes[byteIndex] & (1 << bitIndex);
    }
}

let b = new BitMap(32);
b.set(5);
console.log(b.get(5))