import type { Ref } from 'vue'

interface PaginationType {
  pageNo: number
  pageSize: number
  total: number
}
// Api接口返回类型
export interface ResponseDataType<T = any> {
  data: T
  meta: { total: number }
}
// 列表返回对象类型
export interface ListVariablesType<T> {
  list: T[]
  pagination: PaginationType
  loading: boolean
}

export interface OptionsType<T> {
  filterOption?: Object
  transformFn?: (data: T[]) => T[]
  preRequest?: (...args: any[]) => void // 请求前的请求
  immediate?: boolean
}
