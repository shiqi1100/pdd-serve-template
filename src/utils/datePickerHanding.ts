import { ref } from 'vue'

const firstSelectedDayRef = ref(null)
const onWeek = 1000 * 60 * 60 * 24 * 30
export const calendar = (date: any) => {
  const [minDate, maxDate] = date
  if (minDate && !maxDate) {
    firstSelectedDayRef.value = minDate //记录选中的首个日期
  } else {
    firstSelectedDayRef.value = null
  }
}

// 禁止时间选择范围
export const isDisabled = (time: any) => {
  const firstSelectedDay = firstSelectedDayRef.value as any
  if (firstSelectedDay) {
    return (
      time.getTime() < firstSelectedDay.getTime() - onWeek ||
      time.getTime() > firstSelectedDay.getTime() + onWeek ||
      time.getTime() > new Date().getTime()
    )
  }
  return time.getTime() > new Date().getTime()
}
