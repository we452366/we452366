// 构建链表数据结构对象
function ListNode (val) {
    this.val = val
    this.next = null
  }
// 计算两个链表之和的方法
function addTwoNumbers(l1, l2) {
    let x1 = 0
    let x2 = 0
    x1 = (x2 + l1.val + l2.val) % 10
    x2 = Math.floor((x2 + l1.val + l2.val) / 10)
    let l3 = new ListNode(x1)
    l1 = l1.next
    l2 = l2.next
    while (l1 || l2) {
      if (!l1) {
        l1 = new ListNode(0)
      }
      if (!l2) {
        l2 = new ListNode(0)
      }
      x1 = (x2 + l1.val + l2.val) % 10
      x2 = Math.floor((x2 + l1.val + l2.val) / 10)
      let l4 = new ListNode(x1)
      let l5 = l3
      while (l5.next) {
        l5 = l5.next
      }
      l5.next = l4
      l1 = l1.next
      l2 = l2.next
    }
    if (!l1 && !l2) {
      if (x2 !== 0) {
        let l6 = new ListNode(x2)
        let l7 = l3
        while (l7.next) {
          l7 = l7.next
        }
        l7.next = l6
      }
    }
    return l3
  }
// 测试函数
(function test() {
// 构建第一个节点
let l1 = new ListNode(2)
let l1x = new ListNode(4)
let l1y = new ListNode(3)
l1.next = l1x
l1x.next = l1y
console.log(l1.next.next.val)
// 构建第二个节点
let l2 = new ListNode(5)
let l2x = new ListNode(6)
let l2y = new ListNode(4)
l2.next = l2x
l2x.next = l2y
console.log(l2.next.next.val)
addTwoNumbers(l1, l2)
})()

