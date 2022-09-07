<template>
  <div>
    <router-view></router-view>
    <h1>{{ action }}</h1>
    <button @click="GET_ACTION(10)">点击action加1</button>
    <h1>{{ bigNum }}</h1>
  </div>
</template>

<script>
// mapGetters-->将vuex里面mapGetters映射到computed

// mapMutations-->将vuex里面mapGetters映射到methods

import { mapState, mapGetters, mapMutations } from 'vuex'
export default {
  methods: {
    // increment() {
    //   this.$store.commit('GET_ACTION', 10)
    // },
    ...mapMutations(['GET_ACTION'])
  },
  computed: {
    ...mapState(['action']),
    ...mapGetters(['bigNum'])
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
