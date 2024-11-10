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
