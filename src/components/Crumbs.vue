<template>
  <div class="crumbs">
    <!-- 当设计组件是没有数据，可以先用静态数据来代替，有数据再替换回来 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for='(item,index) in info' :key='index'>
        {{item}}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data(){
    return{
      info:[],
    }
  },
  //监听路由变化，获取路由信息
  watch:{
    //保存meta信息
    $route(){
      console.log(this.$route.matched);
      //获取matched里的每一项meta信息
    //   const arr=this.$route.matched;
    //   let info=[];
    //   arr.forEach(v =>{
    //     info.push(v.meta)//将获取的meta信息追加到info数组中
    //   });
    //   this.info=info//将数组同步到data中

    
    this.getRoute()//调用函数
    }
  },
  methods:{
    // 封装一个获取matched每一项的meta信息，并存到一个数组中
    getRoute(){
      const arr=this.$route.matched;
      let info=[];
      arr.forEach(v =>{
        info.push(v.meta)//将获取的meta信息追加到info数组中
      });
      this.info=info//将数组同步到data中
    }
  },
  mounted(){
    //组件加载完成后获取meta信息
    this.getRoute()//调用函数
  }

}
</script>

<style scoped>
  .crumbs{
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid 
  }
  
</style>
