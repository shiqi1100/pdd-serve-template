import {GetDepTreeList} from "@/app/commands/WorkerBook";

export async function getDepTree() {
    const res = await new GetDepTreeList().handle({})
    if (res.status) {
        // ...
    }
}
