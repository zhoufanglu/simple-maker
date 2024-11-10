<script setup lang="ts">
  import * as echarts from 'echarts'
  import { ref, onMounted } from 'vue'

  const echartPie = ref(null)
  let chart: any = ref(null)

  const data = [
    { value: 1048, name: 'Search Engine' },
    { value: 735, name: 'Direct' },
    { value: 580, name: 'Email' },
    { value: 484, name: 'Union Ads' },
    { value: 300, name: 'Video Ads' },
  ]
  // 指定图表的配置项和数据
  let opt = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
      label: {
        show: true, // 显示数据标签
      },
    },
    series: [
      {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar',
        label: {
          show: true, // 显示数据标签
          position: 'top', // 数据标签位置，可以是 'top'、'inside' 等
        },
      },
    ],
  }

  onMounted(() => {
    chart.value = echarts.init(echartPie.value)
    chart.value.setOption(opt)
  })

  function reloadBar(data: any) {
    opt.xAxis.data = data.keys
    opt.series[0].data = data.values
    chart.value.setOption(opt)
  }
  defineExpose({
    reloadBar,
  })
</script>
<template>
  <div ref="echartPie" class="echart-pie"> echarts </div>
</template>

<style scoped lang="scss">
  .echart-pie {
    width: 500px;
    height: 500px;
  }
</style>
