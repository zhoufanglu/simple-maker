/**
 * 延时函数
 * @param ms
 */
export function sleep(ms = 2000): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * 给url上拼上参数
 * @param url
 * @param params
 */
export function appendParamsToUrl(url: string, params: any) {
  const queryString = new URLSearchParams(params).toString()

  const separator = url.includes('?') ? '&' : '?'

  return url + separator + queryString
}

export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>

  return function (...args: Parameters<T>) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this

    clearTimeout(timeout)
    timeout = setTimeout(() => {
      func.apply(context, args)
    }, wait)
  }
}

export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 监听文件读取完成事件
    reader.onload = () => {
      resolve(reader.result as string) // 结果是 Base64 字符串
    }

    // 监听文件读取错误事件
    reader.onerror = (error) => {
      reject(error)
    }

    // 开始读取文件
    reader.readAsDataURL(file)
  })
}
