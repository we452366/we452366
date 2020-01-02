## 乐学一百

### 笔试题

#### 使用jQuery在如下元素中写入html文本'HelloWorld'，并设置文本的颜色为红色，及一个你知道的字体
```
  $('#test').html("HelloWorld");
  $('#test').css({'color':'red','font-family':'微软雅黑'})
```

#### 设已知数组如arr=[2,3,5,7]，通过map方法得到每组数字元素的平方的数组，如例子结果为[4,9,25,49]，再通过reduce方法得到这些平方值的总和，尽量使用es6新语法
```
  let arr=[2,3,5,7]
  let newArr=arr.map(item=>item*item);
  let result=newArr.reduce(function(total,num){
    return total+num;
  })
```

#### 写一个类，使得：具有方法hello()，具有只读属性count，它是一个数字，再写一个它的子类，重写基类的hello()方法，在重写的方法中调用基类的hello方法，要求使用es6新语法
```
  class Num{
    get count(){
      return 0;
    }
    hello(){
      console.log('hello')
    }
  }
  class jNum extends Num{
    hello(){
      super.hello();
      console.log('say Hello')
    }
  }

```

#### 写一个vue组件，它使用vuex存储数据，从服务器获取数组数据后，存入vuex并更新组件的显示
```
<template>
  <div>
    {{getLessonName}}
  </div>
</template>
<script>
import {mapState,mapGetters} from 'vuex';
export default {
  computed: {
      // getName(){
      //     return this.$store.getters.getLessonName
      // }
      ...mapGetters(['getLessonName'])
  }
}
</script>
```

#### webpack有哪些常用的配置项？
```
const path = require('path')
module.exports = {
    entry: { // main是默认入口，也可以是多入口
        main: './src/main.js'
    },
    // 出口
    output: {
        filename: './build.js', // 指定js路径
        path: path.join(__dirname, '..', '', 'dist') // 最好是绝对路径
        // 代表上一级的dist
    },
    module: {
        // 一样的功能rules: webpack2.xx新加的
        loaders: [ // require('./a.css||./a.js')
            {
                test: /\.css$/,
                loader: 'style-loader!css=loader',
                //多个loader用!分割
                //顺序是反过来的 2!1  多个loader
            },
            {
                test: /\.(jpg|svg)$/,
                loaderL 'url-loader?limit=4096&name=[name].[ext]',
                // limit=4096&name=[name].[ext]' 多个参数之间用&符号分割
                //[name].[ext]内置提供的
                options: {
                    limit: 4096,
                    name: '[name].[ext]'
                }
            }
        ]  
    },
    plugins: [
        // 插件的执行顺序是依次执行的，和loader是反过来的
        new htmlWebpackPlugin({
            template: './src/index.html',
        })
        // 将src下的template属性描述的文件根据当前配置的output.path，将文件移动到该目录。
        // 在插件的执行过程中，它本身可以去拿当前所设置的webpack选项，便于对webpack选项的复用，
    ]
}
```

#### 已知我们用链表表示两个数字，如234表示链表2->3->4->null，589表示为链表5->8->9->null，试编写程序计算两个整数的和，结果仍以链表表示(注意进位)，以及如何实现乘法计算
```
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function(l1, l2) {
  let n1 = [],n2 = [];
  
  while(l1){
    n1.push(l1.val);
    l1 = l1.next;
  }

  while(l2){
    n2.push(l2.val);
    l2 = l2.next;
  }

  let res = null;
  let rem = 0;

  while(n1.length || n2.length || rem){
    let sum = (n1.pop() || 0) + (n2.pop() || 0) + rem;
    let node = new ListNode(sum%10);
    node.next = res;
    res = node;
    rem = Math.floor(sum/10);
  }
  
  return res;
};
```

#### (上机)翻转一棵二叉树。示例：
```
输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1
```

答案：
```
/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(!root) return null;
    let temp=root.left;
    root.left=root.right;
    root.right=temp;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};
```