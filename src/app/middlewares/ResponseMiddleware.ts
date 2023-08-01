import { Exception, Lib } from 'pdd'

type TNext = (arg?: any) => void

type TCallback = (response: IResponse, next: TNext) => void

export interface IResponse {
  headers: Record<any, any>
  request: Record<any, any>
  response: Record<any, any>
}

// type TResponseDataReturn = {
//   statusCode: number
//   msg: string
//   data: any
//   timestamp: number
// }

// 响应服务
export default class ResponseMiddleWare {
  protected _response: IResponse

  constructor(response: IResponse) {
    // 响应数据
    this._response = response
  }

  handle(callback: TCallback) {
    // 状态码不为200
    const data = this._response.response.data
    const status = this._response.response.status
    if (status !== 200) {
      console.warn('Response StatusCode warn')
      throw new Exception('Response Error', `${status}`)
    }
    if (Lib.isObject(data)) {
      this._response.response.data = {
        rspCode: data?.rspCode,
        rspMsg: data?.rspMsg,
        data: data?.data,
        timestamp: data?.timestamp ?? new Date().getTime()
      }
    }
    callback(this._response, () => {})
    return this._response
  }
}
