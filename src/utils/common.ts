// 秒转时分秒
import qs from 'qs'

export function secondsToHms(seconds: number) {
  seconds = Math.floor(seconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = (seconds % 3600) % 60
  return { h, m, s }
}

export function complementaryZeroes(
  val: number | string,
  digits: number
): string {
  return '0'.repeat(digits).concat(val.toString())
}

export function addZeros(val: number): string {
  return val.toString().length < 2
    ? complementaryZeroes(val, 1)
    : val.toString()
}

export function getNext(list: any[], current: unknown) {
  let index = list.findIndex(item => item === current)
  if (index > -1 && index < list.length - 1) {
    return list[++index]
  }
}

// 下载文件
export function downloadFile(url: string, params?: Record<string, any>) {
  window.open(
    `${url}${params ? '?'.concat(qs.stringify(params)) : ''}`,
    '_blank'
  )
}
