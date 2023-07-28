import { AxiosError, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { redirectWindow } from '@/inhub'

// 仅限相应拦截功能使用
export function getBoolean(val: unknown) {
  return val === 0 || val === '' || !!val
}

// data : null
// rspCode : 80001
// rspMsg : "用户会话无效"

// data : null
// msg : null
// statusCode : 0
// timestamp : 1684747097891

export function useResponseInterceptors(config: AxiosResponse) {
  const data = config.data
  const status = config.status
  const url = config.config.url
  const statusText = config.statusText
  const rspCode = data?.rspCode ?? data?.statusCode
  const msg = data?.msg || data?.rspMsg

  // 有返回数据
  if (getBoolean(data)) {
    if (rspCode === 0) {
      return Promise.resolve(config)
    } else {
      if (rspCode === 80001) {
        permissionExpiration()
      }

      // 自动提示警告
      ElMessage({
        type: 'warning',
        message: msg,
        duration: 2000
      })
      console.warn(`${url} config is `, config)
      return Promise.reject(config)
    }
  } else {
    // 无返回数据
    ElMessage({
      type: 'error',
      message: `${url} 无返回数据`,
      duration: 2000
    })
    console.error(`${url} config is `, config)
    return Promise.reject(config)
  }
}

export function useResponseRejectedInterceptors(error: AxiosError) {
  const url = error.config?.url
  console.error(`${url} config is `, error)
  ElMessage({
    type: 'error',
    message: error.message,
    duration: 2000
  })
  return Promise.reject(error)
}

export function permissionExpiration() {
  // 跳转login写带error=80001
  const qsPath = '/login?error=80001'
  // 保存用户登录信息
  const _account = localStorage.getItem('_account')
  // 清空所有localStorage数据
  localStorage.clear()
  if (_account) {
    localStorage.setItem('_account', _account)
  }
  redirectWindow(qsPath)
}
