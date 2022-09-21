<template>
  <div>
    <van-nav-bar title="更新昵称">
      <template #left>
        <span
          :style="{
            color: '#1989fa'
          }"
          @click="$parent.$parent.isShowName = false"
          >取消</span
        >
      </template>
      <template #right>
        <span
          :style="{
            color: '#1989fa'
          }"
          @click="UpdateNickname(InfoName)"
          >保存</span
        >
      </template>
    </van-nav-bar>
    <van-field
      v-model="modifiedName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      show-word-limit
    />
  </div>
</template>

<script>
import { savePersonalDataAPI } from '@/api/user'
export default {
  name: 'UpdateNickname',
  props: {
    InfoName: {
      type: [Object],
      required: true
    }
  },
  data() {
    return {
      modifiedName: this.InfoName.name,
      destroy: false
    }
  },

  methods: {
    // 保存信息
    /* eslint-disable */
    async UpdateNickname(InfoName) {
      this.InfoName.name = this.modifiedName
      try {
        await savePersonalDataAPI(InfoName)
      } catch (error) {
        if (error.reponse && error.reponse.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
      this.$emit('update:isShowName', false)
      this.$toast.success('修改成功')
    }
  }
}
</script>

<style></style>
