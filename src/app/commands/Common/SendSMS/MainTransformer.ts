import { Transformer } from 'pdd'

export default class MainTransformer extends Transformer {
  transform(data: any, tData?: any): any {
    // const newData = {}
    tData = data
    tData.time = this.formatDate()
    console.log('@@@@@@@@@@@@@@@@@@@@', tData)
    return tData
  }
}
