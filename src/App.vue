<template>
  <div id="app">
    index
    <!-- 调用Element UI组件 -->
    <el-button type="primary">主要按钮</el-button>

    <p>
      <router-view></router-view>
    </p>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  mounted(){
    // 请求测试接口
    //axios请求返回的也是一个promise，成功是的调用时.then(),它的用法和ajax还有fetch差不多，都是异步请求
    // axios({
    //   url:"https://api.github.com/users",
    //   method:'GET',

    //   //get请求参数
    //   params:{
    //     PDF:123,
    //   }
    // }).then(res=>{
    //   console.log(res);
    // })

    //请求测试接口
     this.$axios({
      url:"https://api.github.com/users",
      method:'GET',

    }).then(res=>{
      console.log(res);
    })
  }
  
}
</script>

<style>

</style>
