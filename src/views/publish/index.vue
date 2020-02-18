<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <!-- 使用自己封装的面包屑组件 -->
        <my-bread>{{$route.query.id?'修改':'发布'}}文章</my-bread>
      </div>
      <!-- 表单区域 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <quill-editor v-model="articleForm.content" :options="editorOption"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">
          <!-- 单选框组 -->
          <el-radio-group v-model="articleForm.cover.type" @change="articleForm.cover.images=[]">
            <el-radio :label="1">单图</el-radio>
            <el-radio :label="3">三图</el-radio>
            <el-radio :label="0">无图</el-radio>
            <el-radio :label="-1">自动</el-radio>
          </el-radio-group>
          <!-- 对话框 -->
          <div>
            <!-- 组件位置 -->
            <div v-if="articleForm.cover.type===1">
              <my-image v-model="articleForm.cover.images[0]"></my-image>
            </div>
            <div v-if="articleForm.cover.type===3">
              <my-image :key="i" v-for="i in 3" v-model="articleForm.cover.images[i-1]"></my-image>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="频道：">
          <!-- 使用自己封装的频道组件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item v-if="$route.query.id">
          <el-button @click="updata()" type="success">修改文章</el-button>
        </el-form-item>
        <el-form-item v-else>
          <el-button @click="submit(false)" type="primary">发布文章</el-button>
          <el-button @click="submit(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script type="text/javascript">
// 富文本需要的样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 富文本的组件配置对象
import { quillEditor } from "vue-quill-editor";

export default {
  name: "app-publish",
  data() {
    return {
      // 文章数据
      articleForm: {
        title: null,
        channel_id: null,
        content: null,
        cover: {
          // 封面类型 -1:自动，0-无图，1-1张，3-3张
          type: 1,
          // 放图片的地址
          images: []
        }
      },
      // 富文本的配置对象
      editorOption: {
        // 占位文字清空
        placeholder: "",
        // 模块配置
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"],
            ["blockquote", "code"],
            [{ header: 1 }, { header: 2 }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ indent: "-1" }, { indent: "+1" }],
            ["image"]
          ]
        }
      }
    };
  },
  created() {
    // 当是修改文章的时候，获取文章信息填充表单
    if (this.$route.query.id) {
      this.getArticles();
    }
  },
  watch: {
    // 监听地址栏id的变化
    "$route.query.id": function() {
      this.toggleFormInfo();
    }
  },
  methods: {
    // 添加文章 draft===false 发布文章  draft===true  存入草稿
    async submit(draft) {
      try {
        // 请求  接口需要地址栏键值对传参(将draft的布尔值传递过去，根据draft的布尔值进行判断)
        await this.$http.post(`articles?draft=${draft}`, this.articleForm);
        // 提示信息
        this.$message.success(draft ? "存入草稿成功" : "发布文章成功");
        // 跳转
        this.$router.push("/article");
      } catch (e) {
        this.$message.error("操作失败");
      }
    },
    // 获取文章信息
    async getArticles() {
      // 发请求，将对应文章的id传递过去
      const res = await this.$http.get(`articles/${this.$route.query.id}`);
      // console.log(res);
      this.articleForm = res.data.data;
    },
    // 切换表单内容
    toggleFormInfo() {
      if (this.$route.query.id) {
        // 说明：是修改文章，需要填充表单
        this.getArticles();
      } else {
        // 说明：是发布文章，不需要填充表单
        // 不能直接使用：this.articleForm = {}，因为这样模板中 articleForm.cover.type 会报错
        // 必须保证模板依赖的字段都有对应的数据，保证模板编译不错误
        this.articleForm = {
          title: null,
          channel_id: null,
          content: null,
          cover: {
            type: 1,
            images: []
          }
        };
      }
    },
    // 修改文章的函数
    async updata() {
      try {
        // 修改只有发布，没有草稿
        // 路径传参 需要ID
        // 键值对传参  需要 draft
        // 请求体传参  articleForm
        await this.$http.put(
          `articles/${this.articleForm.id}?draft=false`,
          this.articleForm
        );
        // 提示信息
        this.$message.success("修改成功");
        // 跳转到“文章管理”页面
        this.$router.push("/article");
      } catch (e) {
        this.$message.error("修改失败");
      }
    }
  },
  components: { quillEditor }
};
</script>

<style scoped lang="less" >
</style>
