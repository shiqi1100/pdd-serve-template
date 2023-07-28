import axios, { AxiosRequestConfig, AxiosInstance } from 'axios'
import { CreateAxiosDefaults } from 'axios'
import qs from 'qs'
import {
  useCompanyId,
  useProfileId,
  useProfileName,
  useToken,
  useXWSSecurity
} from '@/hooks/user-info'
import { ElMessage } from 'element-plus'
import {
  useResponseInterceptors,
  useResponseRejectedInterceptors
} from '@/utils/axios-http/hooks'

type ResponseDataWrapper<T = any> = {
  data: T
  code: number
  msg: string
}

export default class AxiosHttp {
  private readonly axiosInstance: AxiosInstance

  constructor(config: CreateAxiosDefaults) {
    this.axiosInstance = axios.create(config)
    this.initInterceptors()
  }

  initInterceptors() {
    this.axiosInstance.interceptors.request.use(
      config => {
        const { xwsse, timestamp } = useXWSSecurity()
        config.headers.Authorization = `Bearer ${useToken()}`
        config.headers.xwsse = xwsse
        config.headers.timestamp = timestamp
        // 几乎所有接口都需要额外参数，在这里统一处理统一传，后端按需取
        const lowerCaseMethod = config.method?.toLowerCase()
        if (lowerCaseMethod === 'get') {
          config.params = {
            ...config.params,
            companyId: useCompanyId(),
            profileId: useProfileId(),
            profileName: useProfileName()
          }
        } else {
          config.data = {
            ...config.data,
            companyId: useCompanyId(),
            profileId: useProfileId(),
            profileName: useProfileName()
          }
        }
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    this.axiosInstance.interceptors.response.use(
      config => useResponseInterceptors(config),
      error => useResponseRejectedInterceptors(error)
    )
  }

  request<T = any, R = ResponseDataWrapper<T>>(config: AxiosRequestConfig) {
    return new Promise<R>((resolve, reject) => {
      this.axiosInstance
        .request<R>(config)
        .then(res => resolve(res.data))
        .catch(err => reject(err))
    })
  }

  get<T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ) {
    config = {
      url,
      params,
      method: 'GET',
      ...config
    }
    return this.request<T>(config)
  }

  post<T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ) {
    config = {
      url,
      data,
      method: 'POST',
      // 使外部调用传入的 config 优先级最高
      ...config
    }
    return this.request<T>(config)
  }

  postForm<T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ) {
    config = {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      url,
      data,
      method: 'POST',
      ...config
    }
    return this.request<T>(config)
  }

  postJson<T = any>(
    url: string,
    data: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ) {
    config = {
      headers: {
        'Content-Type': 'application/json'
      },
      url,
      data,
      method: 'POST',
      ...config
    }
    return this.request<T>(config)
  }

  download(url: string, params: Record<string, any>) {
    window.open(
      `${url}${params ? '?'.concat(qs.stringify(params)) : ''}`,
      '_blank'
    )
  }

  upload(
    url: string,
    file: File,
    fieldName = 'file',
    config?: AxiosRequestConfig
  ) {
    config = {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }

    const data = { [fieldName]: file }
    return this.post(url, data, config)
  }
}
