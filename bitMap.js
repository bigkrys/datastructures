/**
 * 位图
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