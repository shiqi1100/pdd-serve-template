import {
  queryCompanyCallPhoneRecordDetailCommand,
  txVoiceIdentityNewCommand
} from '@/app/commands/CallRecord'
import { ElMessage } from 'element-plus'

// 录音开始转换
export const txVoiceIdentityNew = async (state: any, id: any) => {
  const { status, msg } = await new txVoiceIdentityNewCommand().handle({
    id
  })
  if (status) {
    state.loading = true
    if (state.timer) {
      clearInterval(state.timer)
    }
    let count = 0
    state.timer = setInterval(() => {
      if (state.word || count >= 10) {
        clearInterval(state.timer)
        state.loading = false
      }
      queryCompanyCallPhoneRecordDetail(state, id)
      count++
    }, 1000)
  } else {
    ElMessage({
      message: msg || '转换失败',
      type: 'warning'
    })
  }
}

// 录音开始转换后，轮询查结果
export const queryCompanyCallPhoneRecordDetail = async (
  state: any,
  id: any
) => {
  new queryCompanyCallPhoneRecordDetailCommand()
    .handle({ id })
    .then(res => {
      if (res.status) {
        state.word = res?.data?.recordWordsText || ''
      }
      return res
    })
    .catch(err => {
      console.log(err)
    })
}
