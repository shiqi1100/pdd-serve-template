import { Command } from 'pdd'

export type TCreateJson = {
  status?: boolean
  msg?: string
  data?: any
}

export default class MergeCommand extends Command {
  private page = 1
  private limit = 10

  constructor(...payload: any[]) {
    super(...payload)
  }

  /**
   * setPage 设置分页数据
   * @param {Number} page 当前页
   * @param {Number} limit 分页数
   */
  public setPage(page = 1, limit = 10) {
    this.page = page || this.page
    this.limit = limit || this.limit
    return this
  }

  /**
   * mergePageConfig 处理分页数据
   * @returns
   */
  protected mergePage() {
    return {
      page: this.page,
      // 接口要求为 pagesize 非 pageSize
      pagesize: this.limit
    }
  }

  /**
   * createJson 组装返回数据
   * @param status {Boolean} 状态
   * @param msg {String} 提示消息
   * @param data {*} 返回数据
   * @returns {{msg, data, status}}
   */
  protected createJson({
    status = true,
    msg = '成功',
    data = null
  }: TCreateJson) {
    return {
      status: status,
      msg: msg,
      data: data
    }
  }

  /**
   * createPaginate 创建分页数据
   * @param {Number} total 总条数
   * @param {Number} current 当前页
   * @param {Array} list 列表
   */
  protected createPaginate({ total = 0, current = this.page, list = [] }) {
    return {
      total,
      current,
      list,
      limit: this.limit
    }
  }

  public handle(...args: any[]): any {}
}
