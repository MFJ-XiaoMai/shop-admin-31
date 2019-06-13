<template>
  <div >
    <!-- data:组件接收的数据
         show-checkbox:是否显示选择框
         node-key:类似for循环的 :key
         default-expend-all:默认展开全部
         expend-on-click-node:是否在点击节点的时候展开或者收缩节点
    -->
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <!-- {node,data} 相当于const {node,data} = scope(结构并赋值) -->
      <!-- scope.data 代表每一行的数据对象 -->
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <!-- 因为scope.node代表每一行的数据对象
        只包含id和label-->
        <!-- <span>{{ node.label }}</span> -->
        <span style="width:33.3%" >
          {{ data.title }}
          </span>
        <span style="width:33.3%" 
        class="sortId">
          <input :value="data.sort_id" @blur="handleBlur($event, data)">
        </span>
        <span 
        style="width:33.3%" 
        class="edit">
          <el-button 
          type="text" 
          size="mini"
          >编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },

  methods: {
    handleBlur(event, data) {
      //如果修改前后的值是相等的，则进入if执行里面的代码
      if (data.sort_id == event.target.value) {
        return; //跳出函数体，不执行下面的代码
      }

      //如果修改前后的值是不相等的，则弹出弹窗询问是否编辑
      let res = window.confirm("是否确认编辑？");
      // console.log(res); //true

      //如果确认编辑
      if (res) {
        // 则发送修改后的数据，后台接收数据并处理后响应给浏览器，浏览器接收后渲染到页面，也就进行了排序
        this.$axios({
          url: "http://localhost:8899/admin/category/edit/" + data.category_id,
          method: "POST",
          data: {
            ...data,
            sort_id: event.target.value
          },
          //处理session跨域
          withCredentials: true
        }).then(res => {
          // console.log(res);
          this.getList(); //调用函数
          this.$message.success("修改成功");
        });
      }
    },

    // 封装一个请求分类列表数据的函数
    getList() {
      this.$axios({
        url: "http://localhost:8899/admin/category/getlist/goods",
        method: "GET"
      }).then(res => {
        console.log(res);
        const { status, message } = res.data;

        // 如果获取数据成功，则把列表的数据复制给data，渲染到树形控件
        if (status === 0) {
          this.data = message;
        }
      });
    }
  },

  // 页面加载完成后请求列表数据
  mounted() {
    //请求分类列表数据
    // this.$axios({
    //   url: "http://localhost:8899/admin/category/getlist/goods",
    //   method: "GET"
    // }).then(res => {
    //   console.log(res);
    //   const { status, message } = res.data;

    //   // 如果获取数据成功，则把列表的数据复制给data，渲染到树形控件
    //   if (status === 0) {
    //     this.data = message;
    //   }
    // });

    this.getList(); //调用函数
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.custom-tree-node input {
  width: 80px;
  height: 20px !important;
}
.sortId,
.edit{
  text-align: center;
}

</style>
