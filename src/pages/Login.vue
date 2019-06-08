<template>
  <!-- el-form是表单组件 -->
  <!-- ref 可以操作dom -->
  <!-- model 当前表单数据 -->
  <!-- rules 表单的校验规则 -->
  <div class="conent">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="form">
      <el-form-item label="账号" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>

      <el-form-item>
        <!-- type按钮的颜色 -->
        <el-button type="primary" @click="onSubmit">登录</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单中的数据
      form: {
        username: "",
        password: ""
      },
      // 表单规则
      rules: {
        username: [
          //required必须要输入，message提示的信息，trigger：'blur'失去焦点时触发
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },

  methods: {
    //登录事件，提交登录密码到服务器
    onSubmit() {
      // console.log("submit!");
      //提交到后台的数据
      const data={
        uname:this.form.username,
        upwd:this.form.password
      }
      //验证表单是否通过，若通过则后台验证返回登录的状态并跳转到首页，否则提示验证失败信息
       this.$refs.form.validate((valid) => {
        //验证通过
        if (valid) {
          // 调用axios发送请求
          this.$axios({
            //请求地址
            url:'http://localhost:8899/admin/account/login',
            //请求方式
            method:'POST',
            //发送的数据
            data,
            //处理session跨域
            withCredentials:true,
          }).then(res=>{//发送数据成功，后台验证
          //结构并且赋值
          console.log(res);
          const {message,status}=res.data;
          //登录成功后执行的代码
            if(status===0){
              this.$router.push('/')
            }
            // 登录失败后提示的代码
            if(status===1){
              this.$message.error(message); 
            }
          })
        } 
      });
    }
  }
};
</script>
<style scoped>
.conent {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}

.form {
  width: 400px;
  position: absolute;
  left: 50%;
  margin-left: -200px;
  top: 50%;
  margin-top: -95px;
}
</style>
