// Analogy: a stack is like a stack of plates where you can only add or remove the top plate.
// LIFO - last in first out
// real world examples: undo/redo, browser history

const SingleLinkedList = require("./linkedlist");

class Stack {
    constructor(){
        this.linkedList = new SingleLinkedList();
    }

    isEmpty(){
        return !this.linkedList.head
    }

    peek(){
        if(this.isEmpty()){
            return null;
        }
        return this.linkedList.head.value;
    }

    // add value to the top of the stack
    push(value){
        this.linkedList.prepend(value);
        return this;
    }

    // remove value from the top of the stack
    pop(){
        const removeHead = this.linkedList.deleteHead()
        return removeHead ? removeHead.value : null;
    }

    toArray(){
        return this.linkedList.toArray()
    }

    toString(callback){
        return this.linkedList.toString(callback);
    }
}

module.exports = Stack;

