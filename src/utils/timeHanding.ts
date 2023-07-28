// 补零
export function complementaryZeroes(
  val: number | string,
  digits: number
): string {
  return '0'.repeat(digits).concat(val.toString())
}

// 秒转时分秒
export function secondsToHms(seconds: number) {
  seconds = Math.floor(seconds)
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = (seconds % 3600) % 60
  return [h, m, s]
}

function addZeros(val: number): string {
  return val.toString().length < 2
    ? complementaryZeroes(val, 1)
    : val.toString()
}

export function formatCallDuration(val: number): string {
  const [h, m, s] = secondsToHms(val)
  return `${addZeros(h)}:${addZeros(m)}:${addZeros(s)}`
}
