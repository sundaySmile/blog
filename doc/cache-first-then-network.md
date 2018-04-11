> 
- udacity 课程
https://www.udacity.com/course/offline-web-applications--ud899

- 作者 Jake 文章
https://jakearchibald.com/2014/offline-cookbook/#cache-network-race


### 什么时候存贮资源

#### On install - as a dependency

储存 静态资源，比如，CSS、images、fonts、template 等
![avatar](/assets/2018-4-9/service-worker-install.jpg)  
`event.waitUntill`告诉浏览器在promise没有返回前它要在浏览器中一直进行。    
`caches` 缓存框包含来自任何安全来源的请求响应对。      
  - cache.put() 添加缓存条且传入请求URL以及响应。
  - cahce.addAll([]) 获取它们 并将请求响应放在缓存中。
  - cache.match(URL) 从缓存中获取内容，如果找到了，则返回匹配项的Promise.
  - cache.delete  

```
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mysite-static-v3').then(function(cache) {
      return cache.addAll([
        '/css/whatever-v3.css',
        '/css/imgs/sprites-v6.png',
        '/css/fonts/whatever-v8.woff',
        '/js/all-min-v4.js'
        // etc
      ]);
    })
  );
});
```

#### On install - not as a dependency

储存 一些不需要马上用到的比较重量的资源。与上一次不同的是，假如缓存失败不会引起 `install` 失败  

![avatar](/assets/2018-4-9/service-worker-install-dependency.jpg)
```
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('mygame-core-v1').then(function(cache) {
      cache.addAll(
        // levels 11-20
      );
      return cache.addAll(
        // core assets & levels 1-10
      );
    })
  );
});
```

#### On activate  

清理、移除没有用的缓存。  
```
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});
```

#### On user interaction 

![avatar](/assets/2018-4-9/user-interaction-cache.jpg)

```
document.querySelector('.cache-article').addEventListener('click', function(event) {
  event.preventDefault();

  var id = this.dataset.articleId;
  caches.open('mysite-article-' + id).then(function(cache) {
    fetch('/get-article-urls?id=' + id).then(function(response) {
      // /get-article-urls returns a JSON-encoded array of
      // resource URLs that a given article depends on
      return response.json();
    }).then(function(urls) {
      cache.addAll(urls);
    });
  });
});
```

#### On newwork response 

场景：经常更新的资源，比如文章内容、用户头像  
![avatar](/assets/2018-4-9/network-response-cache.jpg)

`event.respondWith` 告诉浏览器我们将自己处理改请求，响应事件将具有通过响应进行解析的响应对象或Promise。  
fetch 称为劫持请求。
```
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.open('mysite-dynamic').then(function(cache) {
      return cache.match(event.request).then(function (response) {
        return response || fetch(event.request).then(function(response) {
          cache.put(event.request, response.clone());
          return response;
        });
      });
    })
  );
});
```

#### On push message

// 稍后

![avatar](/assets/2018-4-9/push-message-cache.jpg)


#### On background-sync

Note：在chrome稳定版本中背景同步还没有落实  


### cache 机制

```
// From a page:
navigator.storage.requestPersistent().then(function(granted) {
  if (granted) {
    // Hurrah, your data is here to stay!
  }
});
```


### 发出请求 - 回应请求

- cache only  
![avatar](/assets/2018-4-9/cache-only.jpg)

场景：任何你认为对网站来说是静态的，并且已经在 `install` 缓存  

```
self.addEventListener('fetch', function(event) {
  // If a match isn't found in the cache, the response
  // will look like a connection error
  event.respondWith(caches.match(event.request));
});
```

- network only

```
self.addEventListener('fetch', function(event) {
  event.respondWith(fetch(event.request));
  // or simply don't call event.respondWith, which
  // will result in default browser behaviour
});
```

### Service Worker 概念介绍

一些概念前文已经有所涉及，比如

`event.waitUntill`告诉浏览器在promise没有返回前它要在浏览器中一直进行。

`caches` 缓存框包含来自任何安全来源的请求响应对。    
  - cache.put() 添加缓存条且传入请求URL以及响应。
  - cahce.addAll([]) 获取它们 并将请求响应放在缓存中.
  - cache.match(URL) 从缓存中获取内容，如果找到了，则返回匹配项的Promise.
  - cache.delete.
  - cache.open()
 
 ServiceWorkerGlobalScope self 注册监听的事件(sw.js)   
 - install
 - activate
 - fetch
 - message
 ```
 self.addEventListener('fetch', function() {
    // do something
 })
 ```
 ServiceWorkerGlobalScope self 方法(sw.js)  
 - skipWaiting
 - fetch
 
 ```
 self.skipWaiting()
 ```
 
  ServiceWorkerGlobalScope self 属性(sw.js)  
 - clients
 - registration
 - caches
 
 ```
 self.skipWaiting()
 ```
  navigator.serviceWorker（ServiceWorkerContainer） 注册监听的事件  
 - controllerchange 
 > 当 ServiceWokerRegister获取新的活动 worker时触发
 ```
 navigator.serviceWorker.addEventListener('controllerchange', function() {
  // do something
 })
 ```
 
 navigator.serviceWorker 的方法  
 - register // 注册sw.js 文件
 - 
 
 ```
 navigator.serviceWorker.register('/sw.js')
  .then(ServiceWorkerRegistration => {
    // do something
  })
 ```
  
 navigator.serviceWorker 的属性  
 - controller // 
 - 
 ```
 if (navigator.serviceWorker.controller) {
  // do something
 }
 ```
 ServiceWorkerRegistration 注册监听的事件   
 - updatefound 
 > 触发时机： 1、当 `statechange`被触发时； 2、 ServiceWorkerRegistration.installing属性获取新的service worker任何时候都会触发它
 ```
 ServiceWorkerRegistration.addEventListener('updatefound', function() {
  // do something
 })
 ```

 ServiceWorkerRegistration 的属性  
 - scope 
 - waiting
 - installing
 - installed
 - active
 
 ServiceWorkerRegistration 的方法  
 - update
  > 更新 service worker
 - unregister
 > 取消service worker注册
 - showNotification
 
<b>ServiceWorkerRegistration.waiting、ServiceWorkerRegistration.installing等业务下文统称为 `worker`.</b>  
worker（ServiceWorker） 的方法
- postMessage(values)
```
worker.postMessage({ action: 'skipWaiting' })
```
worke 的注册监听事件  
 - statechange
 > ServiceWorker.state改变时触发
 ```
 worker.addEventListener('statechange', function() {
    // do something
 })
 ```
worker.state 的值  
 - installing
 - installed
 - activating
 - activated
 - redundant
 
### IndexedDB and Caching

