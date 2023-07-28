import AxiosHttp from '@/utils/axios-http/http'

export default new AxiosHttp({
  baseURL: window.origin,
  timeout: 60 * 1000
})
