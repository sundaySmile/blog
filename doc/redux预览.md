注：redux与vuex类似，是工程内部状态管理工具, 可预测的JavaScript应用程序的状态容器x².

### redux原则

 - State是只读的
 - 单一数据源
 - 使用纯函数来执行修改
 

Action State Reducer Store

Action
- 只描述有事件发生
- 是一个纯函数
- type是必须的
- payload、meta、error 是可选的
- `flux-standard-action` 输出一些列实用函数，可用来帮助判断action是否符合 FSA（Flux Standard Action）标准。
比如， `import { isFSA } from 'flux-standard-action'`

```
{
  type: 'ADD_TODO'
  ...
}
```

Reducer
- 指定了应用状态的变化如何响应 `actions` 并发送到 `store`
- 是一个纯函数，接收旧的 `state` 和 `action` ，返回新的 `state`
- 只执行计算

Reducer 如何处理data 的改变 
  - 一个 reducer是一个对 actions 的订阅者
  - 
   

```

```

Store
- 维护应用中的State
- 提供 `getState（）` 获取state
- 提供 `dispach（action）` 触发某个 action
- 通过 `subscribe（listener）` 注册监听
- 通过 `subscribe（listener）` 返回一个函数用来注销监听器

```
import { createStore } from 'redux'
import todoApp from './reducers'

let store = createStore(todoApp)
```

容器组件和展示组件相分离  

展示组件：
- 只关注事物的外观
- 通常有它们自己的一些DOM标签和style
- 对应用程序的其余部分没有依赖，例如stores
- 不阐述data是如何计算或下载的
- 仅仅通过 props 接收data 和 callback1s
- 作为功能组件编写
- 例子有：Page， Sidebar， List， UserInfo

容器组件：  
- 只关注事物如何工作
- 通常没有自己的DOM 标签和styles
- 向展示组件和其他容器组件提供data 和 行为
- 通常是使用高阶函数产生，例如，React Redux 的connect、 Relay的 createContainer（）。而不是通过手写
- 例子有：UserPage， FollowersSidebar


