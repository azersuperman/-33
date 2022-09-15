<template>
  <div>
    <van-list
      v-model="loading"
      @load="getResults"
      :finished="finished"
      finished-text="没有了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      class="results"
    >
      <van-cell
        :title="item.title"
        v-for="item in results"
        :key="item.art_id"
        @click="
          $router.push({
            path: '/detail',
            query: {
              articleId: item.art_id
            }
          })
        "
      ></van-cell>
    </van-list>
  </div>
</template>

<script>
import { getResultsAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      page: 1,
      perPage: 10,
      results: [],
      finished: false,
      error: false
    }
  },
  methods: {
    async getResults() {
      try {
        if (Math.random() < 0.1) {
          throw new Error()
        }
        const { data } = await getResultsAPI(
          this.page++,
          this.perPage,
          this.keywords
        )
        const results = data.data.results

        if (results.length === 0) {
          this.finished = true
        }
        this.results = [...this.results, ...results]
      } catch {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.results {
  height: calc(100vh - 108px);
  overflow: overlay;
}
</style>
