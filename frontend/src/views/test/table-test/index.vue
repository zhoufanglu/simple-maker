<script setup lang="ts">
  import { ref } from 'vue'
  const tableData = ref<any>([
    {
      date: '2016-05-03',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
    {
      date: '2016-05-02',
      name: 'Tom',
      address: 'No. 189, Grove St, Los Angeles',
    },
  ])

  const columns: any = ref([
    {
      label: 'date',
      prop: 'date',
      type: 'input',
      componentName: 'ElInput',
    },
    {
      label: 'name',
      prop: 'name',
      type: 'select',
      componentName: 'ElSelect',
    },
  ])

  const opts = [{ label: 'a', value: 'a' }]

  const handleInput = (val: Event, index: number, prop: string) => {
    console.log(val, index, prop)
  }
  const handleChange = () => {
    console.log('handleChange')
  }
</script>
<template>
  <div class="">
    <ul>
      <li v-for="i in tableData" :key="i.label">{{ i }}</li>
    </ul>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(col, index) in columns"
        :key="index"
        :prop="col.prop"
        :label="col.label"
      >
        <template #default>
          <!--          <el-input v-if="col.type === 'input'" v-model="tableData[index].date"></el-input>
          <el-select v-if="col.type === 'select'" v-model="tableData[index].name"></el-select>-->
          <component
            :is="col.componentName"
            v-model="tableData[index][col.prop]"
            @input="handleInput($event, index, col.prop)"
            @change="handleChange"
          >
          </component>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<style scoped lang="scss">
  .test {
  }
</style>
