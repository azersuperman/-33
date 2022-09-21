<template>
  <div>
    <!-- nav头部  -->
    <Header title="黑马头条" />

    <div class="topheight">
      <!-- 文章标题 -->
      <h1 class="title">{{ newsDetails.title }}</h1>

      <!-- 作者及关注区域 -->
      <div class="author">
        <van-row>
          <van-col span="3">
            <van-image
              round
              width="1rem"
              height="1rem"
              :src="newsDetails.aut_photo"
            />
          </van-col>
          <!-- 文字 -->
          <van-col span="10">
            <van-row>
              <van-col
                ><van-grid :column-num="1" :border="false" :center="false">
                  <van-grid-item :text="newsDetails.aut_name" />
                  <van-grid-item :text="year" /> </van-grid
              ></van-col>
              <van-col></van-col>
            </van-row>
          </van-col>
          <!-- 关注 -->
          <van-col span="10">
            <van-row>
              <van-col></van-col>
              <van-col offset="13">
                <van-button
                  round
                  type="info"
                  icon="plus"
                  :loading="follow"
                  @click="getFocus"
                  v-if="!follow"
                  ><span>关注</span></van-button
                >
                <van-button
                  round
                  type="info"
                  v-else
                  class="w"
                  :loading="!follow"
                  @click="unSubscribe"
                  ><span>已关注</span></van-button
                >
              </van-col>
            </van-row>
          </van-col>
        </van-row>
      </div>

      <!-- 文章区域 -->
      <van-list
        v-model="loading"
        :immediate-check="false"
        :finished="finished"
        offset="400"
        @load="getComments"
      >
        <article class="markdown-body" v-html="newsDetails.content"></article>
        <van-divider>正文结束</van-divider>
      </van-list>
      <!-- 对文章评论 -->
      <Comments
        v-for="item in results"
        :key="item.com_id"
        :results="item"
        @commentShow="receive"
      ></Comments>
      <!--  对评论评论 -->
      <van-popup
        v-model="commentShow"
        position="bottom"
        :style="{ height: '100%' }"
      >
        <van-nav-bar
          title="回复"
          left-arrow
          @click-left="commentShow = false"
        />
        <Comments
          v-for="item in SecondaryComments"
          :key="item.com_id"
          :results="item"
        ></Comments>
        <p>全部回复</p>
        <Comments
          v-for="item in SecondaryComments"
          :key="item.com_id"
          :results="item"
        ></Comments>
        <van-search
          v-model="value"
          placeholder="请输入搜索关键词"
          shape="round"
          background="red"
        />
      </van-popup>
    </div>

    <!-- 底部点击写评论区域 -->
    <van-row class="comment">
      <van-col span="8" offset="1">
        <van-button
          type="default"
          class="write"
          round
          size="mini"
          @click="comment = true"
          >写评论</van-button
        >
      </van-col>
      <van-col span="2" offset="3">
        <van-icon name="comment-o" :badge="commentnumber" size="0.53333rem" />
      </van-col>
      <van-col span="2" offset="1">
        <van-icon name="star-o" size="0.53333rem" />
      </van-col>
      <van-col span="2" offset="1">
        <van-icon name="good-job-o" size="0.53333rem" />
      </van-col>
      <van-col span="2" offset="1">
        <van-icon name="share" size="0.53333rem" />
      </van-col>
    </van-row>
    <van-popup
      v-model="comment"
      position="bottom"
      :style="{ height: '120px', width: '375px' }"
    >
      <van-row class="compent" justify="center" align="center">
        <van-col span="20">
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          />
        </van-col>
        <van-col span="4">
          <van-row align justify="center">
            <van-col>
              <van-button
                type="default"
                class="release"
                :disabled="!message"
                @click="getSendComments"
                >发布</van-button
              >
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
import {
  getArticleDetailsAPI,
  getFocusAPI,
  unSubscribeAPI,
  getCommentsAPI,
  getSecondaryCommentsAPI,
  getSendCommentsAPI
} from '@/api/detail'
import Header from '@/components/Header.vue'
import Comments from './components/Comments.vue'
export default {
  components: {
    Header,
    Comments
  },
  data() {
    return {
      value: '',
      newsDetails: {},
      follow: false,
      show: false,
      comment: false,
      message: '',
      loading: false,
      finished: false,
      commentnumber: 0,
      results: [],
      commentShow: true,
      comId: '',
      SecondaryComments: [],
      firstcomment: []
    }
  },
  created() {
    this.getArticleDetails()
  },
  computed: {
    year() {
      return `${dayjs(this.newsDetails.pubdate).fromNow()}`
    }
  },
  methods: {
    // 刷新详情页立刻发送请求
    async getArticleDetails() {
      const id = this.$route.query.articleId
      const { data } = await getArticleDetailsAPI(id)
      this.newsDetails = data.data
      console.log(this.newsDetails)
      this.follow = data.data.is_followed
      this.firstcomment = [...this.newsDetails[0]]
      console.log(this.firstcomment)
    },
    // 关注请求
    async getFocus() {
      this.follow = true
      await getFocusAPI(this.newsDetails.aut_id)
    },
    // 取消关注请求
    async unSubscribe() {
      this.follow = false
      await unSubscribeAPI(this.newsDetails.aut_id)
    },
    // 获取评论
    async getComments() {
      const { data } = await getCommentsAPI(this.newsDetails.art_id)
      console.log(data)
      this.commentnumber = data.data.total_count
      this.results = data.data.results
      this.finished = true
      this.loading = false
    },
    async getSecondaryComments() {
      const { data } = await getSecondaryCommentsAPI(this.comId)
      this.SecondaryComments = data.data.results
    },
    // 点击回复
    receive(id, ab) {
      this.comId = id
      this.commentShow = ab
      this.getSecondaryComments()
    },
    // 点击评论
    async getSendComments() {
      await getSendCommentsAPI(this.$route.query.articleId, this.message)
      this.comment = false
      const {
        data: {
          data: { results }
        }
      } = await getCommentsAPI(this.newsDetails.art_id)
      this.results = results
      this.message = ''
    }
  }
}
</script>

<style scoped lang="less">
.title {
  font-size: 0.53333rem;
  font-weight: 700;
  padding: 0.66667rem 0.42667rem;
  margin: 0;
  color: #3a3a3a;
}
.author {
  padding: 0 0.42667rem;
}
:deep(.van-grid-item__content) {
  padding: 0;
}
.van-button--info {
  width: 2.26667rem;
  height: 0.77333rem;
}
.w {
  color: #000;
  background-color: #fff;
  border-color: #ccc;
}
.comment {
  width: 100%;
  height: 1.17333rem;
  border: 1px solid #ccc;
  .write {
    width: 3.76rem;
    height: 0.61333rem;
  }
}
.compent {
  padding: 0.42667rem 0 0.42667rem 0.42667rem;
}
.van-cell {
  background-color: #f5f7f9;
}
.release {
  border: none;
  color: #6ba3d8;
}
.topheight {
  overflow: auto;
  height: calc(100vh - 1.22667rem - 1.17333rem);
}
.van-search .van-cell {
  flex: 0.8;
  margin-left: 0.1rem;
}
.markdown-body {
  box-sizing: border-box;
  // 最小宽度： 200像素；
  // 最大宽度： 980像素；
  // 边距： 0自动；
  // 填充： 45像素;
  min-width: 200px;
  max-width: 980px;
  margin: 0 auto;
  padding: 32px;
  font-size: 0.21333rem;
}

@media (max-width: 767px) {
  .markdown-body {
    padding: 15 px;
  }
}
</style>
