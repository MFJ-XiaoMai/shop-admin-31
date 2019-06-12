<template>
  <el-form ref="form" :model="form" label-width="80px">
    <!-- 所属类型——下拉列表 -->
    <el-form-item label="所属类型">
      <el-select v-model="form.category_id" placeholder="请选择添加商品的类型">
        <el-option
          v-for="(item,index) in categorys"
          :key="index"
          :label="item.title"
          :value="item.category_id"
        ></el-option>
      </el-select>
    </el-form-item>

    <!-- 是否发布 -->
    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
    </el-form-item>
    <!-- 推荐类型 -->
    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>
    <!-- 内容标题 -->
    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <!-- 副标题 -->
    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>
    <!-- 图片上传 -->
    <el-form-item label="封面图片">
      <!-- action:上传的地址 -->
      <!-- show-file-list:是否支持多选 -->
      <!-- on-success：上传图片成功后的回调函数 -->
      <!-- before-upload: 上传之前执行的函数 -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <!-- 图片预览 -->
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <!-- +号图标 -->
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <!-- 商品货号 -->
    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>
    <!-- 库村数量 -->
    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
    </el-form-item>
    <!-- 市场价格 -->
    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>
    <!-- 销售价格 -->
    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>
    <!-- 图片相册——多张图片的上传 -->
    <el-form-item label="图片相册">
      <!-- list-type:声明当前图片相册的方式显示 -->
      <!-- on-preview:预览事件的处理函数 -->
      <!-- on-remove:删除图片是触发的事件 -->
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :on-remove="handleRemove"
        :on-success="handleCartSuccess"
        :file-list='form.fileList'
      >
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>
    <!-- 内容摘要 -->
    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>
    <!-- 内容描述 -->
    <el-form-item label="内容描述" class="editor">
      <quillEditor v-model="form.content"></quillEditor>
    </el-form-item>

    <!-- 编辑与取消按钮 -->
    <el-form-item>
      <el-button type="primary" @click="onSubmit">确认编辑</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
//  导入富文本框编辑器的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

//导入富文本框编辑器的组件
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        category_id: "",
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [], //封面图片
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        fileList: [], //多张图片
        zhaiyao: "",
        conent: "",

        is_slide: false //是否显示轮播图，不属于商品添加
      },
      imageUrl: "", //预览图片的地址
      dialogImageUrl: "", //多张图片预览时的图片地址
      dialogVisible: false, //弹窗是否显示

      categorys: [] //所属类别的数据
    };
  },
  //注册局部组件
  components: {
    quillEditor //富文本框组件
  },
  methods: {
    //上传成功后的回调函数
    handleAvatarSuccess(res, file) {
      //设置图片的地址
      this.imageUrl = URL.createObjectURL(file.raw);

      //把上传成功的结构固执给form.imgList
      this.form.imgList = [res];
    },

    //upload上传之前执行的函数
    beforeAvatarUpload(file) {
      //判断图片的大小有没大于2m
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      //如果返回false不会上传
      return isLt2M;
    },

    //多张图片的删除事件
    handleRemove(file, fileList) {
      // console.log(file, fileList);
      //把删除之后的列表赋值给this.form.fileList
      //循环遍历数组fileList,并获得response
      const files = fileList.map(v => {
        return v.response;
      });
      this.form.fileList = files;
    },

    //图片的预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    //上传多张图片成功后的回调
    handleCartSuccess(res, file, fileList) {
      // console.log(fileList)

      // file.response是图片文件
      this.form.fileList.push(file.response)
    },

    //提交数据到添加商品的接口
    onSubmit() {
      //提交数据时一定要先登录，还有跨域声明withCredentials:true
      // console.log("submit!");
      this.$axios({
        url: "http://localhost:8899/admin/goods/edit/" + this.$route.params.id,
        method: "POST",
        data: this.form, //要提交的数据
        //处理session跨域
        withCredentials: true
      }).then(res => {
        console.log(res);

        //解构并赋值
        const { status, message } = res.data;
        // console.log(this.form);
        //如果数据提交成功则返回上一页，否则跳转到登录页
        if (status === 0) {
          // 成功的提示
          this.$message.success(message);
          // 返回上一页
          this.$router.back();
        } else {
          // 跳转到登录页
          // this.$router.push("/login");
        }
      });
    }
  },
  //在mounted获取所有类别的数据
  mounted() {
    //添加页面请求类别的数据
    this.$axios({
      url: "http://localhost:8899/admin/category/getlist/goods",
      method: "GET"
    }).then(res => {
      // console.log(res);
      //结构并赋值data
      const { message, status } = res.data;
      //将获取到所有的类别数据保存到categorys
      this.categorys = message;
    });

    //编辑页面获取商品的数据
    // 读取url的动态参数id，根据id获取商品数据，获取成功后把数据赋值个this.form

    //获取动态参数id  解构并赋值
    const {id} = this.$route.params;

    this.$axios({
      url:"http://localhost:8899/admin/goods/getgoodsmodel/" + id ,
      method:'GET',
    }).then(res => {
      const {status,message} = res.data;

      //对象的合并
      this.form = {
        ...message,
        //将category_id转化为数字
        category_id: +message.category_id,
      }

      //imageUrl封面预览
      this.imageUrl = message.imgList[0].url;


    })

  }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
