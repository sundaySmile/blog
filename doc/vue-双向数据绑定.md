 <p style="display: none">https://mp.weixin.qq.com/s?__biz=MzI3NTM1MjExMg==&mid=2247483789&idx=1&sn=e7297ec3443007015117637709f27521&mpshare=1&scene=23&srcid=0328EjthuLDIP7TzNSqJB0kJ#rd </p>


###### 双向数据绑定关系的识别过程
通过在HTML元素中添加指令（v-model）的方式，将视图元素和数据的绑定关系进行声明

```
<input v-model="passward" />
```  
以上的代码表示将input元素与name数据进行绑定。  

通过分析源码，在初始化过程中（new Vue() 执行时），主要执行两个步骤：
 + compile
 + link
 
compile 过程中，对于给定的目标元素进行解析，识别出所有绑定在元素（通过 el 属性传入）上的指令.  
link 过程中，建立这些指令与对应数据（通过 data 属性传入初始值）的绑定关系，并以数据的初始值进行渲染。绑定关系建立后，就可以双向同步数据了.  

##### vue 数据双向绑定原理
VueJS 采用数据劫持结合发布者-订阅者模式的方式， 通过 ES5 提供的 Object.defineProperty() 来劫持各个属性的`setter`、 `getter`，监控对数据的操作，从而可以自动触发数据同步。
并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，而不是对所有的数据都执行一次检测。  

整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点：  

 1、 实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者

2、 实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数

3、 实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图

4、mvvm入口函数，整合以上三者

代码解析 `defineReactive`, `Dep`, `Complile`
