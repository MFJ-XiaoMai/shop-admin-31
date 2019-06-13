//导入vue
import Vuex from 'vuex'
import Vue from 'vue'

//注册插件
Vue.use(Vuex)

//调用vuex创建一个仓库
const store = new Vuex.Store({
  //数据位置
  state:{
    //读取本地的数据，若没有数据，则设为空
    user: JSON.parse(localStorage.getItem("user")) || {}
  },
  // 设置仓库数据的方法
  mutations:{
    //设置用户数据
    //state是默认参数，所有mutations下的方法的一个参数都是state
    //state指向上面的仓库数据
    setUser(state, data) {
      state.user = data;
      
      //将数据保存到本地
      localStorage.setItem("user", JSON.stringify(data));
    },

  }

})

//向外暴露
export default store