const Comparator = require("./utils/comparator");

class DoublyLinkedListNode {
    constructor(value, next=null, previous=null){
        this.value = value
        this.previous= previous
        this.next = next
    }

    toString(callback){
        return callback ? callback(this.value) : `${this.value}`
    }
}

class DoublyLinkedList {
    constructor(comparatorFunction){
        this.head = null
        this.tail = null
        this.compare = new Comparator(comparatorFunction)
    }

    // value add to first
    prepend(value){
        const newNode = new DoublyLinkedListNode(value,this.head)

        if(this.head){
            // first node make to second so that add new node is previous
            this.head.previous = newNode
        }
        this.head = newNode

        if(!this.tail){
            this.tail = newNode
        }

        return this

    }

    append(value){
        const newNode = new DoublyLinkedListNode(value)
        if(!this.head){
            this.head = newNode
            this.tail = newNode
            return this
        }
        // add value to end by taking reference of tail address
        this.tail.next = newNode

        // add current node to the new node as previous
        newNode.previous = this.tail
       // set new node to be tail
        this.tail = newNode

        return this
    }

    delete(value){
        if(!this.head){
            return null
        }

        let deletedNode = null
        let currentNode = this.node;

        while(currentNode){

            if(this.compare.equal(currentNode.value,value)){
                deletedNode = currentNode

                if(deletedNode === this.head){
                    // if value single and same tail and head then update
                    if(deletedNode === this.tail){
                        this.tail = null
                    }

                    this.head = deletedNode.next
                    // case for multiple node connected each other
                    if(this.head){
                        this.head.previous = null
                    }

                    
                }else if(deletedNode === this.tail){
                    this.tail = deletedNode.previous
                    this.tail.next = null
                }else{
                    // middle node delete
                    const previousNode = deletedNode.previous
                    const nextNode = deletedNode.next

                    previousNode.next = nextNode
                    nextNode.previous = previousNode
                }
            }

            currentNode = currentNode.next
        }
        return deletedNode
    }

    find({value = undefined, callback= undefined}){
        if(!this.head){
            return null
        };

        let currentNode = this.head

        while(currentNode){
            if(callback && callback(currentNode.value)){
                return currentNode
            }

            if(value !== undefined && this.compare.equal(currentNode.value, value)){
                return currentNode
            }

            currentNode = currentNode.next
        }
        return null
    }

    deleteHead(){
        if(!this.head){
            return null;
        }
        const deletedHead = this.head
        if(this.head.next){
            this.head = this.head.next
            this.head.previous = null
        }else{
            this.head = null
            this.tail = null
        }
        return deletedHead

    }

    deletedTail(){
        if(!this.tail){
            return null
        }
        // only one node exist
        if(this.head === this.tail){
            let deletedTail = this.tail
            this.head = null
            this.tail = null
            return deletedTail
        }
        const deletedTail = this.tail
        this.tail = this.tail.previous;
        this.tail.next = null

        return deletedTail
    }

    reverse(){
        let currentNode = this.head
        let prevNode = null
        let nextNode = null;

        if(!this.head || this.head === this.tail){
            return this
        };

        while(currentNode){
            nextNode = currentNode.next
            prevNode = currentNode.previous
            // change the link
            currentNode.next = prevNode
            currentNode.previous = nextNode

            // move prevNode and next node one step forward
            prevNode = currentNode
            currentNode = nextNode

        }

        // reset head and tail
        this.tail = this.head
        this.head = prevNode

        return this
    }

    fromArray(values){
        values.forEach((value)=> this.append(value))
    }

    toArray(){
        const nodes =[]
        let currentNode = this.head
        while(currentNode){
            nodes.push(currentNode)
            currentNode = currentNode.next
        }
        return nodes
    }

    toString(callback){
        return this.toArray().map((node)=>node.toString(callback)).toString()
    }
}

const doublyLinkedList = new DoublyLinkedList()
doublyLinkedList.append(10)
doublyLinkedList.append(20)
doublyLinkedList.prepend(80)

console.log(doublyLinkedList)