import Vue from 'vue'
import App from './App.vue'

//element: 1.导入组件
import ElementUI from "element-ui"

//element: 2引入element-ui样式
import 'element-ui/lib/theme-chalk/index.css';

//element: 3.注册组件
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
