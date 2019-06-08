<template>
  <div>
    <!-- el-row是布局组件，type=flex声明是flex布局，并且带有降级方案(如果了浏览器不支持flex，会自动调用其他的布局方式) -->
    <el-row type='flex' justify='space-between'>
      <!-- 箭头 -->
      <div class="arrow" @click='handleClick'>
        <i class="el-icon-back"></i>
      </div>
      <div>admin 超级管理员 退出</div>
    </el-row>
  </div>
</template>

<script>
export default {
  methods:{
    handleClick(){
      this.$emit('retreatclick')
    }
  }
};
</script>

<style>
  .arrow{
    /* 将鼠标变成小手的状态 */
    cursor: pointer;
  }
</style>
