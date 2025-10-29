// bloom filter save the memory storage. but it not be 100 percent give result accurate . 99 % correct , 1% incorrect.

class BloomFilter {

    constructor(size=100, numHashes= 3){
        this.size = size;
        this.numHashes = numHashes;
        this.bitArray = new Array(size).fill(0)
    };

    _hash(key,seed){
        let hash = 0;
        for(let i=0; i<key.length; i++){
            const char = key.charCodeAt(i)
            hash = (hash * seed + char) % this.size
        };

        return Math.abs(hash)
    };

    _getHashPosition(key){
        const positions = [];

        for(let i=0; i< this.numHashes; i++){
            const seed = i * 31 + 17;
            const position = this._hash(key, seed);
            positions.push(position)
        }
        return positions
    };

    // add item to bloom filter
    add(key){
        const positions = this._getHashPosition(key);

        for(let pos of positions){
            this.bitArray[pos] = 1
        }
    };

    check(key){
        const positions = this._getHashPosition(key);
        for(let pos of positions){
            if(this.bitArray[pos] === 0){ 
                return false // definitely not in set
            }
        }
        return true // might be in set
    }

    visualize() {
        console.log('Bit Array:', this.bitArray.join(''));
        console.log('Ones:', this.bitArray.filter(b => b === 1).length);
        console.log('Zeros:', this.bitArray.filter(b => b === 0).length);
    }
}

module.exports = BloomFilter