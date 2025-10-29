const {MinHeap} = require('./heap');
const Comparator = require('./utils/comparator');

class PriorityQueue extends MinHeap{
    constructor(){
        super(); // calling parent class constructor first

        // set the priorities map to store priorities of items
        this.priorities = new Map();

        // use custom comparator for priority queue instead of default min heap comparator
        this.compare = new Comparator(this.comparePriority.bind(this));
    };

    // this function help to identify the element of the  heap function 
    comparePriority(a, b) {
        if (this.priorities.get(a) === this.priorities.get(b)) {
            return 0;
        }
        return this.priorities.get(a) < this.priorities.get(b) ? -1 : 1;
    }

    add(item, priority = 0){
        this.priorities.set(item, priority);
        super.insert(item)
        return this;
    };

    remove(item, customFindingComparator){
        super.remove(item, customFindingComparator);
        this.priorities.delete(item);
        return this;
    };

    changePriority(item, priority){
        this.remove(item, new Comparator(this.compareValue));
        this.add(item, priority);
        return this;
    };

    findByValue(value){
        return this.find(value, new Comparator(this.compareValue));
    };

    // check item already exist in a queue
    hasValue(value){
        return this.findByValue(value).length > 0;
    };

    // compare value of two items
    compareValue(a,b) {
        if (a === b){
            return 0;
        }
        return a < b ? -1 : 1;
    };
}

const priorities = new PriorityQueue()

priorities.add('ok',10)
priorities.add('o',100)
