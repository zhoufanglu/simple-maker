// @ts-ignore
import Mock from 'mockjs'

export function useGenerate() {
  function generateRandomList() {
    const len = Mock.Random.integer(5, 10)
    const list: any = []

    const obj: any = {}
    const numProperties = Mock.Random.integer(3, 5) // 随机生成 1 到 5 个属性
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'
    // 生成单个对象案例
    for (let i = 0; i < numProperties; i++) {
      const key = alphabet.charAt(Mock.Random.integer(0, 25)) // 随机生成 a 到 z 之间的字母

      if (i === 0) {
        obj[key] = Mock.Random.integer(1, 100) // 第一个属性的值为随机的数字
      } else {
        obj[key] = Mock.Random.word() // 其他属性的值随机生成
      }
    }
    // 生成数组
    for (let i = 0; i < len; i++) {
      const tempObj = JSON.parse(JSON.stringify(obj))
      for (const key in tempObj) {
        if (typeof tempObj[key] === 'string') {
          tempObj[key] = Mock.Random.word()
        } else {
          tempObj[key] = Mock.Random.integer(1, 100)
        }
      }
      list.push(tempObj)
    }
    return list
  }
  const list = generateRandomList()

  // 输出结果
  console.log(JSON.stringify(list, null, 10))
  // 获取对象的key
  const keys = Object.keys(list[0])

  function generatePieData(data: any[], key: string, value: string) {
    const pieData: any = []
    data.forEach((i) => {
      const obj: any = {}
      obj.name = i[key]
      obj.value = i[value]
      pieData.push(obj)
    })
    return pieData
  }

  function generateBarData(data: any[], key: string, value: string) {
    const keys = data.map((i) => i[key])
    const values = data.map((i) => i[value])
    return {
      keys,
      values,
    }
  }

  return {
    data: list,
    keys,
    generatePieData,
    generateBarData,
  }
}
