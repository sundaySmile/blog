
```
const reducer1 = function (state={}, action) {
  ...
}
const store1 = createStore(reducer1)

const reducer2 = combineReducer({
  add(state = 0, action) {
    ...
  },
  delete(state = 0, action) {
    ...
  }
})
const store2 = createStore(reducer2)
```

#### state初始化的地方：  

createStore函数内
```
export default function createStore(reducer, preloadedState, enhancer) {
  // ...
  currentState = preloadedState
  
  // ...
}

```

#### store1中的state由于dispatch引起的改动    
  > 每次dispatch时，它都会做两项工作
   1、执行reducer - currentReducer(currentState, action)，改变state的值  
   2、遍历subscribe(listener)监听的事件组(nextListeners)  

第一次：createStore中的 dispatch({ type: ActionTypes.INIT })。开始初始化reducer，此时，getState()返回的值是 `{}`.
  ```  
  try {
    isDispatching = true
    currentState = currentReducer(currentState, action)
  } finally {
    isDispatching = false
  }

  const listeners = (currentListeners = nextListeners)
  for (let i = 0; i < listeners.length; i++) {
    const listener = listeners[i]
    listener()
  }
  ```
第 2[n] 次： dispatch（{ type: 某一个具体action }）

#### store2中的state由于dispatch引起的改动    
第一次： combineReducer 函数中的 assertReducerShape(reducers)中的 dispatch({ type: ActionTypes.INIT })。
这一步主要确定每一个reducer中的 参数state有默认值。
```
// combineReducer 做了两件事
// 1、将其值不同的reducers函数对象转换为单个reducer函数
// 2、返回state（{ add: [any], delete: [any] }）
const reducerKeys = Object.keys(reducers)
const finalReducers = {}
for (let i = 0; i < reducerKeys.length; i++) {
  const key = reducerKeys[i]

  if (process.env.NODE_ENV !== 'production') {
    if (typeof reducers[key] === 'undefined') {
      warning(`No reducer provided for key "${key}"`)
    }
  }

  if (typeof reducers[key] === 'function') {
    finalReducers[key] = reducers[key]
  }
}
const finalReducerKeys = Object.keys(finalReducers)

...

let hasChanged = false
const nextState = {}
for (let i = 0; i < finalReducerKeys.length; i++) {
  const key = finalReducerKeys[i]
  const reducer = finalReducers[key]
  const previousStateForKey = state[key]
  
  // 重点
  const nextStateForKey = reducer(previousStateForKey, action)
  
  if (typeof nextStateForKey === 'undefined') {
    const errorMessage = getUndefinedStateErrorMessage(key, action)
    throw new Error(errorMessage)
  }
  nextState[key] = nextStateForKey
  hasChanged = hasChanged || nextStateForKey !== previousStateForKey
}
return hasChanged ? nextState : state
```
第二次：combineReducer 函数中的 assertReducerShape(reducers)中的 dispatch({ type: ActionTypes.PROBE_UNKNOWN_ACTION() })。
这一步主要确定用随机的action探测时reducer有默认返回state。   
第三次：createStore中的 dispatch({ type: ActionTypes.INIT })   
第 4[n] 次： dispatch（{ type: 某一个具体action }）。通过一次一次的dispatch（）改变对应的state。
