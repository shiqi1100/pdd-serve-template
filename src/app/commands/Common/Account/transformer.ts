import { Transformer } from 'pdd'

export class LoginTransformer extends Transformer {
  transform(data: any, tData: Record<string, any> = {}): any {
    // mine: "false"
    // companyCode: "73505261"
    // gender: "1"
    // ctzidNo: ""
    // companyName: "深圳市八度云计算信息技术有限公司"
    // mobile: "18500045825"
    // departmentPosition: "1"
    // depName: "架构数据部"
    // companyRealName: "徐钰"
    // bloodTypeCd: ""
    // principal: "18500045825"
    // realName: "徐钰"
    // cdId: "8836"
    // companyId: "9"
    // profileId: "112990"
    // companyPromoter: "14"
    // stateCd: "1"
    // portraitImg: "62fc56d58d88417381c7657fa2a8e79b"
    // departmentLevel: "2"
    // email: "xy@ztes.com"
    console.log('data', data)
    tData = data
    tData.userAndDep = `${data.realName} - ${data.depName}`
    switch (Number(data.stateCd)) {
      case 1:
        tData.stateCdName = 'NB'
        break
      case 2:
        tData.stateCdName = 'BNB'
        break
      default:
        tData.stateCdName = 'ZNB'
    }
    tData.time = this.formatDate()
    return tData
  }
}
