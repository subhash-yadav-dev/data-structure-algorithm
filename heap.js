// Generic Heap implementation
// Can be extended to MinHeap or MaxHeap by overriding pairIsInCorrectOrder method
// Time Complexity:
// Insertion: O(log N)
// Removal: O(log N)
// Peek: O(1)
// Space Complexity: O(N)
// trick to represent a binary tree in an array , fill the tree level by level from left to right
// parentIndex = Math.floor((childIndex - 1) / 2) //parent node of a given child node
// leftChildIndex = (2 * parentIndex) + 1 // left child of a given parent node
// rightChildIndex = (2 * parentIndex) + 2 // right child of a given parent node

const Comparator = require("./utils/comparator");

class Heap {

    constructor(comparatorFunction){
        // prevent direct instantiation of Heap class
        if(new.target === Heap){
            throw new TypeError('Cannot construct Heap instance directly');
        };

        this.heapContainer = [];
        this.compare = new Comparator(comparatorFunction);
    }

    // this method should be overridden by the subclasses
    pairIsInCorrectOrder(firstElement, secondElement) {
        throw new Error(`
            You have to implement heap pair comparison method
            for ${firstElement} and ${secondElement} values.
        `);
    }

    // helper methods
    swap(indexOne, indexTwo){
        const tmp = this.heapContainer[indexOne];
        this.heapContainer[indexOne] = this.heapContainer[indexTwo];
        this.heapContainer[indexTwo] = tmp;
    };

    getParentIndex(childIndex){
        return Math.floor((childIndex - 1) / 2);
    };

    getLeftChildIndex(parentIndex){
        return (2 * parentIndex) + 1;
    };

    getRightChildIndex(parentIndex){
        return (2 * parentIndex) + 2;
    };

    getParent(childIndex){
        return this.heapContainer[this.getParentIndex(childIndex)]
    };

    hasLeftChild(parentIndex){
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
    }

    hasRightChild(parentIndex){
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length;
    }

    hasParent(childIndex){
        return this.getParentIndex(childIndex) >= 0;
    }

    // insert always new value at the end of the heap, and heapify up to maintain heap property
    insert(value){
        this.heapContainer.push(value);
        this.heapifyUp(this.heapContainer.length - 1);
    };

    // help to maintain heap property after insertion
    // always compare the inserted node with its parent node, if the pair is not in correct order, swap them
    // doesn't see the left and right child nodes , doesn't see the bigger or smaller nodes, only care about parent node
    // this is always go up side comparison. because new element add to the end. so no child exist so compare to the parent only

    heapifyUp(index){
        let currentIndex = index || this.heapContainer.length - 1;

        while(
            this.hasParent(currentIndex)
            && !this.pairIsInCorrectOrder(
                this.getParent(currentIndex),
                this.heapContainer[currentIndex]
            )
        ){
            this.swap(currentIndex, this.getParentIndex(currentIndex))
            currentIndex = this.getParentIndex(currentIndex)
        }
    };

    // remove always the root node, replace it with the last node, and heapify down to maintain heap property
    poll(){
        if(this.heapContainer.length === 0) return null;

        if(this.heapContainer.length === 1) return this.heapContainer.pop();

        const root = this.heapContainer[0];
        this.heapContainer[0] = this.heapContainer.pop();
        this.heapifyDown(0);
        return root;
    };

    remove(item, comparator = this.compare){
        const numberOfItemsToRemove = this.find(item,comparator).length
        // we need to find item index to remove each time after remove since
        // indices are changed after the each heapify process
        for(let iteration =0; iteration < numberOfItemsToRemove; iteration+=1){
            const indexToRemove = this.find(item, comparator).pop()

            // if the index end no need to heapify
            if(indexToRemove === (this.heapContainer.length -1)){
                this.heapContainer.pop()
            }else{
                // move last element in heap to the remove position.
                this.heapContainer[indexToRemove] = this.heapContainer.pop()
                // get the parent 
                const parentItem = this.getParent(indexToRemove)
                const hasChildren = this.hasLeftChild(indexToRemove)

                if(hasChildren){
                    if(!parentItem){
                        // Root node  with children - can only go down
                        this.heapifyDown(indexToRemove)
                    }else if(this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])){
                        // parent node in correct order - go down
                        this.heapifyDown(indexToRemove)
                    }else{
                        // parent node not in correct order - go up
                        this.heapifyUp(indexToRemove)
                    }
                }else{
                    // no children can only go up
                    this.heapifyUp(indexToRemove)
                }
            }

        }
        return this
    }

    heapifyDown(index){
        let currentIndex = index;

        while(true){
            const leftChildIndex = this.getLeftChildIndex(currentIndex);
            const rightChildIndex = this.getRightChildIndex(currentIndex);
            let compareNodeIndex = currentIndex;

            // check left child
            if(leftChildIndex < this.heapContainer.length && 
                !this.pairIsInCorrectOrder(
                    this.heapContainer[compareNodeIndex],
                    this.heapContainer[leftChildIndex]
                )
            ){
                compareNodeIndex = leftChildIndex;
            }

            // check right child
            if(rightChildIndex < this.heapContainer.length && 
                !this.pairIsInCorrectOrder(
                    this.heapContainer[compareNodeIndex],
                    this.heapContainer[rightChildIndex]
                )
            ){
                compareNodeIndex = rightChildIndex;
            }

            if(compareNodeIndex !== currentIndex){
                this.swap(currentIndex, compareNodeIndex);
                currentIndex = compareNodeIndex;
            }else{
                break;
            }
            
        }
    }
    
    peek(){
        if(this,this.heapContainer.length === 0){
            return null;
        }
        return this.heapContainer[0];
    };

    find(item, comparator = this.compare){
        const foundItemIndices = [];

        for(let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex++){
            if(comparator.equal(item, this.heapContainer[itemIndex])){
                foundItemIndices.push(itemIndex);
            }
        };

        return foundItemIndices;
    };
}

class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.lessThenOrEqual(firstElement, secondElement)
    }
}

class MaxHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondElement) {
        return this.compare.greaterThenOrEqual(firstElement,secondElement)
    }
}



module.exports = {
    MaxHeap,
    MinHeap
}