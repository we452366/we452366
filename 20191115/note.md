## React全家桶

### 路由原理

#### HashRouter
> 利用hash实现路由切换

#### BrowserRouter
> 利用html5的api实现路由切换

##### history
> html5引入了history.pushState()和history.replaceState()

##### pushState
仿照onpopstate实现onpushstate
```
    window.onpushstate = (event) => {
      console.log(event);
    };
    (function (history) {
      var pushState = history.pushState;
      history.pushState = function (state, title, pathname) {
        if (typeof window.onpushstate == "function") {
          window.onpushstate({ state, pathname, type: 'pushstate' });
        }
        return pushState.apply(history, arguments);
      };
    })(window.history);
```

### 路由源码
- Route.tsx
- HashRouter.tsx
- context.tsx
- types.tsx
- index.tsx
- history
  - index.tsx
  - types.tsx
