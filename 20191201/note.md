## React全家桶

### roadhog(阿里)
> roadhog是基于webpack的封装工具，目的是简化webpack的配置。提供了server、build和test三个命令，分别用于本地调试和构建；提供了易用的mock功能；提供JSON格式的配置方式

#### roadhog简单实现

### umi(阿里)
> UmiJS是一个类Next.js的react开发框架。它基于一个约定，即pages目录下的文件路由，而文件则导出react组件。

#### 目录
- dist 默认的build输出目录
- mock mock文件所在目录，基于express
- config umi配置，同.umirc.js二选一
    - config.js 
- src 源码目录
    - layouts/index.js 全局布局
    - pages 页面目录，里面的文件即路由
        - .umi/ dev临时目录，需添加到.gitignore
        - .umi-production/ build临时目录，会自动删除
        - document.ejs HTML模板
        - 404.js 404页面
        - page1.js 页面1，任意命名，导出react组件
        - page1.test.js 用例文件，umi test会匹配所有.test.js和.e2e.js结尾的文件
        - page2.js 页面2，任意命名
    - global.css 约定的全局样式文件，自动引入，也可以用global.less
    - global.js 可以加入polyfill
- .umirc.js umi配置，同config/config.js二选一
- .env 环境变量
- package.json

#### 全局layout
> src/layouts/index.js为全局路由，返回一个React组件，通过props.children渲染子组件。
umi的功能：
1. 要根据pages生成路由配置
2. 生成完整的React项目进行运行
3. 

#### 路由
- 嵌套路由：umi里约定目录下有_layout.js时会生成嵌套路由
- 动态路由：umi里约定带有$前缀的目录或文件为动态路由
- 权限路由：umi的权限路由是通过配置路由的Routes属性来实现的。约定式通过yaml注释添加，配置式直接配上即可

### ant-design(阿里)
> antd是基于Ant Design设计体系的React UI组件库，主要用于研发企业级中后台产品
