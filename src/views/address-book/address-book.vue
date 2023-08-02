<template>
  <div class="main flex">
    <div class="main-tree">
      <div class="main-tree-content">
        <el-tree :data="state.depTreeData" :props="defaultProps" @node-click="handleNodeClick" node-key="id" :default-expanded-keys="[1]" />
      </div>
      <div class="main-tree-btn flex justify-center align-center">
        <bn-button block @click="getAllUser">所有人员</bn-button>
      </div>
    </div>
    <div class="main-select flex column justify-start align-center">
      <div v-for="(val, index) in selectData" :key="index" class="selected-item" @click="filterList(val)">
        {{ val }}
      </div>
    </div>
    <div class="main-list">
      <div>
        <bn-input card placeholder="搜索..." suffix-icon="bn-icon-search" size="large" v-model="state.searchName" />
      </div>
      <div class="main-list-content">
        <div v-if="userList.length" v-for="item in userList" :key="item.ucId" class="main-list-item flex align-center justify-start">
          <el-avatar :size="48" :src="item.userportraitImgUrl" />
          <div class="ml-12">
            <div class="name">{{ item.realName }}</div>
            <div class="phone mt-6">{{ item.mobile }}</div>
          </div>
          <div class="icon">
            <bn-icon-search :size="22" @click="openInfo(item)" />
          </div>
        </div>
        <div v-else class="flex align-center justify-center empty">
          <bn-empty> </bn-empty>
        </div>
      </div>
    </div>
  </div>
  <!--  抽屉-->
  <worker-book-drawer ref="drawerRef" :state="state.useItem" />
</template>

<script setup lang="ts">
  import { getDepTree, getUseList, selectData } from '@/views/address-book/hooks'
  import type { DataType, TreeDataType, SelectData } from '@/views/address-book/hooks'
  import WorkerBookDrawer from '@/views/address-book/components/worker-book-drawer.vue'
  const state = reactive<{
    depTreeData: TreeDataType[]
    useData: DataType[]
    useItem: DataType
    searchName: string
  }>({
    depTreeData: [],
    useData: [],
    searchName: '',
    useItem: {
      userportraitImgUrl: '',
      realName: '',
      mobile: '',
      departmentPositionCd: '',
      stateCd: '',
      gender: 1,
      fullName: '',
      pinyin: ''
    }
  })
  const drawerRef = ref()

  const userList = computed(() => {
    return state.useData.filter((user) => {
      return (
        user.pinyin.toLowerCase().indexOf(state.searchName.toLowerCase()) === 0 ||
        user.realName.toLowerCase().indexOf(state.searchName.toLowerCase()) !== -1
      )
    })
  })
  // 树结构
  const defaultProps = {
    children: 'children',
    label: 'label'
  }

  const handleNodeClick = async (data: TreeDataType) => {
    if (data.id === 1) {
      state.useData = await getUseList()
    } else {
      state.useData = await getUseList('', data.id)
    }
  }

  const getAllUser = async () => {
    state.useData = await getUseList()
  }

  const openInfo = (item: DataType) => {
    state.useItem = item
    drawerRef.value.toggle(true)
  }

  const filterList = (val: SelectData) => {
    state.searchName = val
  }

  onMounted(async () => {
    Promise.all([getDepTree(), getUseList()]).then((res) => {
      // 组织架构树数据
      state.depTreeData = res[0]
      // 人员列表数据
      state.useData = res[1]
    })
  })
</script>

<style scoped lang="scss">
  .main {
    width: 100%;
    height: 100%;
    background: #fff;

    &-tree {
      width: 350px;
      overflow-y: auto;
      border-right: 1px solid hsla(210, 8%, 51%, 0.13);
      box-sizing: border-box;

      &-content {
        height: calc(100% - 56px);
        padding: 16px;
      }

      &-btn {
        border-top: 1px solid hsla(210, 8%, 51%, 0.13);
        height: 56px;
        box-sizing: border-box;
        padding: 10px 16px;
      }
      .el-tree {
        :deep(.el-tree-node > .el-tree-node__content > .el-tree-node__label) {
          font-weight: bold;
          font-size: 16px !important;
        }
      }
      :deep(.el-tree-node__children) {
        .el-tree-node {
          margin-top: 8px;
          .el-tree-node__content {
            .el-tree-node__label {
              font-weight: unset !important;

              &:hover {
                color: var(--mainColor);
              }
            }
          }
        }
      }
    }

    &-select {
      width: 40px;
      padding-top: 16px;
      border-right: 1px solid hsla(210, 8%, 51%, 0.13);
      box-sizing: border-box;

      .selected-item {
        color: inherit !important;
        opacity: 0.6;
        cursor: pointer;

        &:hover {
          opacity: 1;
        }
      }
    }

    &-list {
      flex: 1;

      &-content {
        overflow-y: auto;
        height: 100%;

        .empty {
          height: 100%;
        }

        .icon {
          margin-left: auto;

          &:hover {
            color: #0056ff;
          }
        }
      }
      &-item {
        padding: 16px;
        box-sizing: border-box;
        border-bottom: 1px solid rgb(248, 248, 249);

        &:hover {
          background: rgb(248, 248, 249);
        }
      }
    }
  }
  .drawer {
    padding: 3rem;
  }
</style>
