<template>
  <div>
    <van-nav-bar
      class="navbar"
      title="标题"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 修改头像 -->
    <input
      type="file"
      hidden
      ref="file"
      accept=".png,jpg,.pdf"
      @change="selectPhoto"
    />
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image
        round
        width="0.8rem"
        height="0.8rem"
        :src="avator ? avator : infoData.photo"
      />
    </van-cell>
    <van-popup
      v-model="isShowPhoto"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-avator
        :photo="photo"
        v-if="isShowPhoto"
        :avator.sync="avator"
      ></update-avator
    ></van-popup>

    <!-- 修改昵称 -->
    <van-cell title="昵称" is-link @click="isShowName = true">
      {{ infoData.name }}
    </van-cell>
    <van-popup
      v-model="isShowName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <update-nickname
        :isShowName.sync="isShowName"
        :InfoName="infoData"
        v-if="isShowName"
      ></update-nickname>
    </van-popup>

    <!-- 修改性别 -->
    <van-cell title="性别" is-link @click="isShowGender = true">
      {{ infoData.gender === 0 ? '男' : '女' }}
    </van-cell>
    <van-popup
      position="bottom"
      v-model="isShowGender"
      :style="{ height: '40%' }"
    >
      <update-gender
        :isShowGender.sync="isShowGender"
        :InfoGender="infoData"
        v-if="isShowGender"
      ></update-gender>
    </van-popup>

    <!-- 修改生日 -->
    <van-cell title="生日" is-link @click="isShowBirthday = true">
      {{ infoData.birthday }}
    </van-cell>
    <van-popup
      position="bottom"
      v-model="isShowBirthday"
      :style="{ height: '50%' }"
    >
      <update-birthday
        :isShowBirthday.sync="isShowBirthday"
        :infoData="infoData"
      ></update-birthday>
    </van-popup>
  </div>
</template>

<script>
// 3. 将file对象转化成base64
// FileReader:文件阅读器
// const fr=new FileReader(); fr.readAsDateURL(file)
// 接收读取的结果：fr.onload=(e)=>{e.target.result /* base64 */}
import UpdateAvator from './component/UpdateAvator.vue'
import UpdateNickname from './component/UpdateNickname.vue'
import UpdateGender from './component/UpdateGender.vue'
import UpdateBirthday from './component/UpdateBirthday.vue'
import { resolveToBase64 } from '@/utils'
import { getProfileAPI } from '@/api/user'
export default {
  data() {
    return {
      isShowPhoto: false,
      photo: '',
      avator: '',
      isShowName: false,
      isShowGender: false,
      isShowBirthday: false,
      infoData: {}
    }
  },
  components: {
    UpdateAvator,
    UpdateNickname,
    UpdateGender,
    UpdateBirthday
  },
  created() {
    this.getProfile()
  },
  methods: {
    async selectPhoto() {
      // 获取到用户选择的图片的file对象
      const file = this.$refs.file.files[0]
      // file对象转成img.src可识别的属性.
      // file对象转成base64
      const base64 = await resolveToBase64(file)
      // 传递base64给子组件
      this.photo = base64
      // 打开弹窗
      this.isShowPhoto = true
      // 解决不能连续选中同一张图片的bug
      this.$refs.file.value = ''
    },

    // 获取个人资料
    async getProfile() {
      const { data } = await getProfileAPI()
      this.infoData = data.data
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
.van-popup {
  overflow: hidden;
}
</style>
