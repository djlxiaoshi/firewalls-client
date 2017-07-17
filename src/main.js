import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-default/index.css';    // 默认主题
import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import VueResource from 'vue-resource'

Vue.use(ElementUI);
Vue.use(VueResource);

Vue.http.options.credentials = true  // 设置cookie
Vue.http.options.root = 'http://127.0.0.1:3000'
new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
