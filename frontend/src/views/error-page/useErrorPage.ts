import { ElButton } from 'element-plus'

function useErrorPage(pageType: Ref) {
  const router = useRouter()
  // ?图片模块
  const ms: any = import.meta.glob('@/assets/imgs/error-page/*.png', { eager: true })
  const modules: any = {}
  Object.keys(ms).forEach((key) => {
    const index = key.split('/')[5].slice(0, -4)
    modules[index] = ms[key].default
  })
  const curImg = modules[pageType.value]

  // ?操作模块
  const operateEnum = {
    refresh: () => {
      location.reload()
    },
    returnPIPE: () => {
      location.href = import.meta.env.VITE_PIPE_PATH
    },
    closePage: () => {
      router.go(-2)
    },
    goHome: () => {
      router.push('/')
    },
    goLogin: () => {
      router.push('/login')
    },
  }
  const handleOperate = (
    operate: 'refresh' | 'returnPIPE' | 'closePage' | 'goHome' | 'goLogin',
  ) => {
    operateEnum[operate]()
  }
  const errorEnum = {
    401: {
      text: '您的账号没有通过认证，请联系管理员开通',
      render: () =>
        h('div', {}, [
          h(ElButton, { onClick: () => handleOperate('refresh') }, '刷新页面'),
          h(ElButton, { onClick: () => handleOperate('goLogin'), type: 'primary' }, '返回登录'),
        ]),
    },
    403: {
      text: '您暂无权限查看此页面',
      render: () => () =>
        h('div', {}, [
          h(ElButton, { onClick: () => handleOperate('closePage'), type: 'primary' }, '关闭页面'),
        ]),
    },
    404: {
      text: '您访问的页面不存在，请稍候刷新页面或者返回首页',
      render: () =>
        h('div', {}, [
          h(ElButton, { onClick: () => handleOperate('refresh') }, '刷新页面'),
          h(ElButton, { onClick: () => handleOperate('goHome'), type: 'primary' }, '返回首页'),
        ]),
    },
    timeout: {
      text: '您访问的网站请求超时，请稍候刷新页面',
      render: () =>
        h('div', {}, [
          h(ElButton, { onClick: () => handleOperate('refresh'), type: 'primary' }, '刷新页面'),
        ]),
    },
  }
  return {
    curImg,
    errorEnum,
    operateEnum,
    handleOperate,
  }
}
export { useErrorPage }
