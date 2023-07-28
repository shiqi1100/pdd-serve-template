import md5 from 'md5'

export function useToken() {
  return localStorage.getItem('_BDSAAS_TOKEN') || ''
}

export function useCompanyId() {
  return localStorage.getItem('_BDSAAS_COMPANY_ID') || ''
}

export function useUserInfo() {
  return JSON.parse(localStorage.getItem('_BDSAAS_userInfo') || '{}')
}

export function useCompanyName() {
  return useUserInfo().companyName || ''
}

export function useUploadUrl() {
  return `${window.origin}/base-oss-rest/oss/uploadFile`
}

export function useProfileId() {
  return useUserInfo().profileId || ''
}

export function useProfileName() {
  return useUserInfo().companyRealName || ''
}

export function useAuthList(): string[] {
  try {
    return JSON.parse(localStorage.getItem('_BDSAAS_authList') as string) || []
  } catch (e) {
    console.warn('_BDSAAS_authList has no value in localStorage!')
    return []
  }
}

export function hasAuth(authKey: string) {
  const authList = useAuthList()

  return authList.includes(authKey)
}

export function useServerTimeMs() {
  return localStorage.getItem('SERVER_TIME_MS')
}

// X-WS-Security
export function useXWSSecurity() {
  const token = useToken()
  // const timestamp = useServerTimeMs() || new Date().getTime()
  const timestamp = new Date().getTime()

  return {
    xwsse: md5(`token${token}timestamp${timestamp}`),
    timestamp
  }
}
