"use strict";var precacheConfig=[["/perf-analyzer/index.html","b3185b163952c172677141082238ed8f"],["/perf-analyzer/static/css/main.db525228.css","185656ab4e798c2f02bb4ad0fa093d8e"],["/perf-analyzer/static/js/main.8937c3f8.js","d9c14c0ae6814036bd65ab8859d58fc1"],["/perf-analyzer/static/media/roboto-latin-100.987b8457.woff2","987b84570ea69ee660455b8d5e91f5f1"],["/perf-analyzer/static/media/roboto-latin-100.e9dbbe8a.woff","e9dbbe8a693dd275c16d32feb101f1c1"],["/perf-analyzer/static/media/roboto-latin-100italic.6232f43d.woff2","6232f43d15b0e7a0bf0fe82e295bdd06"],["/perf-analyzer/static/media/roboto-latin-100italic.d704bb3d.woff","d704bb3d579b7d5e40880c75705c8a71"],["/perf-analyzer/static/media/roboto-latin-300.55536c8e.woff2","55536c8e9e9a532651e3cf374f290ea3"],["/perf-analyzer/static/media/roboto-latin-300.a1471d1d.woff","a1471d1d6431c893582a5f6a250db3f9"],["/perf-analyzer/static/media/roboto-latin-300italic.210a7c78.woff","210a7c781f5a354a0e4985656ab456d9"],["/perf-analyzer/static/media/roboto-latin-300italic.d69924b9.woff2","d69924b98acd849cdeba9fbff3f88ea6"],["/perf-analyzer/static/media/roboto-latin-400.5d4aeb4e.woff2","5d4aeb4e5f5ef754e307d7ffaef688bd"],["/perf-analyzer/static/media/roboto-latin-400.bafb105b.woff","bafb105baeb22d965c70fe52ba6b49d9"],["/perf-analyzer/static/media/roboto-latin-400italic.9680d5a0.woff","9680d5a0c32d2fd084e07bbc4c8b2923"],["/perf-analyzer/static/media/roboto-latin-400italic.d8bcbe72.woff2","d8bcbe724fd6f4ba44d0ee6a2675890f"],["/perf-analyzer/static/media/roboto-latin-500.28546717.woff2","285467176f7fe6bb6a9c6873b3dad2cc"],["/perf-analyzer/static/media/roboto-latin-500.de8b7431.woff","de8b7431b74642e830af4d4f4b513ec9"],["/perf-analyzer/static/media/roboto-latin-500italic.510dec37.woff2","510dec37fa69fba39593e01a469ee018"],["/perf-analyzer/static/media/roboto-latin-500italic.ffcc050b.woff","ffcc050b2d92d4b14a4fcb527ee0bcc8"],["/perf-analyzer/static/media/roboto-latin-700.037d8304.woff2","037d830416495def72b7881024c14b7b"],["/perf-analyzer/static/media/roboto-latin-700.cf6613d1.woff","cf6613d1adf490972c557a8e318e0868"],["/perf-analyzer/static/media/roboto-latin-700italic.010c1aee.woff2","010c1aeee3c6d1cbb1d5761d80353823"],["/perf-analyzer/static/media/roboto-latin-700italic.846d1890.woff","846d1890aee87fde5d8ced8eba360c3a"],["/perf-analyzer/static/media/roboto-latin-900.19b7a0ad.woff2","19b7a0adfdd4f808b53af7e2ce2ad4e5"],["/perf-analyzer/static/media/roboto-latin-900.8c2ade50.woff","8c2ade503b34e31430d6c98aa29a52a3"],["/perf-analyzer/static/media/roboto-latin-900italic.7b770d6c.woff2","7b770d6c53423deb1a8e49d3c9175184"],["/perf-analyzer/static/media/roboto-latin-900italic.bc833e72.woff","bc833e725c137257c2c42a789845d82f"],["/perf-analyzer/static/media/source-code-pro-latin-200.31a781a1.woff","31a781a10c86331fc096bff395582a3e"],["/perf-analyzer/static/media/source-code-pro-latin-200.578fc799.woff2","578fc7991dde372927d5f6834d82c4ce"],["/perf-analyzer/static/media/source-code-pro-latin-300.5fa725d3.woff2","5fa725d38e516c9c2a68748f1a0fa96f"],["/perf-analyzer/static/media/source-code-pro-latin-300.ecdf82e8.woff","ecdf82e86a007693b162d2806602ae7d"],["/perf-analyzer/static/media/source-code-pro-latin-400.b0751cb1.woff2","b0751cb1cf5e931820cb04ac03ea7bdd"],["/perf-analyzer/static/media/source-code-pro-latin-400.dd52f869.woff","dd52f869193c4b423e526462a215a448"],["/perf-analyzer/static/media/source-code-pro-latin-500.4ae9dd46.woff","4ae9dd464ce924874177155ca397dfd2"],["/perf-analyzer/static/media/source-code-pro-latin-500.bd6c5b7d.woff2","bd6c5b7d434a0753902e092de9de0c5b"],["/perf-analyzer/static/media/source-code-pro-latin-600.260529de.woff","260529deaab794d6071d2d3bfe1501af"],["/perf-analyzer/static/media/source-code-pro-latin-600.c2994448.woff2","c29944484210b2cbc174460bb8145d28"],["/perf-analyzer/static/media/source-code-pro-latin-700.18621e34.woff","18621e34f4709afdcc878956a7884493"],["/perf-analyzer/static/media/source-code-pro-latin-700.b2c91466.woff2","b2c91466a79faa3b3fc6d002b7c6451e"],["/perf-analyzer/static/media/source-code-pro-latin-900.8e75c2a6.woff","8e75c2a6838a899947c394629cf380d7"],["/perf-analyzer/static/media/source-code-pro-latin-900.96f163ba.woff2","96f163ba7cee9431909861772a4215db"]],cacheName="sw-precache-v3-sw-precache-webpack-plugin-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(a){return a.redirected?("body"in a?Promise.resolve(a.body):a.blob()).then(function(e){return new Response(e,{headers:a.headers,status:a.status,statusText:a.statusText})}):Promise.resolve(a)},createCacheKey=function(e,a,t,r){var c=new URL(e);return r&&c.pathname.match(r)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,t){var a=new URL(e);return a.hash="",a.search=a.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(a){return t.every(function(e){return!e.test(a[0])})}).map(function(e){return e.join("=")}).join("&"),a.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],r=new URL(a,self.location),c=createCacheKey(r,hashParamName,t,/\.\w{8}\./);return[r.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(r){return setOfCachedUrls(r).then(function(t){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(a){if(!t.has(a)){var e=new Request(a,{credentials:"same-origin"});return fetch(e).then(function(e){if(!e.ok)throw new Error("Request for "+a+" returned a response with status "+e.status);return cleanResponse(e).then(function(e){return r.put(a,e)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var t=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(a){return a.keys().then(function(e){return Promise.all(e.map(function(e){if(!t.has(e.url))return a.delete(e)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(a){if("GET"===a.request.method){var e,t=stripIgnoredUrlParameters(a.request.url,ignoreUrlParametersMatching),r="index.html";(e=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,r),e=urlsToCacheKeys.has(t));var c="/perf-analyzer/index.html";!e&&"navigate"===a.request.mode&&isPathWhitelisted(["^(?!\\/__).*"],a.request.url)&&(t=new URL(c,self.location).toString(),e=urlsToCacheKeys.has(t)),e&&a.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(e){return console.warn('Couldn\'t serve response for "%s" from cache: %O',a.request.url,e),fetch(a.request)}))}});