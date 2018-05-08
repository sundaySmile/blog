----
* --- 2018/05/08
* --- git: https://github.com/reactjs/redux/
----

#### redux库读取文件顺序  

1、 src/index.js, 根据文件中函数查找其源头
```
import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'
```
2、 src/createStore.js, src/index.js 首位import文件  
3、 src/combineReducers  
4、 src/bindActionCreators.js  
5、 src/applyMiddleware  

#### src/index.js  
> 向用户抛出可用接口  

```
export {
  createStore,  // 创建一个store对象
  combineReducers,  // 把多个reduce合并为一个
  bindActionCreators,  // 将dispatch 和action结合
  applyMiddleware,  // applyMiddleware 把所有的中间件作为参数，然后返回一个函数，被Redux的createStore调用
  compose,
  __DO_NOT_USE__ActionTypes
}
```

#### src/createStore.js  
> 
```
/**
 * 创建一个保存状态树的Redux存储（store）
 * 唯一改变数据的方法是调用`dispatch()`
 *
 * 在你的应用中应该仅有一个 `store`. 要指定状态树的不同部分如何响应操作
 * 你应该使用 `combineReducers` 把几个reducers 合并为一个reducer 函数
 *
 * @param {Function} reducer 一个函数。利用已经给予的当前 `state tree` 和 `action` 去处理事务，
 * 返回下一个状态树。
 *
 * @param {any} [preloadedState] 初始状态， 对象字面量或者高阶函数。 您可以选择将其指定为通用应用程序中的服务器状态
 * 或者恢复先前序列化的用户会话。
 * 假如你使用 `combineReducers` 去产生这个根 `reducer` 函数，那么，
 * 它一定是一个与`combineReducers`键相同形状的对象。
 *
 * @param {Function} [enhancer] `store`的增强剂, 高阶函数. 您可以选择指定它使 `store` 具有第三方功能，如中间件
 * 这个和Redux一起提供的 store 增强剂是 `applyMiddleware()`。
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */
export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState
    preloadedState = undefined
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.')
    }

    return enhancer(createStore)(reducer, preloadedState)
  }
   if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.')
  }

  let currentReducer = reducer  // reducer 是必须的。
  let currentState = preloadedState  // preloadedState 是一组对象字面量{}或 undefined
  let currentListeners = []
  let nextListeners = currentListeners
  let isDispatching = false
  
  // 确保可以改动 `nextListeners`, `nextListeners` 是对 `currentListeners` 的复制
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice()
    }
  }
  
   /**
   * 读取 `store` 管理的状态树。在dispatch过程中不可以读取，否则抛出异常
   *
   * @returns {any} 您的应用程序的当前状态树.
   */
  function getState() {
    if (isDispatching) {
      throw new Error(
        'You may not call store.getState() while the reducer is executing. ' +
          'The reducer has already received the state as an argument. ' +
          'Pass it down from the top reducer instead of reading it from the store.'
      )
    }

    return currentState
  }
  
    /**
   * 添加一个变化监听器。当一个 action 被 dispatch时，它将在任何时候被调起，
   * 并且状态树的一些部分可能暗地里已经被改变。然后你可以调用`getState（）`来读取回调中的当前状态树.
   * 函数subscribe 以及其返回的函数都是对 `nextListeners` 长度的改变。
   * 函数 subscribe 是一个高阶函数，其返回值是一项函数
   *
   * 您可以从变化侦听器调用dispatch(), 遵守的注意事项
   *
   * 1. 订阅在每次`dispatch（）`调用之前被快照
   * 假如在侦听器正在被调用过程中你订阅或者取消订阅，并不影响目前正在进行中的 `dispatch()`.
   * 然而，下一个 `dispatch` 被调用，无论是否嵌套，将要使用订阅列表中更最近的快照
   *
   * 2. 侦听器不应该期望看到所有的状态变化，因为状态树可能已经更新了多次在一个嵌套的 `dispatch()`被侦听器调用前。
   * 然而，它是保证`dispatch（）`开始之前注册的所有用户在退出时都会被调用最新状态
   * 
   * @param {Function} listener 每一个 `dispatch` 都会被调用的回调函数.
   * @returns {Function} A function to remove this change listener.(unsubscribe)
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.')
    }

    if (isDispatching) {
      throw new Error(
        'You may not call store.subscribe() while the reducer is executing. ' +
          'If you would like to be notified after the store has been updated, subscribe from a ' +
          'component and invoke store.getState() in the callback to access the latest state. ' +
          'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
      )
    }

    let isSubscribed = true

    ensureCanMutateNextListeners()
    nextListeners.push(listener)

    return function unsubscribe() {
      if (!isSubscribed) {
        return
      }

      if (isDispatching) {
        throw new Error(
          'You may not unsubscribe from a store listener while the reducer is executing. ' +
            'See https://redux.js.org/api-reference/store#subscribe(listener) for more details.'
        )
      }

      isSubscribed = false

      ensureCanMutateNextListeners()
      const index = nextListeners.indexOf(listener)
      nextListeners.splice(index, 1)
    }
  }
  
 /**
   * 派遣一个行为。它是唯一触发状态树改变的方法。
   *
   * 这个 `reducer` 函数，用于创建 store， 调用的时候带有参数当前状态树state和给予的 action
   * 它的返回值被认为是下一个状态树，且变化侦听器将要被通知
   * 
   * 它只支持简单的对象操作。假如你想要派遣一个 Promise，一个可观察的对象或者其他，你需要
   * 把store的创建函数包裹在相应的中间件中。比如，可以查看 `redux-thunk` 说明文档
   *
   * @param {Object} action A plain object representing “what changed”. 
   * 它是一个保持行为序列化的好主意，你可以重录和重播用户回话，或者使用redux的状态监控工具 `redux-devtools`.
   * An action must have a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   * 
   * 
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
          'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
      )
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    const listeners = (currentListeners = nextListeners)
    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i]
      listener()  // nextListeners 数组中每一个侦听器（函数）都执行一遍
    }

    return action
  }
  
  /**
   * 替换store当前使用的 reducer 来计算状态。
   *
   * 你可能在以下几种情况需要：
   * 1、 动态加载 reducers
   * 2、 Redux 的热加载机制
   * 3、 应用程序实现代码分割
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.')
    }

    currentReducer = nextReducer
    dispatch({ type: ActionTypes.REPLACE })
  }
 /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    const outerSubscribe = subscribe
    return {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.')
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState())
          }
        }

        observeState()
        const unsubscribe = outerSubscribe(observeState)
        return { unsubscribe }
      },

      [$$observable]() {
        return this
      }
    }
  }
  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT })

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  }
}

```


#### src/combineReducer.js  
> 把多个reducer 合并为一个。但是，使用它在createStore（）初始化前，会执行 function assertReducerShape(reducers)，
> 从而使 action{ type: ActionTypes.INIT } and { ActionTypes.PROBE_UNKNOWN_ACTION } 在每个reducer中执行一次

```
/**
 * 它将调用每个子reducer，并将其结果收集到单个状态对象中{}，该对象的键与传递的reducer函数的键相对应.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
export default function combineReducers(reducers) {
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
      // 把reducers中的值以key为键对应到 finalReducers 对象中
      finalReducers[key] = reducers[key]
    }
  }
  const finalReducerKeys = Object.keys(finalReducers)

  let unexpectedKeyCache
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {}
  }

  let shapeAssertionError
  try {
    assertReducerShape(finalReducers)
  } catch (e) {
    shapeAssertionError = e
  }

  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      throw shapeAssertionError
    }

    if (process.env.NODE_ENV !== 'production') {
      const warningMessage = getUnexpectedStateShapeWarningMessage(
        state,
        finalReducers,
        action,
        unexpectedKeyCache
      )
      if (warningMessage) {
        warning(warningMessage)
      }
    }

    let hasChanged = false
    const nextState = {}
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i]
      const reducer = finalReducers[key]
      const previousStateForKey = state[key]
      const nextStateForKey = reducer(previousStateForKey, action)
      if (typeof nextStateForKey === 'undefined') {
        const errorMessage = getUndefinedStateErrorMessage(key, action)
        throw new Error(errorMessage)
      }
      nextState[key] = nextStateForKey
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey
    }
    return hasChanged ? nextState : state
  }
}
```

#### src/applyMiddleware.js  
> compose 

```
import compose from './compose'

/**
 * 创建一个`store`增强器，将中间件应用于`Redux store` 的 `dispatch` 方法。
 * 这适用于各种任务，如表达、以简洁的方式进行的异步操作，或者记录每个动作有效载荷
 * 
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * 因为中间件可能是异步的，所以这应该是组合链中的第一个 `store` 增强器
 *
 * 请注意，每个中间件将被赋予`dispatch`和`getState`作为命名参数
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
 
 /**
 * 手工 thunk middleware
 * @param {function} dispatch 
 * @param {function} getState
 */
// const thunkMiddleware = function ({ dispatch, getState }) {
// 	// console.log('Enter thunkMiddleware');
// 	return function(next) {
// 			// console.log('Function "next" provided:', next);
// 			return function (action) {
// 					// console.log('Handling action:', action);
// 					return typeof action === 'function' ?
// 							action(dispatch, getState) :
// 							next(action)
// 			}
// 	}
// }
export default function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
```
