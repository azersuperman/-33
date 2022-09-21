<template>
  <div>
    <van-nav-bar
      class="navbar"
      :title="title"
      left-arrow
      @click-left="$router.back()"
    />
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: [String, Number],
      required: true
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
  :deep(.van-icon) {
    color: #fff;
  }
}
</style>
