回流(reflows)与重绘(repaints)  

导致回流的css特性
  * 调整窗口大小
  * 改变字体
  * 增加或者移除样式表
  * 内容变化，比如用户在input框中输入文字
  * 激活 CSS 伪类
  * 操作 class 属性
  * 脚本操作 DOM
  * 计算 offsetWidth 和 offsetHeight 属性
  * 设置 style 属性的值 
  
如何避免回流或将它们对性能的影响降低到最低  
  + 如果想设定元素的样式，通过改变元素的 class 名 (尽可能在 DOM 树的最末端)
  （Change classes on the element you wish to style (as low in the dom tree as possible)）  
  + 避免设置多项内联样式（Avoid setting multiple inline styles）
  + 将动画应用于 position 属性的 fixed 值或 absolute 值元素使用
  （Apply animations to elements that are position fixed or absolute）
  + 权衡平滑和速度（Trade smoothness for speed）
  + 避免使用table布局（Avoid tables for layout）
  + 避免使用CSS的JavaScript表达式 (仅 IE 浏览器)（Avoid JavaScript expressions in the CSS (IE only)）
  
、、
