// analogy: A linked list is like a treasure map where each clue leads to the next one.

/**
 * when to used linked list 
 * frequent insert and delete at the beginning or middle 
 * don't need random access elements
 * implement stacks and queues
 */

class Node {
    constructor(value, next = null){
        this.value = value;
        this.next = next;
    }
}
const Comparator = require("./utils/comparator"); 

class SingleLinkedList {

    constructor(comparatorFunction){
        this.head = null;
        this.tail = null;
        this.compare = new Comparator(comparatorFunction)
    }

    // add value to the start of the list
    prepend(value){
        const newNode = new Node(value,this.head)
        this.head = newNode;

        // if no tail yet lets make new node tail
        if(!this.tail){
            this.tail = newNode;
            return this
        }
        return this
    }

    // add value to the end of the list
    append(value){
        const newNode = new Node(value);
        if(!this.head){
            this.head = newNode;
            this.tail = newNode;
            return this
        }

        this.tail.next = newNode;
        this.tail = newNode;
        return this
    }

    // add value at specific index
    insertAt(value, index){
        let positionIndex = index < 0 ? 0 : index;

        if(positionIndex === 0){
            this.prepend(value)
            
        }else {
            let count = 0;
            let currentNode = this.head;
            let newNode = new Node(value);

            while(currentNode){
                if(positionIndex === count + 1){
                    break // break one loop before the index
                }
                currentNode = currentNode.next;
                count++
            }

            if(currentNode){
                newNode.next  = currentNode.next; // set newNode next to current node next
                currentNode.next = newNode
            }else{

                if(this.tail){
                    this.tail.next = newNode;
                    this.tail = newNode;
                }else{
                    // list is empty
                    this.head = newNode;
                    this.tail = newNode
                }
            }
        }
        return this

    };

    deleteHead(){
        if(!this.head){
            return null
        };
        const deleteNode = this.head;
        this.head = this.head.next;
        return deleteNode;
    };

    deleteTail(){
        
        if(!this.head){
            return null
        };

        if(this.head === this.tail){
            const deleteNode = this.head;
            this.head = null;
            this.tail = null;
            return deleteNode
        };

        let currentNode  = this.head;
        while(currentNode.next !== this.tail){
            currentNode = currentNode.next
        }

        const deleteNode = this.tail;
        currentNode.next = null;
        this.tail = currentNode;
        return deleteNode;

    };

    deleteAt(index){
        
        if(!this.head || index < 0){
            return null
        }

        if(index === 0){
            return this.deletePrepend()
        }

        let currentNode = this.head;
        let count = 0;

        while(currentNode.next && count < index - 1){ // stop at the node before the target
            currentNode = currentNode.next;
            count++
        }

        if(!currentNode.next){ // index out of bounds
            return null
        }

        const deletedNode = currentNode.next;
        //last node
        if(deletedNode === this.tail){
            currentNode.next = null
            this.tail = currentNode
        }else{
            //middle node
            currentNode.next = deletedNode.next
        }
            
        return deletedNode;        
    };

    deleteValue(value){

        if(!this.head){
            return null
        };

        let deleteNode = null
        if(this.head && this.compare.equal(this.head.value , value)){
            deleteNode = this.head;
            this.head = this.head.next
        };

        let currentNode = this.head;

        if(currentNode !== null){ // if node not single
            
            while(currentNode.next){
                if(this.compare.equal(currentNode.next.value , value)){
                    deleteNode = currentNode.next; // save deleted node for return
                    // here remove the delete node like => head => deletenode => node. answer is head=>node 
                    currentNode.next = currentNode.next.next
                }else{
                    // iterate next step
                    currentNode = currentNode.next 
                }
            } 
        }


        // check if tail must be deleted
        if(this.compare.equal(this.tail.value , value)){
            this.tail = currentNode
        }

        return deleteNode
    };

    find({value = undefined, callback = undefined }){
        if(!this.head){
            return null
        }

        let currentNode = this.head;
        while(currentNode){
            // if callback is specified then try to find node by callback
            if(callback && callback(currentNode.value)){
                return currentNode
            };

            if(value !== undefined && this.compare.equal(currentNode.value === value)){
                return currentNode
            }

            currentNode = currentNode.next
        }
        return null
    };

    reverse(){

        if(!this.head || this.head === this.tail){
            return this
        };

        let prevNode = null;
        let currentNode = this.head;

        while(currentNode){
            const nextNode = currentNode.next; // store next node before loseing reference
            currentNode.next = prevNode;
            prevNode = currentNode;

            currentNode = nextNode; // move the current node next iteration
        }

        // swap head and tail
        
        const temp = this.head;
        this.head = this.tail;
        this.tail = temp;
        return this
    };

    toArray(){
        const elements = [];
        let currentNode = this.head;
        while(currentNode){
            elements.push(currentNode.value);
            currentNode = currentNode.next
        }
        return elements
    };

    fromArray(values){
        values.forEach(value => this.append(value))
    }

    toString(callback){
        return this.toArray().map((node)=>node.toString(callback)).toString()
    }
}

module.exports  = SingleLinkedList;

