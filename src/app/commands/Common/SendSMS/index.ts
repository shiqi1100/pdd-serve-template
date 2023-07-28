import { Command } from 'pdd'
import MainTransformer from './MainTransformer'

export default class MainCommand extends Command {
  async handle(): Promise<any> {
    const res = await this.$helper.http('service.list.hot', {
      name: 'zhangsan',
      age: 'lis'
    })
    console.log('RESPONSE~~~~~~~~~~~~~~~', res.timestamp)
    if (res.statusCode === 0) {
      const tData = new MainTransformer(res.data).create()
      console.log('返回结果', res.data, tData)
    }
  }
}
