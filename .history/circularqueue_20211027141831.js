//循环队列的实现
//循环队列的关键：往后走一步是 i = (i + 1)% n
class CircularQueue{
    constructor(n){
        this.items = new Array(n);//用数组来实现循环队列
        this.length = n;//队列长度
        this.head = 0;//队头的下标
        this.tail = 0;//队尾的下标
    }
    enqueue(item){
        //入队
        //如果队列已满，入队失败
        if((this.tail +1)%n == this.head){return false;}
        this.items[this.tail] = item;
        this.tail = (this.tail + 1) % n;
        this.length++;
        return true
    }
    dequeue(){
        //队空
        if(this.head == this.tail) {return null;}
        let item = this.items[this.head];
        this.head = (this.head + 1) % n;
        return item
    }
}