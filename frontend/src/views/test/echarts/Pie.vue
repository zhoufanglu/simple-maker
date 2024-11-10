<script setup lang="ts">
  import * as echarts from 'echarts'

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
    title: {
      text: 'Referer of a Website',
      // subtext: 'Fake Data',
      left: 'center',
    },
    tooltip: {
      trigger: 'item',
    },
    legend: {
      orient: 'vertical',
      left: 'left',
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: data,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  }

  onMounted(() => {
    chart = echarts.init(echartPie.value)
    chart.setOption(opt)
  })

  function reloadPie(data: any) {
    opt.series[0].data = data
    chart.setOption(opt)
  }
  defineExpose({
    reloadPie,
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
