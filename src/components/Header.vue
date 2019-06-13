<template>
  <div>
    <!-- el-row是布局组件，type=flex声明是flex布局，并且带有降级方案(如果了浏览器不支持flex，会自动调用其他的布局方式) -->
    <el-row type='flex' justify='space-between'>
      <!-- 箭头 -->
      <div class="arrow" @click='handleClick'>
        <i class="el-icon-back"></i>
      </div>
      <div>
        {{user.uname}} {{user.realname}} 
        <span 
        @click='handleLogout'
        class="logout">退出</span>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
  data(){
    return {
      user:{}
    }
  },
  methods:{
    handleClick(){
      this.$emit('retreatclick')
    },

    //登录退出
    handleLogout(){
      // 调用退出的接口
      console.log(123);
      this.$axios({
        url:'http://localhost:8899/admin/account/logout',
        mehtod:'GET',
        //处理session跨域
        withCredentials: true
      }).then(res => {
        const {status,message} = res.data;

        if(status===0){
          //退出成功
          this.$message.success(message);

          //调转到登录页面
          this.$router.push('/login');
          //清除本地的数据
          localStorage.removeItem('user')
        }
      })
    }
  },
  mounted(){
    //读取vuex的store数据
    // console.log(this.$store);
    this.user = this.$store.state.user;
  }
};
</script>

<style>
  .arrow,
  .logout{
    /* 将鼠标变成小手的状态 */
    cursor: pointer;
  }
</style>
