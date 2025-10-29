const SingleLinkedList = require("./linkedlist");

const defaultHashTableSize = 32;
class HashTable {

    constructor(HashTable = defaultHashTableSize ){
        // create hash table with certain size and fill with each bucket with empty linkedlist
        this.buckets = Array(HashTable).fill(null).map(()=>new SingleLinkedList)

        // keep or track the actual keys in a fast way
        this.keys = {};
    };

    hash(key){
        let total = 0;
        const PRIME = 31; // prime reduce patterns

        for(let i=0; i< key.length; i++){
            const char = key[i]
            const value = char.charCodeAt(0)
            total = (total * PRIME + value) % defaultHashTableSize
        }
        return total

    };

    set(key, value){
        const keyHash = this.hash(key);
        // save key with key hash value in object
        this.keys[key] = keyHash;

        // get the bucket by the keyHash index of array of buckets
        const bucketLinklist = this.buckets[keyHash]
        const node = bucketLinklist.find({callback: (nodeValue) => nodeValue.key === key})
        
        if(!node){
            // insert new node
            bucketLinklist.append({key,value});
        }else{
            // update value of existing node
            node.value.value = value
        }
        return this
    }

    get(key){
        const keyHash = this.hash(key);
        const bucketLinklist = this.buckets[keyHash]

        // find the node 
        const node = bucketLinklist.find({callback: (nodevalue) => nodevalue.key === key})
        return node ? node.value.value : undefined 

    };

    delete(key){
        const keyHash = this.hash(key);
        delete this.keys[key];
        const bucketLinklist = this.buckets[keyHash];

        // find the node 
        const node = bucketLinklist.find({callback: (nodeValue) => nodeValue.key === key})
        if(node){
            return bucketLinklist.deleteValue(node.value)
        }
        return null

    };

    getKeys(){
        return Object.keys(this.keys)
    };

    getValues(){
        return this.buckets.reduce((values,bucket)=>{
            const bucketValues = bucket.toArray().map((
                linkedListNode) => linkedListNode.value
            );
            return values.concat(bucketValues)
        },[])
    };

    has(key){
        return Object.hasOwnProperty.call(this.keys, key)
    }
}

const hashTable = new HashTable()
hashTable.set("c",30)
hashTable.set("c",40)
// hashTable.set("d",440)
// hashTable.delete('c')
console.log(hashTable.getValues())