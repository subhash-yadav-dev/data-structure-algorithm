 // analogy : array is like a train  each car is connected in a order. you can jump to any car if you know the car number

 const array = ['a', 'b', 'c', 'd', 'e'];

// accessing an element by index - O(1)
console.log(array[2]); // Output: 'c'

// finding the index of an element - O(n)
function findIndex(arr, value) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i;
        }
    }
}

let str = 'hello';
// string is like char arrays in js


// operation

// access
array[0]; 
// search 
array.indexOf('c');
// insert end
array.push('f');
// insert start
array.unshift('z');
// delete end
array.pop();
// delete start
array.shift();

// string are immutable in js
// like  str[0] = 'h'  not allowed
str =  'h' + str.slice(1); 

// common patterns 
str.split('').reverse().join('') // reverse a string
str.toLowerCase() === str.split('').reverse().join('').toLowerCase() // check palindrome

function removeElements(arr, element){
    // in place removal
    let writeIndex = 0;
    for(let readIndex = 0; readIndex < arr.length; readIndex++){
        if(arr[readIndex] !== element){
            arr[writeIndex] = arr[readIndex];
            writeIndex++;

        }

    }
    arr.length = writeIndex;
}

// object / hash map
// analogy :  a library card catalog - instead of checking every book , you. look up the title (key) and instantly find the location(value)

const obj = {
    name: 'Alice',
    age: 30,
    city: 'New York'
}

const map = new Map([['name', 'Alice'], ['age', 30]]) 
// map (better for frequent add/delete)
/**
 * key can be any type in map like object, array,
 * maintain insertion order
 * has size property
 * better performance for frequent add/delete
 */

obj['user_123'] = {name: "sob"}; // insert o(1)
const user = obj['user_123']; // access o(1)
delete obj['user_123']; // delete o(1)


map.set('user_123', {name: "sob"}) // insert o(1)
map.get('user_123') // access o(1)
map.delete('user_123') // delete o(1)
map.has('user_123') // check existence o(1)

// most common patterns 
function countOccurrences(arr){
    let countobj = {};
    for(let item of arr){
        countobj[item] = (countobj[item] || 0) + 1;
    }
    return countobj;
}



countOccurrences(['apple', 'banana', 'apple', 'orange', 'banana', 'apple'])

function twoSum (arr, target){
    const numMap = new Map();
    for(let i = 0; i<arr.length; i++){
        const subtract = target - arr[i];
        if(numMap.has(subtract)){
            return [numMap.get(subtract), i];
        }

        numMap.set(arr[i], i) 

    };
    return null;
}; 

console.log(twoSum([2,7,11,15], 9))


// sets 
/**
 * analogy:  a vip list at a club -each name appears only once, and you can check if this person on list quickly
 */

const uniqueSet = new Set([1,2,3,4,4,5]); // {1,2,3,4,5} 
// operations
uniqueSet.add(3) // insert o(1)
uniqueSet.has(2) // check existence o(1)
uniqueSet.delete(4) // delete o(1)
set.size // get size o(1)

// convert array into set
const arrayWithDuplicates = [1,2,2,3,4,4,5];
const uniqueArray = [...new Set(arrayWithDuplicates)]; // [1,2,3,4,5]
