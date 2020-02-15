<template>
  <div class="container-publish">
    <el-card>
      <div slot="header">
        <!-- 使用自己封装的面包屑组件 -->
        <my-bread>发布文章</my-bread>
      </div>
      <!-- 表单区域 -->
      <el-form label-width="120px">
        <el-form-item label="标题：">
          <el-input v-model="articleForm.title" style="width:400px"></el-input>
        </el-form-item>
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <quill-editor v-model="articleForm.content"></quill-editor>
        </el-form-item>
        <el-form-item label="封面：">封面组件</el-form-item>
        <el-form-item label="频道：">
          <!-- 使用自己封装的频道组件 -->
          <my-channel v-model="articleForm.channel_id"></my-channel>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">发布文章</el-button>
          <el-button>存入草稿</el-button>
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
        content: null
      }
    };
  },
  components: { quillEditor }
};
</script>

<style scoped lang="less" >
</style>
