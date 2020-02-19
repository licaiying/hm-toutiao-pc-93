<template>
  <div class="container-fans">
    <el-card>
      <!-- 面包屑 -->
      <div slot="header">
        <my-bread>粉丝管理</my-bread>
      </div>
      <!-- tabs标签页 -->
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="粉丝列表" name="list">
          <!-- 列表 -->
          <div class="fans-list">
            <div class="fans-item" v-for="i in 24" :key="i">
              <el-avatar
                :size="80"
                src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
              ></el-avatar>
              <p>用户名称</p>
              <el-button type="primary" plain size="small">+关注</el-button>
            </div>
          </div>
          <!-- 分页 -->
          <el-pagination background layout="prev, pager, next" :total="1000"></el-pagination>
        </el-tab-pane>
        <el-tab-pane label="粉丝画像" name="pictrue">2</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "app-fans",
  data() {
    return {
      activeName: "list"
    };
  }
};
</script>

<style scoped lang="less" >
.fans-list {
  .fans-item {
    padding-top: 10px;
    width: 100px;
    height: 170px;
    border: 1px dashed #ddd;
    text-align: center;
    display: inline-block;
    margin-right: 30px;
    margin-bottom: 20px;
    p {
      padding: 0;
      font-size: 12px;
    }
  }
}
</style>
