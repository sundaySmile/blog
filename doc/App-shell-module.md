App Shell 架构是构建 Progressive Web App 的一种方式，这种应用能可靠且即时地加载到您的用户屏幕上，与本机应用相似。
所有UI 和基础架构都使用服务工作线程（`service workers`）本地缓存，因此，随后的加载将仅检索新数据或发生更改的数据，而不是必须加载所有数据。

/** 性能为王，代码至上 **/

App“shell”是支持用户界面所需的最小的 HTML、CSS 和 JavaScript，如果离线缓存，可确保在用户重复访问时提供即时、可靠的良好性能。

<b>App Shell 非常适合用于在没有网络的情况下将一些初始 HTML 快速加载到屏幕上</b>。这种方法依赖渐进式缓存 Shell（使用服务工作线程-service workers）让应用运行
它是UI的主干以及让应用成功起步的所需要的核心组件。
App Shell 架构具有相对不变的导航以及一直变化的内容，对应于和网站意义重大。

构建 Google I/O 2016 Progressive Web App
 https://developers.google.com/web/showcase/2016/iowa2016
 
 PWA 构建的示例
  - 离线维基百科 https://wiki-offline.jakearchibald.com/wiki/Rick_and_Morty

App Shell可以执行以下操作：
- 快速加载
- 尽可能使用较少的数据
- 使用本机缓存中的静态资产
- 将内容与导航分离开来
- 检索和显示特定页面的内容（HTML、JSON 等）
- 可选：缓存动态内容

缓存 App Shell  

1、 使用 sw-precache 缓存 App Shell
  https://codelabs.developers.google.com/codelabs/sw-precache/index.html?index=..%2F..%2Findex#3
2、 手动缓存 App shell
```
var cacheName = 'shell-content';
var filesToCache = [
  '/css/styles.css',
  '/js/scripts.js',
  '/images/logo.svg',

  '/offline.html’,

  '/’,
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});
```
