import { ElMessageBox } from 'element-plus'
import { h } from 'vue'

export interface ConfirmDialogParamsType<T = any> {
  title?: string
  row1?: string
  row2?: string
  loading?: boolean
  params?: T
  operateFunction?: (params: T) => Promise<any>
}

/**
 * 确认对话框
 * @param title  标题
 * @param row1 第一行内容
 * @param row2 第二行内容
 * @param operateFunction 关闭前响应的事件
 * @param params 关闭前响应的事件的入参
 */
function confirmDialog({
  title = '确认删除',
  row1 = '确认删除？',
  row2 = '',
  params = {},
  operateFunction,
}: ConfirmDialogParamsType = {}) {
  return ElMessageBox.confirm(h('ul', null, [h('li', null, row1), h('li', null, row2)]), title, {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'info',
    beforeClose: (action, instance, done) => {
      if (operateFunction) {
        instance.confirmButtonLoading = true
        operateFunction(params).finally(() => {
          // 等待接口响应
          instance.confirmButtonLoading = false
          done()
        })
      } else {
        done()
      }
    },
  })
}

export default confirmDialog
