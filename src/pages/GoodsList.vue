<template>
  <!-- 商品列表顶部 -->
  <div>
    <el-row 
    type="flex" 
    justify="space-between" 
    class="goods-top">
      <!-- 按钮列表 -->
      <div>
        <el-button @click="handleToGoodsAdd">新增</el-button>
        <el-button type="danger" @click="handleDleMore">删除</el-button>
      </div>
      <!-- 搜索输入框 -->
      <div class="input-search">
        <!-- 给输入框双向数据绑定变量-->
        <el-input 
        placeholder="请输入内容" class="input-with-select"
        v-model="searchValue">
          <!-- 添加搜索事件  -->
          <el-button 
          slot="append" 
          icon="el-icon-search"
          @click='handleSearch'></el-button>
        </el-input>
      </div>
    </el-row>

    <!-- 商品列表的表格 -->
    <!-- data: 表格的数据 -->
    <!-- tooltip-effect:工具栏的效果 -->
    <!-- selection-change：选中表格每一项的时候就触发事件 -->
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <!-- 多选表格中的多选方块 -->
      <el-table-column 
      type="selection" 
      width="55">
      </el-table-column>

      <!-- 自定义列表格模板表格 -->
      <!-- label每一列的标题文字 -->
      <!-- width当前列的宽度 -->
      <!-- 标题 -->
      <el-table-column label="标题" width="300">
        <!-- template的slot-scope的 -->
        <!-- scope.row每一项数据的对象 -->
        <template slot-scope="scope">
          <el-row type='flex' align='middle'>
            <img :src="scope.row.imgurl"
            class="goods-img">
            <div>
              {{scope.row.title}}
            </div>
          </el-row>
        </template>
      </el-table-column>

      <!-- 类型 -->
      <!-- 显示数据的简写方式，指定prop属性 自动读取每一项数据的prop值 -->
      <el-table-column
      prop='categoryname'
      label='类型'
      width='120'>
      </el-table-column>

      <!-- 价格 -->
      <el-table-column
      prop='sell_price'
      label='价格'
      width='120'>
      </el-table-column>

      <!-- 操作栏 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button 
          size="mini" 
          @click="handleEdit(scope.row)">
          编辑
          </el-button>

          <el-button 
          size="mini" 
          type="danger" 
          @click="handleDelete(scope.row)">
          删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页功能 -->
    <!-- size-change:显示条数切换 -->
    <!-- current-change:页数的切换 -->
    <!-- current-page：当前的页面 -->
    <!-- page-sizes:条数的选项 -->
    <!-- page-size：当前的条数 -->
    <!-- layout：默认布局 -->
    <!-- total：数据的全部条数 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageIndex"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //模拟数据，会被接口替换
      tableData: [
      //   {
      //       id: 103,        
      //       title: "骆驼男装2017秋季新款运动休闲纯色夹克青年宽松长袖针织开衫卫",
      //       is_top: 1,
      //       is_hot: 1,
      //       is_slide: 1,      
      //       categoryname: "男装",
      //       img_url: "/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg",
      //       imgurl:"http://127.0.0.1:8899/upload/201504/20/thumb_201504200214471783.jpg",
      //       goods_no: "NZ0000000002",
      //       stock_quantity: 200,
      //       market_price: 1000,
      //       sell_price: 800 
      //   }
      ],
      selectGoods:[], //选中的商品
      searchValue:'', //搜索框里的关键字

      pageIndex:1, //默认的页数，随着页面的切换而变化
      pageSize:5, //页面显示的条数
      total:0, //总条数
    };
  },
  methods: {
    // 封装一个请求数据列表的函数
    getList(){
      // 发送异步请求 请求数据
      //pageIndex:当前的页数，会变化
      //paggeSize:数据条数，会变化
      //searchValue:搜索关键字
      this.$axios({
        url:`http://localhost:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.searchValue}`,
        method:'GET',
      }).then(res=>{
        // console.log(res);
        const data=res.data
        //商品列表的数据
        this.tableData=data.message

        //数据请求成功后保存总条数
        this.total=data.totalcount
      })
    },
    
    //封装一个删除商品的异步请求数据函数
    getDelShopList(ID){
      this.$axios({
        url:`http://localhost:8899/admin/goods/del/${ID}`,
        method:'GET',    
      }).then(res=>{
        //解构并赋值
        // console.log(res);
        const {message,status}=res.data;
        if(status===0){
          this.$message.success(message)
          //删除成功，刷新页面，再次请求商品列表数据
          this.getList()//调用函数
        }else{
          this.$message.error(message);
        }
      })
    },


    //选择每一项时就触发事件
    handleSelectionChange(val) {
      // 保存到选中的商品
      this.selectGoods = val;
    },

    // 编辑商品
    handleEdit(goods) {
      // console.log(goods);
      // 每一行商品的编辑按钮被点击时都会跳转到编辑商品页面，跳转时要带上被点击商品的id
      this.$router.push('/admin/goods-edit/' + goods.id)
      
    },

    //删除多个商品
    handleDleMore(){
      //用map循环遍历获取选中商品的id
      const arr=this.selectGoods.map(v=>{
        // console.log(v);
        return v.id
      });
      //`http://localhost:8899/admin/goods/del/$1,2`
      const ids=arr.join(',')//以,为分隔符拼接 
      
      //调用删除商品的接口
      // this.$axios({
      //   url:`http://localhost:8899/admin/goods/del/${ids}`,
      //   method:'GET',    
      // }).then(res=>{
      //   //解构并赋值
      //   // console.log(res);
      //   const {message,status}=res.data;
      //   if(status===0){
      //     this.$message.success(message)
      //     //删除成功，刷新页面，再次请求商品列表数据
      //     this.getList()//调用函数
      //   }else{
      //     this.$message.error(message);
      //   }
      // })

        this.getDelShopList(ids)//调用函数
    },

    // 删除单个商品
    handleDelete(goods) {
      console.log(goods);
      //获取被选中商品的id
      const id = goods.id;
      // 调用删除商品的接口
      // this.$axios({
      //   url:`http://localhost:8899/admin/goods/del/${id}`,
      //   method:'GET',
      // }).then(res=>{
      //   const {message,status}=res.data
      //   if(status===0){
      //     this.$message.success(message)
      //     //删除成功，刷新页面，再次请求商品列表数据
      //     this.getList()//调用函数
      //   }else{
      //     this.$message.error(message)
      //   }
      // })

      this.getDelShopList(id)//调用函数
    },
    
    // 条数的切换
    handleSizeChange(val) {
      // 保存当前的条数
      this.pageSize=val
      console.log(`每页 ${val} 条`);

      //调用函数，重新发起请求
      this.getList()

    },

    // 页数的切换
    handleCurrentChange(val) {
      //保存当前页面
      this.pageIndex=val
      console.log(`当前页: ${val}`);
      //调用函数，重新发起请求
      this.getList()
    },

    //处理搜索内容
    handleSearch(){
      //获取输入框的值
      // this.searchValue

      //调用函数发起异步请求，赋值给searchValue
      this.getList()//调用函数
    },

    // 点击新增按钮跳转到新增商品页
    handleToGoodsAdd(){
      this.$router.push('/admin/goods-add')
    }

  },
  mounted(){
    // 发送异步请求 请求数据
      //pageIndex:当前的页数，会变化
      //paggeSize:数据条数，会变化
      //searchValue:搜索关键字
      // this.$axios({
      //   url:`http://localhost:8899/admin/goods/getlist?pageIndex=1&pageSize=5&searchvalue=`,
      //   method:'GET',
      // }).then(res=>{
      //   // console.log(res);
      //   const data=res.data
      //   //商品列表的数据
      //   // console.log(data);
      //   this.tableData=data.message
        
      // })

      this.getList()//调用函数
  }
};
</script>

<style>
.goods-top{
  margin-top: 20px;
  margin-bottom: 20px;
}
.goods-img{
  width: 60px;
  height: 60px;
  /* flex-shrink：表示元素压缩的倍数，如果是0，表示不会别压缩 */
  flex-shrink: 0;
  margin-right: 5px;
}
</style>
