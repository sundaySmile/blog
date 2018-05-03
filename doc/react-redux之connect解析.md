
> react-redux封装了四个react 组件 - connect, provider and connectAdvanced, 

connect的作用:  
```
/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:
    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.
  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.
  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */
```

connect的原理：  


connect适用的情况：
