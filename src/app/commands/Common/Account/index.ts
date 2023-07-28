import { useStore } from '@/store/index.ts'
import MergeCommand from '@/app/commands/MergeCommand'
import { LoginTransformer } from '@/app/commands/Common/Account/transformer'

// type TReturn = { rspCode: number, rspMsg: string, data: any }
// 用户登录
export class LoginCommand extends MergeCommand {
  /**
   * 用户登录 账号密码登录
   * @param {String} username 用户名
   * @param {String} password 密码
   * @param {String} type 登录类型 WEB指平台类型为PC
   * @return {Promise<{}>}
   */
  async handle(username: string, password: string, type = 'WEB') {
    const res = await this.$helper.http('account.login', {
      userName: username,
      passWord: password,
      terminaltype: type,
      // auto 0必须携带否则接口BUG没有任何response
      auto: 0
      // privacyVersion: 'V1.06',
      // userAgreementVersion: 'V1.04',
    })
    const user = useStore()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (res.statusCode === 0) {
      // this.$helper.storage('accessToken', res.data.auth.accessToken)
      // this.$helper.storage('profileId', res.data.userInfo.profileId)
      // this.$helper.storage('companyId', res.data.companyId)
      user.state.userinfo = new LoginTransformer(res.data.userInfo).create()
      console.log('user.userinfo', user.state.userinfo)
      // 业务处理后自动刷新
      // setTimeout(() => {
      //   window.location.reload()
      // }, 300)
      return {
        status: true,
        data: res.data
      }
    }
    console.log('Print RES >>>', res)
    return {
      status: false,
      data: {}
    }
  }
}
