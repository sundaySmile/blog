> 
- udacity 课程
https://www.udacity.com/course/offline-web-applications--ud899

- 作者 Jake 文章
https://jakearchibald.com/2014/offline-cookbook/#cache-network-race


### 什么时候存贮资源

#### On install - as a dependency

储存 静态资源，比如，CSS、images、fonts、template 等

此处为过程图。。。。
![avatar](/assets/2018-4-9/service-worker-install.jpg)
`event.waitUntill`告诉浏览器在promise没有返回前它要在浏览器中一直进行。

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


