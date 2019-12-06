## React全家桶
> redux只有一个仓库，仓库里只有一个状态，只能有一个reducer；很多组件都有自己的数据，如果所有状态放在一起就难以维护，因此我们使用combineReducer这个方法进行合并

### Redux源码
- effects.tsx
- index.tsx

### react-redux
- Provider是一个组件，通过context上下文向下层组件传递store
- connect连接组件和仓库