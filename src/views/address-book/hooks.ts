import { GetDepTreeList, GetUseList } from "@/app/commands/WorkerBook";

export interface TreeDataType {
  label: string;
  id: number;
  children?: TreeDataType[];
}
export interface Tree {
  label: string;
  children?: Tree[];
}

export interface DataType {
  [key: string]: any;
  ucId?: number;
  userportraitImgUrl: string;
  realName: string;
  mobile: string;
    gender: number
    stateCd: string
    departmentPositionCd: string
    fullName: string
}

const select = {
  departmentPositionCd: [
    {
      value: "1",
      label: "员工",
    },
    {
      value: "2",
      label: "副负责人",
    },
    {
      value: "3",
      label: "主负责人"
    }
  ],
  stateCd: [
    {
      value: "1",
      label: "在职",
    },
    {
      value: "2",
      label: "离职",
    },
    {
      value: "3",
      label: "储备",
    },
    {
      value: "4",
      label: "邀请中"
    }
  ],
  gender: [
    {
      value: "1",
      label: "男",
    },
    {
      value: "2",
      label: "女"
    }
  ],
};

type SelectType = keyof typeof select

export function handlerSelect(value: number | string, type: SelectType) {
    return select[type]?.filter(i => i?.value === String(value))?.[0]?.label || ''
}

export const selectData = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z"
];

// 处理部门数据
function handlerDepTree<T extends Array<any>>(data: T): TreeDataType[] {
  const handlerData: TreeDataType[] = [];
  data.forEach((item: Record<string, any>) => {
    if (item?.pId === 0) {
      handlerData.push({
        id: 1,
        label: item.label,
        children: [],
      });
    }
    const children: TreeDataType[] = data.filter((i: Record<string, any>) => {
      return i.pId === item.id;
    });
    if (children.length === 0) return;
    item.children = children;
  });
  if (handlerData.length) {
    handlerData[0].children = data[0].children;
  }
  return handlerData;
}

// 获取部门数据
export async function getDepTree() {
  const res = await new GetDepTreeList().handle({});
  if (res.status) {
    const data =
      res.data?.innerDep?.map((item: Record<string, any>) => {
        return {
          id: item.id,
          label: item.name,
          pId: item.pId,
        };
      }) ?? [];
    return handlerDepTree<TreeDataType[]>(data);
  }
  return [];
}
// 获取人员列表
export async function getUseList(realName = "", cdId = "") {
  const params = {
    page: 1,
    pagesize: 0,
    realName,
    cdId,
    stateCd: "1",
  };
  const res = await new GetUseList().handle(params);
  if (res.status) {
    return res.data?.result ?? [];
  }
  return [];
}
