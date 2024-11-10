<template>
  <div class="v-model-test">
    <h4>父组件</h4>
    <el-input v-model="fatherForm.name"></el-input>
    <el-input v-model="fatherForm.age"></el-input>
    <child-com v-model:searchForm="searchForm" :father-form="fatherForm"></child-com>
    <el-button @click="handleLog">log</el-button>
    {{ value1 }}
    <el-date-picker
      v-model="value1"
      type="monthrange"
      range-separator="To"
      start-placeholder="Start month"
      end-placeholder="End month"
    />
    <el-button @click="openDialog({ id: 1 })">open confirm dialog</el-button>
  </div>
</template>

<script setup lang="ts">
  import ChildCom from './ChildCom.vue'
  import type { SearchTypes } from '@/views/test/vModel/types'
  import confirmDialog, { ConfirmDialogParamsType } from '@/tools/confirmDialog'
  const searchForm = reactive<SearchTypes>({
    name: '',
    age: 0,
  })
  const handleLog = () => {
    console.log(17, searchForm)
  }
  const fatherForm = reactive({
    name: '',
    age: 10,
  })
  /** ********************日期***********************/
  const value1 = ref('')
  const rangeTime = () => {
    const millisecondsInDay = 24 * 60 * 60 * 1000 // 1天的毫秒数
    const daysInMonth = 30.44 // 一个月的平均天数
    const numberOfMonths = 12 // 12个月

    const millisecondsIn12Months = millisecondsInDay * daysInMonth * numberOfMonths
    return Date.now() + millisecondsIn12Months
  }

  const disabledDate = (time: Date) => {
    return time.getTime() > rangeTime()
  }

  /* watch(value1, (newDateRange) => {
    const [startDate, endDate] = newDateRange
    if (startDate && endDate) {
      const maxDate = new Date(startDate)
      maxDate.setMonth(maxDate.getMonth() + 12)
      if (endDate > maxDate) {
        // 如果选择的结束日期超过了最大范围，将其设置为最大范围
        value1.value[1] = maxDate
      }
    }
  }) */
  /** ********************dialog test***********************/
  const deleteItem = (params: { id: number }): Promise<string> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // resolve('接口响应完毕')
        reject('dsd')
      }, 2000)
    })
  }

  const openDialog = (params: { id: number }) => {
    confirmDialog({ operateFunction: deleteItem, params } as ConfirmDialogParamsType<{
      id: number
    }>).then(() => {})
  }
</script>

<style scoped lang="scss">
  .v-model-test {
    padding: 30px;
    border: solid 1px red;
  }
</style>
