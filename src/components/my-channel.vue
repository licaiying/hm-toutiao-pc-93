<template>
  <el-select @change="changeChannel" clearable :value="value" placeholder="请选择">
    <el-option v-for="item in channelOptions" :key="item.id" :label="item.name" :value="item.id"></el-option>
    <!-- label 选项文字,  value 选项的值, 当你选择某个选项后，该选项的值提供v-model -->
  </el-select>
</template>

<script type="text/javascript">
export default {
  name: "my-channel",
  props: ["value"],
  data() {
    return {
      // 默认的下拉选项
      //   value: null,
      // 所有的下拉选项
      channelOptions: []
    };
  },
  created() {
    this.getChannelOptions();
  },
  methods: {
    changeChannel(value) {
      // value 是element-ui提供的属性，表示的是频道的id
      //   if (this.value == "") this.value = null;
      if (value == "") value = null;
      // 当value的值改变后，通知父组件改值
      this.$emit("input", value);
    },
    // 获取频道数据
    async getChannelOptions() {
      // 发请求,获取频道数据
      const res = await this.$http.get("channels");
      // res = {data:{message:'',data:{channels:[// 频道数组 ]}}}
      // this.channelOptions = [{id,name}]  数据格式
      // console.log(res);
      this.channelOptions = res.data.data.channels;
    }
  }
};
</script>

<style scoped lang="less" >
</style>
