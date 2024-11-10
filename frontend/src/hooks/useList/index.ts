import { reactive, ref, watch } from 'vue'
import { pick } from 'lodash'
import { ElMessage } from 'element-plus'
import type { ListVariablesType, OptionsType } from '@/hooks/useList/types'
/**
 * @param listRequestFn  请求接口函数
 * @param options 配置项
 */
const useList = <ItemType>(listRequestFn: any, options: OptionsType<ItemType> = {}) => {
  const {
    preRequest,
    filterOption = reactive({}),
    transformFn = undefined,
    immediate = true,
  } = options
  // 定义抛出的变量
  const listVariables: ListVariablesType<ItemType> = reactive({
    loading: false,
    list: [],
    pagination: {
      pageNo: 1,
      total: 0,
      pageSize: 10,
    },
  })
  const getListData = async () => {
    listVariables.loading = true
    const params = {
      // 分页数据
      ...pick(listVariables.pagination, ['pageNo', 'pageSize']),
      // 过滤数据
      ...filterOption,
    }
    const { data, total }: { data: ItemType[]; total: number } = await listRequestFn(params)
    try {
      // 请求之前的一些请求
      preRequest?.()
      // 格式化一下数据
      // TODO: 返回类型怎么玩
      listVariables.list = transformFn ? transformFn(data) : data
      listVariables.loading = false
      listVariables.pagination.total = total
    } catch (e: any) {
      ElMessage.error(e)
      console.log('请求列表出错：', e)
    } finally {
      listVariables.loading = false
    }
  }

  const resetListData = async () => {
    listVariables.pagination.pageNo = 1
    listVariables.pagination.pageSize = 10
    if (!filterOption) return false

    const keys = Reflect.ownKeys(filterOption)
    keys.forEach((key) => {
      Reflect.set(filterOption!, key, undefined)
    })
    await getListData()
  }

  // 判断是否立即请求
  if (immediate) {
    getListData()
  }
  // 响应分页
  watch(
    [() => listVariables.pagination.pageNo, () => listVariables.pagination.pageSize],
    async () => {
      await getListData()
    },
  )

  return {
    getListData,
    resetListData,
    listVariables,
  }
}

export default useList
