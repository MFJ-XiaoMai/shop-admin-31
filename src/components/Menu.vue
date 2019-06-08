<template>
    <!-- 菜单栏组件 -->
    <!-- default-active:默认选中的选项 -->
    <!-- active-text-color:高亮时的颜色 -->
    <!-- collapse默认是false展开菜单，true收起菜单 -->
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      background-color="#001529"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse='isShow'
      >

      <!-- 购物商城的子菜单 -->
      <el-submenu index="1">
        <!-- slot指定模板中数据，这里暂时不适用 -->
        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>购物商城</span>
        </template>

        <el-menu-item index="1-1">
          <template slot="title">商品管理</template>
        </el-menu-item>

        <el-menu-item index="1-2">
          <template slot="title">栏目管理</template>
        </el-menu-item>
      </el-submenu>
    </el-menu>
</template>

<script>
export default {
  //props声明可以接收的属性
  props:["isShow"]
}
</script>

<style>
  .el-menu-vertical-demo{
        height: 100%;
    }
  /* input:not(:empty)  所有不为空input的标签*/
  .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 400px;
    }
</style>
