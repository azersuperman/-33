<template>
  <div>
    <van-picker
      show-toolbar
      title="更新性别"
      :columns="columns"
      :default-index="InfoGender.gender"
      @change="onChange"
      @cancel="onCancel"
    >
      <template #cancel>
        <span>取消</span>
      </template>
      <template #confirm>
        <span @click="UpdateNickname(InfoGender)" @change="onChange">确认</span>
      </template>
    </van-picker>
  </div>
</template>

<script>
import { savePersonalDataAPI } from '@/api/user'
export default {
  name: 'updateGender',
  props: {
    InfoGender: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      a: this.InfoGender
    }
  },
  methods: {
    /* eslint-disable */
    async UpdateNickname(a) {
      this.a.gender = this.b
      try {
        await savePersonalDataAPI(a)
      } catch (error) {
        if (error.reponse && error.reponse.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
      this.$emit('update:isShowGender', false)
    },

    // 保存性别
    onChange(picker, value, index) {
      this.b = index
    },
    onCancel() {
      this.$parent.$parent.isShowGender = false
    }
  }
}
</script>

<style></style>
