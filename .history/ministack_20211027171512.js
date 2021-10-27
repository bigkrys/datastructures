var MinStack = function() {
    this.stack = [];//原来的栈
    this.ministack = [Infinity]//存放按照压栈顺序中最小的那个值
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
   this.stack.push(x)
   this.ministack.push(Math.min(this.ministack[this.ministack.length -1],x))
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop()
    this.ministack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
   
    return this.stack[this.stack.length-1]
};

/**
 * @return {number}
 */
MinStack.prototype.min = function() {
    
    return this.ministack[this.ministack.length-1]
};