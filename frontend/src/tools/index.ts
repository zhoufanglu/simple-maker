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
