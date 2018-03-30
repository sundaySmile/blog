

DMZ(de-militarized zone) object
```
const φ = Object.create(null);

// φ 比 {}还要空，因为它没有委托于Object.prototype，所以没有__proto__属性
```
应用于apply
```
function foo(a, b) {
  return a + b;
}
// before
foo.apply(null, [2, 3]);
foo.bind(null, 2)(3);

//after
foo.apply(φ, [2, 3]);
foo.bind(φ, 2)(3);

```
优点
- 一种文体上的优势，清楚的传达出 “我想要当前`this`为空”，这点比`null`更好。
