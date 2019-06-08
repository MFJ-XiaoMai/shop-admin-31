<template>
  <div class="crumbs">
    <!-- 当设计组件是没有数据，可以先用静态数据来代替，有数据再替换回来 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{path:'/'}">
        后台管理
      </el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/'}">
        <!-- 商品列表 -->
        后台管理
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
  .crumbs{
    padding-bottom: 10px;
    border-bottom: 1px #ddd solid 
  }

</style>
