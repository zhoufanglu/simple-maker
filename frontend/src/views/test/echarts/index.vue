<script setup lang="ts">
  import Pie from './Pie.vue'
  import Bar from './Bar.vue'
  import { useGenerate } from './useGenerate'
  import { watch } from 'vue'
  const { data, keys, generatePieData, generateBarData } = useGenerate()
  const pieRef = ref()
  const barRef = ref()
  // key value绑定值
  const curKey = ref('')
  const curValue = ref()
  // 监听改变
  const pieData = ref()
  const barData = ref()
  watch([() => curKey.value, () => curValue.value], () => {
    if (curKey.value && curValue.value) {
      // 重新生成pie-data
      pieData.value = generatePieData(data, curKey.value, curValue.value)
      pieRef.value.reloadPie(pieData.value)
      // 重新生成bar-data
      barData.value = generateBarData(data, curKey.value, curValue.value)
      barRef.value.reloadBar(barData.value)
    }
  })
</script>
<template>
  <div class="chart-component">
    <h4>数据</h4>
    <ul>
      <li v-for="(i, index) in data" :key="index">{{ i }}</li>
    </ul>
    <h4>选择渲染的属性</h4>
    <div>
      <h5>绑定的key:</h5>
      <el-radio-group v-model="curKey">
        <el-radio v-for="(item, index) in keys" :key="index" :label="item">{{ item }}</el-radio>
      </el-radio-group>
    </div>
    <div>
      <h5>绑定的value:</h5>
      <el-radio-group v-model="curValue">
        <el-radio v-for="(item, index) in keys" :key="index" :label="item">{{ item }}</el-radio>
      </el-radio-group>
    </div>
    <div>
      <h5>生成的渲染数据</h5>
      {{ pieData }}
    </div>
    <Pie ref="pieRef"></Pie>
    <Bar ref="barRef"></Bar>
  </div>
</template>

<style scoped lang="scss">
  .chart-component {
    padding: 20px;
    box-sizing: border-box;
    overflow-y: auto;
    height: 100%;
    border: solid 1px red;
  }
</style>
