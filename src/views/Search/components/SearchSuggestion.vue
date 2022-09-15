<template>
  <div>
    <van-cell
      :title="item"
      icon="search"
      v-for="(item, index) in hightLightSuggestions"
      :key="index"
      @click="$emit('change-keywords', Suggestions[index])"
    >
      <template #title>
        <span v-html="item"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionsAPI } from '@/api'
import { debounce } from 'lodash'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      Suggestions: []
    }
  },
  watch: {
    keywords: {
      immediate: true,
      handler: 'getSuggestions'
    }
  },
  computed: {
    hightLightSuggestions() {
      const reg = new RegExp(this.keywords, 'ig')
      return this.Suggestions.map((str) => {
        return str.replace(
          reg,
          (match) => `<span style="color:red;">${match}</span>`
        )
      })
    }
  },
  methods: {
    getSuggestions: debounce(async function () {
      try {
        const { data } = await getSuggestionsAPI(this.keywords)
        this.Suggestions = data.data.options.filter(Boolean)
      } catch (error) {
        if (error.response) {
          this.$toast.fail('请刷新后重试')
        } else {
          throw error
        }
      }
    }, 300)
  }
}
</script>

<style></style>
