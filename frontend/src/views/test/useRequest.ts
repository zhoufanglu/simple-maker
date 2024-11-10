// import api from '@/service/api'
export function useRequest() {
  const getTest = async () => {
    const params = {
      name: 'abc',
      age: 18,
      list: [1, 2, 3],
    }
    /* const { data } = await api.user.testB(params)
    console.log(5, data) */
  }
  return {
    getTest,
  }
}
