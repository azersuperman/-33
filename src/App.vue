<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
// rem适配
// 1 .让rem动起来
// 2 .盒子使用rem
// 自动的识别css中px ,并将其转化成rem
// post-css css 的预处理器
// postcss自己能干的事很少，下载插件

// 1. 下载yarn add postcss-pxtorem
// 2. 告诉postcss，我要使用这个插件, .postcssrc.js
export default {
  data() {
    return {}
  }
}
</script>

<style scoped>
.box {
  width: 500px;
  height: 2rem;
  background-color: gold;
}
</style>
