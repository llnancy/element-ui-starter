import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import VueRouter from "vue-router";
import Selector from './Module/Select/Selector';
import Index from './Module/Index/Index';

Vue.use(ElementUI);
Vue.use(VueRouter);

// 定义路由
const routes = [
  { path: '/selector/:action',component: Selector},
  { path: '/index',component: Index},
  { path: '/',component: Index},
];
const router = new VueRouter({routes});
new Vue({
  el: '#app',
  router,
  render: h => h(App)
});
