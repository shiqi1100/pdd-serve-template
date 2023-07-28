import { RequestConfig } from 'pdd'
import md5 from 'md5'

export interface Next {
  (response: RequestConfig): void
}

// 响应服务
export default class RequestMiddleware {
  /**
   * 响应中间件入口方法
   * @param request
   * @param next
   */
  handle(request: RequestConfig, next: Next) {
    try {
      const guard = this.guard(request)
      return next(guard)
    } catch (e) {
      console.warn(e)
    }
  }

  /**
   * 中间件守卫
   * @param request
   */
  guard(request: RequestConfig) {
    const token = localStorage.getItem('_BDSAAS_TOKEN') || 'TOKEN'
    const authorization = 'Bearer ' + token
    const timestamp = new Date().getTime()
    const xwsse = md5(`token${token}timestamp${timestamp}`)
    if (token !== 'TOKEN') {
      request.headers = {
        ...request.headers,
        authorization,
        timestamp,
        xwsse
      }
    }
    return request
  }
}
