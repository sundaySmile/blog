
### ES modules 解决的问题  

- 一个变量可以用在多个函数 (function)内.而且不会引起全局变量问题。
```
// add.js
import NUMBER_A from 'number.js';

function add(a, b) {
  return a + b;
}
 
// number.js
export static NUMBER_A = 10;

```

### ES modules 如何执行  

当你用模块开发是，将建立一张依赖关系图。不同依赖模块之间的关系来自于你引入的模块声明。  
![avatar](./assets/2018-4-11/how-es-modules-work.jpg)

但是，这些文件浏览器并不可以使用，它需要把这些文件转化为一种数据结构 - Module Records.  
![avatar](./assets/2018-4-11/what-is-module-record.jpg)

之后，把 `module record` 转化为 `module instance`。  一个模块实例包含两样东西： 代码(code - 指令列表)和状态(state- 所有的变量值).  
什么是state?  
state是任何时间点变量的真实值，这些变量是内存中拥有值的盒子的昵称。  
![avatar](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2018/03/06_module_instance.png)


我们需要的是每个模块的模块实例。模块加载过程将从此入口点文件转到具有模块实例的完整图形，这个过程发生以下三步：  
![avatar](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2018/03/07_3_phases.png)

  1、 分解 - 查找、下载和解析所有的文件为 module record
  2、 实例化 - 在内存中找一些盒子用来装载 exported values，然后使导出和导入都指向内存中的那些盒子，这个行为被称为 linking
  3、 评估 - 运行code，用真实的values填充这些盒子  
  
##### 分解有以下三个过程：  
  1. 弄清楚从哪里下载包含模块的文件  
  2. 获取文件（从URL中下载或者从文件系统中下载）  
  3. 解析文件为 module record  
  
文件的入口 `<script>`，下一个文件的线索 `import`。使用动态 `import` 可以这样使用import声明 `import(`${path/foo.js}`)`。  
把文件解析为 module record 有利于浏览器理解模块之间的不同。之后，它将被放入module map，这样使用的时候可以直接从map中提取。

解析文件的过程有一个module map的概念。如图：
![avatar](https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2018/03/25_module_map.png)

##### 实例化

一个实例有code和state组成，而state在内存中，所以实例的步骤就是向内存中写东西。  
ES modules 使用 直播绑定的方式。export 和import指向内存中同一个位置，这样一旦export中的值发生改变，import中相应的值也发生变化。  
![avatar](https://hacks.mozilla.org/files/2018/03/30_live_bindings_04-500x206.png)


##### 评估

最后一步用真实的值填充内存盒子。





资料来源地址： https://hacks.mozilla.org/2018/03/es-modules-a-cartoon-deep-dive/
