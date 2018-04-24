

#### diff 执行规则

1、一级一级地排查DOM

在任意两个数上找到最小的修改次数是一个 O(n^3) 的复杂度问题。
但是，React使用了简单而强大的启发式方法在复杂度为 O(n)算法中找到了一个非常棒的近似值。那就是，同级DOM做对比，一级一级地排查更新DOM。
示意图：
![avatar](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/1.png)

2、列表处理

React把前列表的第一个组件与后列表的第一个组件关联起来，利用 `key` 绘制映射关系。

![avatar](https://calendar.perfplanet.com/wp-content/uploads/2013/12/vjeux/2.png)

3、 组件处理

React只对有相同类型的组件做匹配，假如这两个组件不同，是不会做diff处理的

#### 事件委托

React更进一步，重新实现符合W3C标准的事件系统。每一个React 组件有唯一的 `id` 来编码层次结构，通过字符串操作来获取所有的父类  `id`。
然后，通过将事件侦听器存储在哈希映射表中，我们发现它比附加到虚拟DOM更好
