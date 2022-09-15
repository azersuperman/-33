<template>
  <div>
    <form action="/">
      <van-search
        class="search"
        v-model.trim="keywords"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @focus="isShowSearchResult = false"
        @cancel="$router.push('/')"
      />
    </form>

    <component
      :keywords="keywords"
      :is="componentName"
      @change-keywords="onSearch"
    ></component>
  </div>
</template>

<script>
import SearchSuggestion from '@/views/Search/components/SearchSuggestion.vue'
import SearchResult from '@/views/Search/components/SearchResult.vue'
import SearchHistory from '@/views/Search/components/SearchHistory.vue'
import { mapMutations, mapState } from 'vuex'
export default {
  data() {
    return {
      keywords: '',
      isShowSearchResult: false
    }
  },
  components: {
    SearchSuggestion,
    SearchResult,
    SearchHistory
  },
  computed: {
    ...mapState(['histories']),
    componentName() {
      // 搜索历史：搜索框的值空
      // 搜索建议：搜索框有值，并且不渲染搜索结果
      // 搜索结果：出发搜索时 显示搜索结果
      if (this.keywords === '') {
        return 'SearchHistory'
      }
      // this，kewords一定有值
      if (this.isShowSearchResult) {
        return 'SearchResult'
      }
      return 'SearchSuggestion'
    }
  },
  methods: {
    ...mapMutations(['SET_HISTORIES']),
    onSearch(keywords) {
      const distinct = [...new Set([keywords, ...this.histories])]
      this.SET_HISTORIES(distinct)
      this.keywords = keywords
      this.isShowSearchResult = true
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
