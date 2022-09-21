<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('update:isShowBirthday', false)"
      @confirm="UpdateNickname"
    >
    </van-datetime-picker>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { savePersonalDataAPI } from '@/api/user'
export default {
  name: 'UpdateBirthday',
  props: {
    infoData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      date: this.infoData,
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2022, 10, 1),
      currentDate: new Date(this.infoData.birthday)
    }
  },
  methods: {
    /* eslint-disable */
    async UpdateNickname(value) {
      this.date.birthday = dayjs(value).format('YYYY-MM-DD')
      try {
        await savePersonalDataAPI(this.date)
      } catch (error) {
        if (error.reponse && error.reponse.status === 401) {
          this.$toast.fail('用户认证失败，请重新登录')
        } else {
          throw error
        }
      }
      this.$emit('update:isShowBirthday', false)
    }
  }
}
</script>

<style></style>
