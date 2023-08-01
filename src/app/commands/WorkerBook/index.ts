import MergeCommand from '@/app/commands/MergeCommand'

// 获取部门列表
export class GetDepTreeList extends MergeCommand {
    async handle(params: any): Promise<any> {
        const result: any = await this.$helper.http('worker.book.dep.tree', params)

        if (result && result.rspCode === 0) {
            return {
                status: true,
                data: result.data ?? []
            }
        } else {
            return {
                status: false,
                msg: result.rspMsg,
                data: []
            }
        }
    }
}
// 获取人员列表
export class GetUseList extends MergeCommand {
    async handle(params: any): Promise<any> {
        const result: any = await this.$helper.http('worker.book.use.list', params)

        if (result && result.rspCode === 0) {
            return {
                status: true,
                data: result.data ?? []
            }
        } else {
            return {
                status: false,
                msg: result.rspMsg,
                data: []
            }
        }
    }
}
