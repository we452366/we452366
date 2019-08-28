//队列 栈 链表 hash表 树 图

//队列 排队 先进先出
class Queue{
    constructor(){
        this.queue=[];
    }
    enqueue(element){
        this.queue.push(element);
    }
    dequeue(){
        this.queue.shift();
    }
}
let q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.dequeue();
console.log(q.queue);

//栈的特点就是先进后出 代码执行的时候就是个栈 （执行上下文销毁的时候 就是从里向外的）
class Stack{
    constructor(){
        this.stack=[];
    }
    put(element){
        this.stack.push(element);
    }
    pop(){
        this.stack.pop();
    }
}
let s = new Stack();
s.put(1);
s.put(2);
s.pop();
console.log(s.stack);

//链表 单向链表 双向链表 循环链表
//操作数据 不需要破坏数据的原有结构
class Node{//代表的是链表中的某一个节点
    constructor(element){
        this.element=null;
        this.next=null;
    }
}
class LinkList{
    constructor(){
        this.head=null;
        this.length=0;
    }
    append(element){
        let node = new Node(element);
        if(!this.head){
            this.head=node;
        }else{
            let index=0;//从0项开始查找
            let current=this.head;//先把链表的头拿出来 开始查找
            while(++index < this.length){
                current=current.next; //如果当前不是最后一项就把这个结点的下一项继续查找
            }
            current.next=node;
        }
        this.length++;
    }
    insert(position,element){
        let node = new Node(element);
        if(!this.head){
            this.head=node;
        }else{
            let index=0;
            let current=this.head;
            let previous=null;
            while(index++ < position){//找到要在谁之前插入那一项
                previous=current;//拿到要插入到哪项之前
                current=current.next;//
            }
            previous.next=node;
            node.next=current;
        }
        this.length++;
    }
}
let ll = new LinkList();
ll.append(1);
ll.append(2);
ll.append(3);
ll.insert(1,100)
console.log(JSON.stringify(ll));
console.log(ll);

//4) 集合 放置 不能重复的项 交集 并集 差集
class Set{
    constructor(){
        this.set={};
    }
    add(element){
        if(this.hasOwnProperty){
            this.set[element]=element;
        }
    }
}
let set = new Set();//set的特点就是 key value 相同
set.add(1);
set.add(1);

//5) hash表 取值快而且es6已经提供了
class Map{ //松散 重复的话可以再加上链表 
    constructor(){
        this.arr=[];
    }
    calc(key){
        let total=0;
        for(let i=0;i<key.length;i++){
            total+=key[i].charCodeAt()
        }
        return total % 100
    }
    set(key,value){
        this.calc(key);
        this.arr[key]=value;
    }
    get(key){
        key=this.calc(key);
        return this.arr[key];
    }
}

let map = new Map();
map.set('abc',123);
map.set('bbg',456);

//console.log(map.arr);
console.log(map.get('abc'));

//二叉树 二叉查找树 数据存储方式 小的放左边 大的放右边
//树的遍历
class Node{
    constructor(){
        this.element=element;
        this.left=null;
        this.right=null;
    }
}
class Tree{
    constructor(){
        this.root=null;//树的根
    }
    insert(root,node){
        if(newNode.element<root.element){
            if(root.left==null){
                root.left=newNode;
            }else{
                this.insert(root.left,newNode)
            }
        }else{
            if(root.right==null){
                root.right=node;
            }else{
                this.insert(root.right,newNode)
            }
        }
    }
    add(element){
        let node = new Node(element);
        if(!this.root){
            this.root=node;
        }
    }
}
let tree=new Tree();
tree.add(100);
tree.add(60);
console.log(JSON.stringify(tree));

//图 邻接表 （图 树直接的节点产生了关联就是图）