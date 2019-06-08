<template>
    <el-container>
      <el-aside width="auto">
        <!-- 渲染左侧菜单栏组件  isShow表示是否展开菜单-->
        <Menu :isShow='isShow'></Menu>
      </el-aside>

      <el-container>
        <el-header>
          <!-- 4. 渲染头部组件 -->
          <Header @retreatclick='handleChangShow'></Header>
        </el-header>

        <el-main>
          <!-- 渲染面包屑组件 -->
          <Crumbs>  </Crumbs>
        </el-main>
      </el-container>
    </el-container>
</template>

<script>
//1.导入头部组件
import Header from '../components/Header.vue';
//导入面包屑组件
import Crumbs from '../components/Crumbs.vue';
//导入左侧菜单栏
import Menu from '../components/Menu.vue';

export default {
  data(){
    return {
      // 控制菜单的展开收起状态
      isShow:false,
    }
  },
  //2.给组件注册事件
  components:{
    Header,
    Crumbs,
    Menu,
  },
  //3. 页面事件
  methods:{
    //修改isShow事件
    handleChangShow(){
      this.isShow=!this.isShow
    }
  }
};
</script>

<style>
.el-header,
.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
}

/* 重新修改高度 */
body > div > .el-container{
  position: absolute;
  top:0;
  bottom: 0;
  width: 100%;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}


</style>
