import { useHomeStore } from '@/store/home'
import type { ImgItem, RankingItem } from '@/views/home/types'
import type { MessageApiInjection } from 'naive-ui/es/message/src/MessageProvider'

type TemplateData = {
  rankingRows: RankingItem[]
  images: ImgItem[]
  title: string
  cardSize: 'small' | 'normal' | 'large'
}

type TemplatePayload = {
  version: number
  exportedAt: string
  data: TemplateData
}

const TEMPLATE_VERSION = 1

const sanitizeFileName = (name: string) => {
  const sanitized = name
    .trim()
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)

  return sanitized || 'template'
}

const deepClone = <T>(value: T): T => JSON.parse(JSON.stringify(value)) as T

export const useExportAndImport = (message: MessageApiInjection) => {
  const homeStore = useHomeStore()
  const templateInputRef = ref<HTMLInputElement | null>(null)

  const getTemplateData = (): TemplateData => {
    return {
      rankingRows: deepClone(homeStore.rankingRows),
      images: deepClone(homeStore.images),
      title: homeStore.title,
      cardSize: homeStore.cardSize,
    }
  }

  const handleExport = () => {
    try {
      const payload: TemplatePayload = {
        version: TEMPLATE_VERSION,
        exportedAt: new Date().toISOString(),
        data: getTemplateData(),
      }

      const blob = new Blob([JSON.stringify(payload, null, 2)], {
        type: 'application/json;charset=utf-8',
      })
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      const date = new Date().toISOString().replace(/[.:]/g, '-')
      const title = sanitizeFileName(homeStore.title || 'template')
      link.href = url
      link.download = `${title}-${date}.json`
      document.body.appendChild(link)
      link.click()
      link.remove()
      URL.revokeObjectURL(url)

      message.success('模板导出成功')
    } catch (error) {
      console.error(error)
      message.error('模板导出失败')
    }
  }

  const isCardSize = (size: unknown): size is 'small' | 'normal' | 'large' => {
    return size === 'small' || size === 'normal' || size === 'large'
  }

  const normalizeTemplateData = (raw: unknown): TemplateData | null => {
    if (!raw || typeof raw !== 'object') return null
    const maybePayload = raw as Partial<TemplatePayload> & Record<string, unknown>

    if (typeof maybePayload.version === 'number' && maybePayload.version > TEMPLATE_VERSION) {
      message.error('模板版本过高，请更新应用后重试')
      return null
    }

    const source =
      maybePayload.data && typeof maybePayload.data === 'object' ? maybePayload.data : maybePayload

    if (!Array.isArray(source.images) || !Array.isArray(source.rankingRows)) {
      return null
    }

    const images = source.images
      .filter((item: any) => item && typeof item.path === 'string')
      .map((item: any) => ({
        path: item.path,
        name: typeof item.name === 'string' ? item.name : '',
      }))

    const rankingRows = source.rankingRows
      .filter((row: any) => row && typeof row === 'object' && Array.isArray(row.items))
      .map((row: any, index: number) => ({
        id: typeof row.id === 'string' && row.id ? row.id : `import-${Date.now()}-${index}`,
        levelName:
          typeof row.levelName === 'string' && row.levelName ? row.levelName : `${index + 1}`,
        bgColor: typeof row.bgColor === 'string' && row.bgColor ? row.bgColor : '#69C0FF',
        borderColor:
          typeof row.borderColor === 'string' && row.borderColor
            ? row.borderColor
            : 'rgba(105, 192, 255, 0.2)',
        items: row.items
          .filter((img: any) => img && typeof img.path === 'string')
          .map((img: any) => ({
            path: img.path,
          })),
      }))

    return {
      rankingRows,
      images,
      title: typeof source.title === 'string' && source.title ? source.title : 'template',
      cardSize: isCardSize(source.cardSize) ? source.cardSize : 'small',
    }
  }

  const onTemplateFileChange = async (event: Event) => {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    try {
      if (!file) return
      const text = await file.text()
      const parsed = JSON.parse(text)
      const templateData = normalizeTemplateData(parsed)

      if (!templateData) {
        message.error('模板格式不正确')
        return
      }

      const hasCurrentData = homeStore.rankingRows.length > 0 || homeStore.images.length > 0
      if (hasCurrentData && !window.confirm('导入会覆盖当前模板，确认继续吗？')) {
        return
      }

      homeStore.$patch({
        rankingRows: templateData.rankingRows,
        images: templateData.images,
        title: templateData.title,
        cardSize: templateData.cardSize,
        modeType: 'edit',
      })
      message.success('模板导入成功')
    } catch (error) {
      console.error(error)
      message.error('模板导入失败，请检查文件内容')
    } finally {
      input.value = ''
    }
  }

  const handleImport = () => {
    templateInputRef.value?.click()
  }

  return {
    templateInputRef,
    handleExport,
    handleImport,
    onTemplateFileChange,
  }
}
