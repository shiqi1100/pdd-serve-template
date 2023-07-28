import { Transformer } from 'pdd'

export default class InitTransformer extends Transformer {
  transform(data: any, tData: Record<string, any> = {}): any {
    tData.time = this.formatDate()
    return tData
  }
}
