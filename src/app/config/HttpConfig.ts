import md5 from 'md5'
// Http Config
import { AxiosAdapter } from 'pdd'
// import DiyAxiosAdapter from '../contracts/DiyAxiosAdapter'
// axios
// @ts-ignore
import axios from 'axios'
// ApiConfig
import ApiConfig from './ApiConfig'
// Middleware
// import RequestMiddleware from '../middlewares/Request'
import ResponseMiddleware from '../middlewares/ResponseMiddleware'
import { useCompanyId, useProfileId, useProfileName, useToken, useXWSSecurity } from '@/hooks/user-info'
import { permissionExpiration } from '@/utils/axios-http/hooks'
import { ElMessage } from 'element-plus'
import RequestMiddleware from '@/app/middlewares/RequestMiddleware'

// import store from '@/store'

export default {
  // Http adapter , Default is AxiosAdapter
  // HTTP_ADAPTER: DiyAxiosAdapter,
  HTTP_ADAPTER: AxiosAdapter,
  /**
   * Http服务核心库
   * 例如 axios/fly.io/uni.request...
   */
  HTTP_LIB: axios,
  // Http Api
  HTTP_API: ApiConfig,
  // Http Host
  HTTP_HOST: window.origin,
  /**
   * 采用RESTFul模式
   * 使用后对路由中使用
   */
  IS_RESTFUL: true,
  /**
   * Content-Type
   * 可设置成 REQUEST_PAYLOAD 和 FORM_DATA Get为 Query String Parameters
   */
  CONTENT_TYPE: 'FORM_DATA', // REQUEST_PAYLOAD / FORM_DATA
  /**
   * 数据携带
   * 目前可设置自动Headers数据和自动REQUEST_PAYLOAD和FORM_DATA，Get为Query String Parameters
   */
  DATA_CARRYING: {
    // Headers数据携带
    REQUEST_HEADERS: {
    },
    // Data数据携带
    REQUEST_DATA: {
      companyId: () => useCompanyId(),
      profileId: () => useProfileId(),
      profileName: () => useProfileName(),
    }
  },
  /**
   * 请求中间件
   * @constructor
   */
  REQUEST_MIDDLEWARE: (request: any) => {
    try {
      return new RequestMiddleware().handle(request, config => {
        return config
      })
    } catch (e) {
      console.log('请求中间件报错', (e as Error).message)
    }
  },
  /**
   * 响应中间件
   * @param response
   * @constructor
   */
  RESPONSE_MIDDLEWARE: (response: any) => {
    try {
      return new ResponseMiddleware(response).handle((response, next) => {
        // 留给业务处理具体事务
        console.log('response--此处可删除', response)
        if (response.data.statusCode === 80001) {
          permissionExpiration()
          console.log('登录过期了请处理你的业务，清空缓存+跳转啥的')
          throw new Error('80001')
        }
        if (response.data.statusCode !== 0) {
          return ElMessage({ message: response.data.msg, type: 'warning' })
        }
        next()
      })
    } catch (e) {
      console.log('处理你的异常后续业务，并终止业务', (e as Error).message)
    }
  }
}
