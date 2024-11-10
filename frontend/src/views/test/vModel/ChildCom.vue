<template>
  <div class="child-com">
    <h5>子组件</h5>
    {{ age }}
    <el-input v-model="searchForm"></el-input>
    <el-button @click="handleClick">change</el-button>
    <!--    <el-input v-model="searchForm.name" placeholder="name"></el-input>
    <el-input v-model="searchForm.age" placeholder="age"></el-input>-->
  </div>
</template>

<script setup lang="ts">
  const searchForm = defineModel<any>('searchForm', {
    required: true,
  })
  const handleClick = () => {
    searchForm.value = 'change'
  }
  const props = defineProps({
    fatherForm: {},
  })
  const { age, name } = toRefs(props.fatherForm)
  import type { SearchTypes } from '@/views/test/vModel/types'
  /* const emit = defineEmits(['update:searchForm'])
  const props = defineProps({
    searchForm: {
      type: Object as PropType<SearchTypes>,
      default: () => {},
    },
  })
  const data = computed({
    get() {
      return props.searchForm
    },
    set(val) {
      emit('update:searchForm', val)
    },
  }) */

  /*  const searchForm = defineModel<SearchTypes>('searchForm', {
    required: true,
  })
  console.log(27, searchForm.value) */
</script>

<style scoped lang="scss">
  .child-com {
    border: solid 1px green;
    padding: 10px;
  }
</style>
