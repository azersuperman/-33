<template>
  <div class="van-celll">
    <div>
      <van-row>
        <van-col span="4">
          <van-image round width="40" height="40" :src="results.aut_photo">
          </van-image>
        </van-col>
        <van-col span="14">
          <van-row class="name">{{ results.aut_name }}</van-row>
          <van-row class="content">{{ results.content }}</van-row>
          <van-row>
            <van-col span="10"
              ><span class="time"> {{ label }}</span></van-col
            >
            <van-col span="10" offset="2">
              <!-- 回复评论者 -->
              <van-button
                type="default"
                round
                size="mini"
                @click="$emit('commentShow', results.com_id, true)"
                >回复{{ results.reply_count }}</van-button
              >
            </van-col>
          </van-row>
        </van-col>
        <van-col span="6">
          <van-row>
            <van-col span="12"></van-col>
            <van-col span="12">
              <van-row>
                <van-col span="10">
                  <van-icon name="good-job-o" />
                </van-col>
                <van-col span="10">
                  <span>赞</span>
                </van-col>
              </van-row>
            </van-col>
          </van-row>
        </van-col>
      </van-row>
    </div>
    <van-divider />
  </div>
</template>

<script>
import dayjs from '@/utils/dayjs'
export default {
  name: 'Comments',
  props: {
    results: Object,
    default: () => ({})
  },
  methods: {
    kb() {}
  },
  computed: {
    label() {
      const { pubdate } = this.results
      return dayjs(pubdate).fromNow()
    }
  }
}
</script>

<style scoped lang="less">
.van-celll {
  padding: 0.26667rem 0.42667rem;
}
.van-col {
  font-size: 28px;
}
.name {
  color: #406599;
  font-size: 0.34667rem;
}
.content {
  font-size: 0.42667rem;
  color: #222;
  word-break: break-all;
  text-align: justify;
  margin: 32px 0;
}
.time {
  font-size: 15px;
}
</style>
