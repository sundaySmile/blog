### 白鹭引擎入门之egret

#### egret类之间的关系

在开始认识egret各种类之前或开始琢磨它们的API文档之时，建议首先清楚两个重要的类，egret.DisplayObject 、egret.DisplayObjectContainer。官网上对它们的解释如下
> DisplayObjectContainer 类是基本显示列表构造块：一个可包含子项的显示列表节点.
> DisplayObject 类是可放在显示列表中的所有对象的基类.
egret.Bitmap、egret.TextField、eui.Label等都继承于DisplayObject 类，DisplayObjectContainer实例通过addChild()或者addChildAt()，可以把它们的实例添加到场景中。  
另外，DisplayObjectContainer 类的子类（比如，egret.Sprite | eui.Component）或者它自己创建的实例也可以添加到DisplayObjectContainer实例中。  

换言之，整个项目是由一个DisplayObjectContainer实例来撑起，这个DisplayObjectContainer实例又有其他DisplayObjectContainer实例和DisplayObject实例来构成。  
这个DisplayObjectContainer实例名称默认为‘Main’，需要在‘template/web/index.html’文件中配置 - data-entry-class="Main"

[egret 示例](https://github.com/sundaySmile/hello-egret-2d.git)
---
#### egret相关的库

在[白鹭引擎开发者API文档](http://developer.egret.com/cn/apidoc/)中官方给出了11个库的阐述。 见名知其一，根据库的名字很容易猜到它们的影响方面。 
 Egret核心类 - Egret Core
 Egret 3D项目会用到的类 - Egret 3D
 Egret 游戏相关的类 - game
 Egret UI排版项目的类 - eui
 Egret webSocket - socket
 Egret 动画缓动类 - tween
 Egret 资源加载类 - res
 Egret 龙骨动画库 - dragonBones

#### egret可用的命令
> 创建新项目 egret create project_name [--type empty|game|gui|eui]
> 构建指定项目  egret build [project_name] [-e] [--runtime native]
> 启动HttpServer,并在默认浏览器中打开指定项目  egret startserver [project_name] [--port 3000] [-ip] [-serveronly]
> 重置项目中的引擎代码 egret clean [project_name]
