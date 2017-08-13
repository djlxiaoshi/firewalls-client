# firewalls manage-system 

项目安装

```
git clone  https://github.com/djlxiaoshi/firewalls-client.git
cd firewalls-client
npm install
nom run dev
```

该管理平台前端基于Vue.js 2.x系列 + Element UI开发。
参考项目[线上地址]()

路由采用[Vue-router](https://router.vuejs.org/zh-cn/)

ajax请求: [Vue-resource](https://github.com/pagekit/vue-resource)

图表采用[Echarts](http://echarts.baidu.com/)

api变化：

建议把DHCP模块中fixed_ips字段的格式改为
```json
fixed_ips:[{
  mac:"",
  ip: "" 
},{
  mac:"",
  ip: "" 
}]
```

DNS 模块中将domain_maps的
```json
{"server.test.com": "192.168.90.1",
"client.com" :"192.168.90.2"
}

```

改为：
```json
[
{"domain": "server.test.com", ip: "192.168.90.1"},
{"domain": "client.com", "ip": "192.168.90.2"}
]

```

最后在**IP来源地统计**统计中，国家的代码标识可能要按照地图的配置来，基本就是按照src/assets/json/names.json中国家的字段名来配才行。

后端node.js模拟地址：[node.js后台模拟服务器](https://github.com/djlxiaoshi/firewalls-serve)
