declare global {
  /**
   * 全局自定义环境变量的类型声明
   */
  interface ImportMetaEnv {
    readonly VITE_APP_WEB_URL: string // 接口请求地址
  }
  /**
   * Window 的类型提示
   */
  interface Window {
    // Global vue app instance
    APP_NAME: string
  }
}
export {}
