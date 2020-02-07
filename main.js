var IList = function () {
};

IList.prototype.init = () => {}; // метод для инициализации var array = new ArrayList(); array.init([1,2,3,4,5])
IList.prototype.toString = () => {}; // +
IList.prototype.getSize = () => {}; // +
IList.prototype.push = (value) => {}; // +
IList.prototype.pop = () => {};
IList.prototype.shift = () => {};
IList.prototype.unshift = (value) => {};
IList.prototype.slice = (start, end) => {};
IList.prototype.splice = (start, numberToSplice, ...elements) => {}; 
IList.prototype.sort = (comparator) => {}; // comparator ==> callback
IList.prototype.get = (index) => {}; // get by index
IList.prototype.set = (index, element) => {}; // set element by index

//ArrayList
var ArrayList = function() {
    IList.apply(this, arguments);
    this.array = [];
};

ArrayList.prototype = Object.create(IList.prototype);
ArrayList.prototype.constructor = ArrayList;

ArrayList.prototype.init = function(initialArray) {
    for (var i = 0; i < initialArray.length; i++) {
        this.push(initialArray[i]);
    }
    // console.log('initialArray', this.array)
    return this.array;
};

ArrayList.prototype.toString = function () {
    var string = '';
    for(var i = 0; i < this.array.length; i ++) {
        this.array.length-1 === i ? string += this.array[i] : string += this.array[i] + ',';     
    }
    return string
}

ArrayList.prototype.getSize = function() {
    return this.array.length;
};

ArrayList.prototype.push = function(value) {
    this.array[this.array.length] = value;
    // console.log("my push work")
    return this.array.length;
};

ArrayList.prototype.pop = function() {
    var lastElementInArray = this.array[this.array.length - 1];
    this.array.length = this.array.length - 1;
    return lastElementInArray;
}

ArrayList.prototype.shift = function() {
    var firstElementInArray = this.array[0];
    delete this.array[0];
    for (var i = 0; i < this.array.length; i++) {
        this.array[i] = this.array[i + 1];
    }
    this.array.length = this.array.length - 1;
    return firstElementInArray;
}

ArrayList.prototype.unshift = function(value) {
    this.array.length = this.array.length + 1;
    for (var i = this.array.length - 1; i > 0; i--) {
        this.array[i] = this.array[i - 1];
    }
    this.array[0] = value; 
    return this.array.length;
}

ArrayList.prototype.slice = function(start, end) {
    var sliceArray = [];
    var spliceEnd = end || this.array.length;
    for (var i = start; i < spliceEnd; i++) {
        sliceArray.push(this.array[i]);
    }
    return sliceArray
}

ArrayList.prototype.splice = function(start, deleteCounter) {
    // var tmpArray = []; //надо поправить здесь
    var tmpArray = new ArrayList(); //надо поправить здесь
    
    var removedArray = [];

    if (start > 0) {
        for (var i = 0; i < start; i++) {
            tmpArray.push(this.array[i]);
        }
    }

    for (var i = start; i < deleteCounter + start; i++) {
        removedArray.push(this.array[i]);
    }

    if(arguments.length > 0) {
        for (var i = 2; i < arguments.length; i++) {
            tmpArray.push(arguments[i]);
        }
    }

    for (var i = deleteCounter + start; i < this.array.length; i++) {
        tmpArray.push(this.array[i]);
    }
    console.log(tmpArray)
    // this.array = tmpArray
    return removedArray
}

ArrayList.prototype.sort = function() {
    for (var i = 0; i < this.array.length - 1; i++) {
        for (var j = 0; j < this.array.length - 1 - i; j++) {
            if (this.array[j] > this.array[j+1]) {
                var tmp = this.array[j+1]
                this.array[j+1] = this.array[j]
                this.array[j] = tmp
            }
        }
    }
    return this.array
}

ArrayList.prototype.get = function(index) {
    return this.array[index];
};

ArrayList.prototype.set = function(index, element) {
    this.array[index] = element;
    return this.array;
};


// var array = new ArrayList(); 
// array.init([4, 6, 2, 5, 3, 1, 8, 7]);
// console.log(array.splice(1, 2, 50, 60, 70));









// LinkedList
var Node = function(value) {
    this.value = value;
    this.next = null;
};

var LinkedList = function() {
    IList.apply(this, arguments);
    this.root = null;
};

LinkedList.prototype = Object.create(IList.prototype);
LinkedList.prototype.constructor = LinkedList;

LinkedList.prototype.getSize = function() {
    var tempNode = this.root;
    var size = 0;

    while(tempNode !== null) {
        tempNode = tempNode.next;
        size++;
    }
    return size;
};

LinkedList.prototype.unshift = function(value) {
    var size = this.getSize();
    var node = new Node(value);

    node.next = this.root;
    this.root = node;

    // console.log(this.root)
    return size + 1;
};

LinkedList.prototype.init = function(initialArray) {
    for (var i = initialArray.length -1; i >= 0; i--) {
        this.unshift(initialArray[i]);
    }
    console.log(this.root)
};

LinkedList.prototype.toString = function() {
    var tempNode = this.root;
    var str = '';
   
    while(tempNode !== null) {
        tempNode.next ? str += tempNode.value + ',': str += tempNode.value + '' ;
        tempNode = tempNode.next    
    }
   
    return str ;
}

LinkedList.prototype.push = function (value) {
    var tempNode = this.root;
    var size = this.getSize();
    if (tempNode === null) {
        this.root = new Node(value);
        return ++size;
    }
    while(tempNode !== null) {
        if (tempNode.next === null) {
            tempNode.next = new Node(value);
            return ++size;
        }
        tempNode = tempNode.next;
    }
};

LinkedList.prototype.pop = function() {
    var size = this.getSize();
    var tempNode = this.root;
    var result;
   
    while(size !== 2) {
        console.log('size', size);
        size--;
        tempNode = tempNode.next; 
    }
    result = tempNode.next.value;
    tempNode.next = null;
    return result;
}

LinkedList.prototype.shift = function() {
    // var tempNode = this.root;
    // var result = tempNode.value;
    // this.root = tempNode.next;

    var result = this.root.value;
    this.root = this.root.next;

    return result;
}

LinkedList.prototype.get = function(index) {
    var tempNode = this.root;
    var size = 0;

    while(size !== index) {
        tempNode = tempNode.next;
        size++;
        console.log('getValue', tempNode);
    }
    // return tempNode.value;
    return tempNode;
};

LinkedList.prototype.set = function(index, element) {
    var tempNode = this.root;
    var size = 0;
    
    while(size !== index) {
        tempNode = tempNode.next;
        size++;
    }

    tempNode.value = element;

}

LinkedList.prototype.sort = function() {
    var tempNode = this.root;
}

LinkedList.prototype.slice = function(start, end) {
    var tempNode = this.root;
    tempNode = this.get(start);
    var newNode = new LinkedList();
   var end = end || this.getSize();
    
    for(var i = start; i < end; i++) {
        newNode.push(tempNode.value);
        tempNode = tempNode.next;
    }
    return newNode;
}

LinkedList.prototype.splice = function(start,end) {

    if (arguments.length === 1) {
        var node = this.get(start);
     //   console.log(node);
        var to = this.getSize();
        for (var i = start; i <= to; i++) {
            this.deleteAt(start);
        }
    }
    if (arguments.length === 2) {
        var node = this.get(start);
    //    console.log(node);
        var to  = end;
        for (var i = start; i <= to; i++) {
            this.deleteAt(start);
        }
    }

    if (arguments.length > 2) {
        var argumentsList = new LinkedList();

        for(var i = 2 ; i < arguments.length;i++ ) {
            argumentsList.push(arguments[i]);
        }
       //console.log(argumentsList);

        var deleteTopIndex = start + end ;

        var node = this.get(deleteTopIndex);
        for(var i = deleteTopIndex +1; i <= this.getSize();i++ ) {
            argumentsList.push(node.value);
            node = node.next;
        }

        var to  = this.getSize();
        for (var i = start; i <= to; i++) {
            this.deleteAt(start);
        }

        var argNode = argumentsList.get(0);
        for (var i = 0; i < argumentsList.getSize(); i++) {

            this.push(argNode.value);
            argNode = argNode.next;
        }
    }
};

LinkedList.prototype.getAt = function(index){
    let counter = 0;
    let node = this.root;
    while (node) {
        if (counter === index) {
           return node;
        }
        counter++;
        node = node.next;
    }
    return null;
}

LinkedList.prototype.deleteAt = function(index){
    // when list is empty i.e. head = null
    if (!this.root) {
        this.root = new Node(data);
        return;
    }
    // node needs to be deleted from the front of the list i.e. before the head.
    if (index === 0) {
        this.root = this.root.next;
        return;
    }
    // else, use getAt() to find the previous node.
    const previous = this.getAt(index - 1);

    if (!previous || !previous.next) {
        return;
    }

    previous.next = previous.next.next;
    return this.root
};


var linkList = new LinkedList();
linkList.init([2,4,8,1,5,6,7]);
console.log(linkList.splice(2,3,40,50,60));








