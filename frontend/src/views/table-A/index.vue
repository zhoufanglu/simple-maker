<template>
  <div class="p-table-A">
    table---a
    <div class="filter-row">
      <el-input v-model="filters.name" placeholder="名字"></el-input>
      <el-input v-model="filters.age" placeholder="年龄"></el-input>
      <el-button @click="getListData()">请求</el-button>
      <el-button @click="resetListData()">重置</el-button>
    </div>
    <el-table v-loading="listVariables.loading" :data="listVariables.list" style="width: 100%">
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="age" label="Age" />
    </el-table>
    <el-pagination
      v-model:current-page="listVariables.pagination.pageNo"
      v-model:page-size="listVariables.pagination.pageSize"
      background
      layout="prev, pager, next, sizes"
      :page-sizes="[1, 20, 30]"
      :total="listVariables.pagination.total"
    />
    <!--    @current-change="handleCurrentChange"-->
  </div>
</template>

<script setup lang="ts">
  import { onMounted, toRefs, ref, reactive } from 'vue'
  import useList from '@/hooks/useList'
  interface UserType {
    name: string
    age: number
  }
  const filters = reactive({
    name: 'a',
    age: null,
  })
  const { getListData, resetListData, listVariables } = useList<UserType>(api.user.testB, {
    filterOption: filters,
    transformFn: (data) => {
      return data.map((item) => {
        return {
          name: item.name,
          age: item.age + 1,
        }
      })
    },
  })
  /*  const handleCurrentChange = (val) => {
    // console.log(33, val)
  } */
</script>

<style scoped lang="scss">
  .p-table-A {
    border: solid 1px red;
    padding: 20px;
    .filter-row {
      @include vertical-center;
      border: solid 1px green;
      padding: 10px;
    }
  }
</style>
