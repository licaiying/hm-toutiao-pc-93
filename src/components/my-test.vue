<template>
  <!-- 演示作用域插槽的使用，与此项目无关 -->
  <div class="test">
    <slot name="up" age="18" gender="女" :msg="msg"></slot>
    <h4>演示作用域插槽的使用</h4>
    <slot name="down"></slot>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "my-test",
  data() {
    return {
      msg: "一段文本"
    };
  }
};
</script>

<style scoped lang="less" >
</style>
