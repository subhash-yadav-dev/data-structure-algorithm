
class  Comparator {
    constructor(comparatorFunction){
        this.compare = comparatorFunction || Comparator.defaultComparatorFunction
    }

    static defaultComparatorFunction (a, b){
        if(a === b){
            return 0
        }

        return a < b ? -1 : 1;
    };

    equal(a, b){
        return this.compare(a, b) === 0;
    };

    lessThan(a,b) {
        return this.compare(a, b) < 0;
    };

    greaterThen(a, b){
        return this.compare(a, b) > 0;
    };

    lessThenOrEqual(a, b){
        return this.lessThan(a, b) || this.equal(a, b)
    };

    greaterThenOrEqual(a,b){
        return this.greaterThen(a,b) || this.equal(a,b)
    };

   // reverse the comparison order 
    reverse(){
        const compareOriginal = this.compare
        this.compare = (a,b) => compareOriginal(b,a)
    }
}

module.exports = Comparator