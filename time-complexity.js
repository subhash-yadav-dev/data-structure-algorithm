// o(1) - constant : same speed regardless of input size

function getFirstItem(array) {
  return array[0];
}

// 10 items or 10 million items, same speed

console.log(getFirstItem([1, 2, 3, 4, 5])); // Output: 1

// o(n) - linear : grow with  input size
function findItem(array, item){
    for (let i = 0; i < array.length; i++) {
        if(array[i] === item) return item;
    }
}
// 100 items = 100 operations , 1,000 items = 1,000 operations

console.log(findItem([1, 2, 3, 4, 5], 3)); // Output: 3

// o(n^2) - quadratic : nested loops (Dangerous for large inputs)
function findDuplicates(array){
    for(let i = 0; i < array.length; i++){
        for(let j=i+1; j < array.length; j++){
            if(array[i] === array[j]) return true
        }
    }
}

// 100 items = 10,000 operations, 1,000 items = 1,000,000 operations

console.log(findDuplicates([1, 2, 3, 4, 5, 3])); // Output: true`

// o(log n) - logarithmic : reduces the size of the input in each step
function binarySearch(array, item){
    let low = 0; right = array.length - 1; 
    while(low <= right){
        let mid = Math.floor((low + right) / 2);
        if(array[mid] === item) return mid;
        else if(array[mid] < item) low = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// 1,000 items = 10 operations, 1,000,000 items = 20 operations
console.log(binarySearch([1, 2, 3, 4, 5], 4)); // Output: 3

// o(1)- constanst space
function sum(a, b){
    return a + b; 
}

// o(n) - linear space
function doubleArray(array){
    return array.map(item => item *2)
}
