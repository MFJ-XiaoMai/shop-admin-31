
//导入组件
import Vue from 'vue';
import ElementUI from "element-ui";
import axios from "axios";//把axios绑定到原型上
import VueRouter from "vue-router";//引入路由组件

//element: 2引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

//引入自己创建的组件
import App from './App.vue';
import Login from './pages/Login.vue';
import Admin from './pages/Admin.vue';
import GoodsList from "./pages/GoodsList.vue";
import CategoryList from "./pages/CategoryList.vue";

//因为Vue是一个构造函数，它有一个属性prototype(Vue.prototype原型对象)，只有把axios绑定到Vue的原型对象上，就不需要每个组件都去引用axios 了，方便我们调用axios
Vue.prototype.$axios = axios;

//element: 3.注册组件
Vue.use(ElementUI);
Vue.use(VueRouter);//注册路由

//4. 配置路由
const routes = [
  // {path:'/',component:Admin},
  {
    path: '/',
    redirect: 'admin/goods-list',
    meta: '首页'
  },
  {
    path: '/login',
    component: Login,
    meta: '登录'
  },
  {
    path: '/admin',
    component: Admin,
    meta: '后台管理',
    children: [
      {
        path: 'goods-list',
        component: GoodsList,
        meta: '商品列表'
      },
      {
        path: 'category-list',
        component: CategoryList,
        meta: '栏目列表'
      },
    ]
  }
]

//5. 创建路由实例
const router = new VueRouter({
  routes
})

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),

  //6.将路由实例挂载在根实例上
  router,
}).$mount('#app')// $mount绑定控制区域，相当于el
