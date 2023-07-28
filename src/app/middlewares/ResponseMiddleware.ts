import { Exception, Lib } from 'pdd'

type TNext = (arg?: any) => void

type TCallback = (response: IResponse, next: TNext) => void

export interface IResponse {
  data: Record<any, any>
  status: number
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
    if (this._response.status !== 200) {
      console.warn('Response StatusCode warn')
      throw new Exception('Response Error', `${this._response.status}`)
    }
    if (Lib.isObject(this._response.data)) {
      this._response.data = {
        statusCode:
          this._response.data.statusCode ?? this._response.data.rspCode,
        rspCode: this._response.data.statusCode ?? this._response.data.rspCode,
        msg: this._response.data.msg ?? this._response.data.rspMsg,
        rspMsg: this._response.data.msg ?? this._response.data.rspMsg,
        data: this._response.data.data ?? null,
        timestamp: this._response.data.timestamp ?? new Date().getTime()
      }
    }
    callback(this._response, () => {})
    return this._response
  }
}
