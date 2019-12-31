## 乐学一百

### 笔试题

#### 使用jQuery在如下元素中写入html文本'HelloWorld'，并设置文本的颜色为红色，及一个你知道的字体

#### 设已知数组如arr=[2,3,5,7]，通过map方法得到每组数字元素的平方的数组，如例子结果为[4,9,25,49]，再通过reduce方法得到这些平方值的总和，尽量使用es6新语法

#### 写一个类，使得：具有方法hello()，具有只读属性count，它是一个数字，再写一个它的子类，重写基类的hello()方法，在重写的方法中调用基类的hello方法，要求使用es6新语法

#### 写一个vue组件，它使用vuex存储数据，从服务器获取数组数据后，存入vuex并更新组件的显示

#### webpack有哪些常用的配置项？

#### 已知我们用链表表示两个数字，如234表示链表2->3->4->null，589表示为链表5->8->9->null，试编写程序计算两个整数的和，结果仍以链表表示(注意进位)，以及如何实现乘法计算

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