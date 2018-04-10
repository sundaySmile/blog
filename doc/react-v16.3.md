

### context API
context(上下文)提供了一种通过组件树传递数据的方法，无需在每个级别手动传递 `props`。  

API

- React.createContext  
```
const {Provider, Consumer} = React.createContext(defaultValue);

// 当 React 渲染一个上下文 `Consumer` ，它将要在树中从离它最近的 `Provider` 读取当前上下文值。
// React 组件允许 `Consumers` 监听它的上下文变化
```

- Provier  
```
<Provider value={/* some value */}

// 假如value没有值，`value` 将要等同于 `defaultValue`
```

- Consumer
```
<Consumer>
  {value => /* render something based on the context value */}
</Consumer>
```


### createRef API和更语义化的ref API

- createRef
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
  }

  render() {
    return <input type="text" ref={this.inputRef} />;
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }
}
```


- forwardRef  

根据惯例，高阶函数向封装它的组件以 `props` 的方式传递数据。refs在这样的环境下不生效，解决方案是利用 `React.forwardRef`.  

```
function withTheme(Component) {
  function ThemedComponent({forwardedRef, ...rest}) {
    return (
      <ThemeContext.Consumer>
        {theme => (
          // Assign the custom prop "forwardedRef" as a ref
          <Component
            {...rest}
            ref={forwardedRef}
            theme={theme}
          />

        )}
      </ThemeContext.Consumer>
    );
  }

  // Note the second param "ref" provided by React.forwardRef.
  // We can pass it along to ThemedComponent as a regular prop, e.g. "forwardedRef"
  // And it can then be attached to the Component.
  return React.forwardRef((props, ref) => (
    <ThemedComponent {...props} forwardedRef={ref} />
  ));
}

// Here we assume that FancyButton has been imported into the current scope
const FancyThemedButton = withTheme(FancyButton);

// Create a ref using the new Referenace API, as above
const fancyButtonRef = React.createRef();

// fancyButtonRef will now point to FancyButton
<FancyThemedButton
  label="Click me!"
  onClick={handleClick}
  ref={fancyButtonRef}
/>;
```

### 组件生命周期的变化

不安全的生命周期方法， 将来被标上 `UNSAFE_` 的前缀。    
  - componentWillMount
  - componentWillReceiveProps
  - componentWillUpdate


新的生命周期方法
  - `getDerivedStateFromProps` ,  一个组件被实例化以及它接收到新的 `props` 时。  
  ```
  class Example extends React.Component {
    static getDerivedStateFromProps(nextProps, prevState) {
      // ...
    }
  }
  ```
  
  - `getSnapshotBeforeUpdate` ， 变动发生前调用。  
    ```
    class Example extends React.Component {
      getSnapshotBeforeUpdate(prevProps, prevState) {
        // ...
      }
    }
    ```
