
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
import GoodsAdd from "./pages/GoodsAdd.vue";
import GoodsEdit from './pages/GoodsEdit.vue'

//导入vuex的store
import store from './store/index.js'

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
        path:'goods-add',
        component:GoodsAdd,
        meta:'添加商品'
      },
      {
        path:'goods-edit/:id',
        component:GoodsEdit,
        meta:'编辑商品'
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

//路由卫士是路由对象的一个方法beforEach,它会监听每次页面的请求，并且可以通过三个参数来获取不同的信息
/**
 * to：表示去哪个页面
 * form: 表示页面的来源
 * next是一个函数，接受的参数url，并且可以跳转到该url，如果不传参数就跳到头的页面
 */
//next()方法是必须要调用的
router.beforeEach((to,form,next)=>{
  // console.log(to,form);
  // next()
  // 每次请求页面时，axios调用接口判断是否是登录状态
  axios({
    url:"http://localhost:8899/admin/account/islogin",
    method:'GET',
    // 处理session跨域
    withCredentials:true,
  }).then(res => {
    const {code} = res.data
    // console.log(code);//logined
    
    //处理登录页和非登录页的判断
    //如果访问的页面是登录页
    if(to.path==='/login'){
    //则判断是否是登录状态
    //若是登录状态
      if(code==="logined"){
        //则跳转到首页'/admin/goods-list'
        next('/admin/goods-list')
      }else{
        //若是未登录状态则继续显示登录页面
        next()
      }
    //否则访问的是未登录页
    }else{
      // 如果是登录状态
      if(code==='logined'){
        //则继续显示当前访问的页面
        next()
        
      //否则是未登路状态
      }else{
        //否则返回登录页面
        next('/login')
      }
    }
  })
})


Vue.config.productionTip = false;

new Vue({
  render: h => h(App),

  //6.将路由实例挂载在根实例上
  router,

  //仓库对象
  store,
}).$mount('#app')// $mount绑定控制区域，相当于el
