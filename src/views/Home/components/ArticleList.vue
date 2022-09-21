<template>
  <div class="article">
    <van-pull-refresh v-model="refreshLoading" @refresh="getNextPageArticle">
      <van-list
        v-model="loading"
        @load="getNextPageArticle"
        offset="100"
        :immediate-check="false"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败，请刷新重试"
      >
        <article-item
          @click.native="
            $router.push({
              path: '/detail',
              query: {
                articleId: item.art_id
              }
            })
          "
          v-for="item in articles"
          :key="item.art_id"
          :article="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api'
import ArticleItem from './ArticleItem.vue'
export default {
  name: 'ArticleList',
  props: {
    id: [String, Number]
  },
  components: {
    ArticleItem
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getFristPageArticle()
  },
  methods: {
    // 首页渲染
    async getFristPageArticle() {
      try {
        const { data } = await getArticles(this.id, +new Date())
        this.articles = data.data.results
        // 保存下一页时间戳用于分页
        this.preTimestamp = data.data.pre_timestamp
        // data.data.pre_timestamp = null
      } catch (error) {
        // js 的错误，.507原封不动上抛，400上抛中文
        const status = error.response?.message
        if (!error.response && status === 507) {
          throw error
        } else {
          if (status === 400) {
            throw new Error(error.response.data.message)
          }
        }
      }
    },

    // 获取下一页
    async getNextPageArticle() {
      // 1. 发送请求
      try {
        // if (Math.random() < 0.5) {
        //   this.error = true
        // }
        const { data } = await getArticles(this.id, this.preTimestamp)
        if (!data.data.pre_timestamp) {
          this.finished = true
        }
        // 如果是下滑加载，将数据放在最后
        // 如果是下拉刷新，将数据放在最前
        // 2.添加到articles
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 3.更新时间戳
        this.preTimestamp = data.data.pre_timestamp
      } catch (error) {
        // 错误进行处理
        this.error = true
      } finally {
        // finally语句一定会执行
        // 4. 更改loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
// 如何给盒子拥有自己的滚动条
// - 1.定高 2.overflow:auto/scroll/overlay
.article {
  height: calc(100vh - 92px - 83px - 100px);
  overflow: auto;

  // &: 代表当前元素他爹
  // ::-webkit-scrollbar : 滚动槽
  // ::-webkit-scrollbar-thumb: 滚动的滑块
  &::-webkit-scrollbar {
    width: 10px;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #c7e1fd;
    border-radius: 5px;
  }
}
</style>
