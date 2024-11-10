<script setup lang="ts">
  import type { PropType } from 'vue'
  import BtnRow from '@/views/error-page/BtnRow.vue'
  import { useErrorPage } from '@/views/error-page/useErrorPage'
  import Motion from '@/components/motion'

  const props = defineProps({
    pageType: {
      type: String as PropType<'401' | '430' | '404' | 'timeout'>,
      default: '403',
    },
  })
  const { errorEnum, curImg } = useErrorPage(toRef(props, 'pageType'))
</script>

<template>
  <div class="error-page">
    <div class="content">
      <!-- ?图片 -->
      <img :src="curImg" alt="" />
      <!-- ?文案 -->
      <Motion>
        <p>{{ errorEnum[pageType].text }}</p>
        <!-- ?按钮 -->
        <div class="btn-row">
          <!--        :v-node="errorEnum[pageType]" -->
          <BtnRow :dom="errorEnum[pageType].render" />
        </div>
      </Motion>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .error-page {
    @include vertical-center;

    height: 100%;

    .content {
      width: 400px;
      margin-top: -200px;
      display: flex;
      flex-direction: column;
      align-items: center;

      img {
        width: 280px;
        height: 240px;
      }

      p {
        margin: 24px 0 40px;
        white-space: nowrap;
      }

      .btn-row {
        @include vertical-center;
      }
    }
  }
</style>
