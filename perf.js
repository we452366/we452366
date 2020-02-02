let Util={
    getPerfData:(p)=>{
        let data={
            prevPage:p.fetchStart-p.navigationStart, // 上一个页面的时间
            redirect:p.redirectEnd-p.redirectStart, // 重定向时间
            dns:p.domainLookupEnd-p.domainLookupStart, // DNS查找时间
            connect:p.connectEnd-p.connectStart, // TCP建连时间
            network:p.connectEnd-p.navigationStart, // 网络总耗时
            send:p.responseStart-p.requestStart, // 前端从发送到接收的时间
            // 网络接收
            receive:p.responseEnd-p.responseStart, // 接收数据用时
            request:p.responseEnd-p.requestStart, // 请求页面的总耗时
            // 前端渲染
            dom:p.domComplete-p.domLoading, // dom解析时间
            loadEvent:p.loadEventEnd-p.loadEventStart, // loadEvent时间
            frontend:p.loadEventEnd-p.domLoading, // 前端总时间
            // 关键阶段
            load:p.loadEventEnd-p.navigationStart, // 页面完全加载的时间
            domReady:p.domContentLoadedEventStart-p.navigationStart, // dom准备时间
            interactive:p.domInteractive-p.navigationStart, // 可操作时间
            ttfb:p.responseStart-p.navigationStart // 首字节时间
        }
    }
}