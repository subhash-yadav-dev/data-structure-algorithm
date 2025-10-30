
class DisjointSetItem {

    constructor(value, keyCallback){
        this.value = value;
        this.keyCallback = keyCallback;
        this.parent = null;
        this.children = {}
    }

    getKey(){
        // allow user define custom key
        if(this.keyCallback){
            return this.keyCallback(this.value)
        }

        // otherwise use value as key by default
        return this.value
    };

    isRoot(){
        return this.parent === null;
    }

    // get the parent by recursive call
    getRoot(){
        return this.isRoot() ? this : this.parent.getRoot()
    }

    // get number of all ancestors

    getRank(){
        if(this.getChildren().length === 0){
            return 0
        };

        let rank = 0

        this.getChildren().forEach((child)=>{
            // count child itself
            rank += 1;

            //also add all children of current child(refer as another nested object)
            rank += child.getRank()
        })

        return rank
    }

    getChildren(){
        return Object.values(this.children)
    }

    setParent(parentItem, forceSettingParentChild =true){
        this.parent = parentItem
        // this case create one parent to multiple child tree 
        if(forceSettingParentChild){
            parentItem.addChild(this)
        }

        return this
    }

    addChild(childValue){
        // assign value to parent children
        this.children[childValue.getKey()] = childValue;
        // update child parent field by the current object
        childValue.setParent(this, false)
        return this
    }
}


class DisJoinSet {
    constructor(keyCallback){
        this.keyCallback = keyCallback;
        this.items = {}
    }

    makeSet(itemValue){
        const valObj = new DisjointSetItem(itemValue, this.keyCallback)
        // get the key 
        const key = valObj.getKey()

        if(!this.items[key]){
            this.items[key] = valObj
        }

        return this
    }

    find(itemValue){
        const tempValObj = new DisjointSetItem(itemValue, this.keyCallback)
        // get the key 
        const key = tempValObj.getKey();

        //try to find item itself
        const requiredValue = this.items[key];

        if(!requiredValue) return null;

        // if parent null return first object if not recursive call getroot()
        return requiredValue.getRoot().getKey()

    }

    union(valueA, valueB){
        const rootkeyA = this.find(valueA)
        const rootKeyB = this.find(valueB)

        if(rootkeyA === null || rootKeyB === null){
            throw new Error("one or two value are not in sets")
        };

        if(rootkeyA === rootKeyB){
            return this
        }
        // extract the object by key
        const rootA = this.items[rootkeyA];
        const rootB = this.items[rootKeyB];

        if(rootA.getRank() < rootB.getRank()){
            // if rootb tree is bigger then rootb to be new root
            rootB.addChild(rootA)
            return this
        }

        // if roota tree is bigger then roota to be new root
        rootA.addChild(rootB)
        return this
    }

    inSameSet(valueA, valueB){
        const rootkeyA = this.find(valueA)
        const rootKeyB = this.find(valueB)

        if(rootkeyA === null || rootKeyB === null){
            throw new Error("one or two value are not in sets")
        };

        return rootkeyA === rootKeyB
    }
}

const set = new DisJoinSet()
// set.makeSet("A")
// set.makeSet("B")
// set.union("A","B")
// let r= set.find("B")
// console.log(r);


// console.log(set.items)



// ## **🏠 Analogy 1: Apartment Buildings**

// Think of people living in different apartment buildings:
// ```
// Initial:
// Building A: [Alice]
// Building B: [Bob]
// Building C: [Charlie]
// Building D: [David]
// ```

// **Merge buildings (union):**
// When two buildings connect with a bridge, they become one complex:
// ```
// After connecting Building A and B:
// Complex 1: [Alice, Bob]  ← Connected by bridge!
// Building C: [Charlie]
// Building D: [David]
// ```

// **Find building:**
// "Which building complex does Alice live in?" → Complex 1

// **Check neighbors:**
// "Do Alice and Bob live in the same building complex?" → YES!
