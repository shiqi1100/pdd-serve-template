import { Command } from 'pdd'
import InitTransformer from './InitTransformer'

export default class Init extends Command {
  async handle(): Promise<void> {
    const res = await this.$helper.http('service.list.hot', {
      name: 'zhangsan',
      age: 'lis'
    })
    if (res.statusCode === 0) {
      const newData = new InitTransformer(res.data).create()
      console.log('NEW', newData)
    }
    console.log('%!!@!@!@!', res, res.statusCode)
    this.$helper.storage('zhangsan', 'lisi')
    this.$helper.session('zhangsan', 'lisi')
  }
}
