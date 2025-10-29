// Analogy : a queue is like a line of people waiting for coffee where the person who arrives first is served first.
// FIFO - first in first out
// real world examples: printer queue, task scheduling

const SingleLinkedList = require("./linkedlist");

class Queue {
    constructor(){
        this.linkedList = new SingleLinkedList();

    }

    isEmpty(){
        return !this.linkedList.head;
    }

    peek(){
        if(this.isEmpty()){
            return null;
        }

        return this.linkedList.head.value;
    }

    // add value to the end of the queue
    enqueue(value){
        this.linkedList.append(value);
        return this 
    }

    // remove value from the front of the queue

    dequeue(){
        const removeHead = this.linkedList.deleteHead();
        return removeHead ? removeHead.value : null;
    }

    toString(callback){
        return this.linkedList.toString(callback);
    }
}

// priority queue 
/**
 * Ananlogu : people waiting in line at the airport, where some people have higher priority (e.g., first class passengers) and are served before others.
 * Each person in the queue has a priority level, and those with higher priority are served first, regardless of their arrival time.
 * real world examples: hospital emergency rooms, customer support systems
 */

