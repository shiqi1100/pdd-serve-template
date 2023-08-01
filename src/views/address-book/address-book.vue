<template>
  <div class="main flex">
    <div class="main-tree">
      <el-tree
          :data="state.depTreeData"
          :props="defaultProps"
          @node-click="handleNodeClick"
          node-key="id"
          :default-expanded-keys="[1]"
      />
    </div>
    <div class="main-select flex column justify-start align-center">
      <div v-for="(val,index) in selectData" :key="index" class="selected-item">
        {{val}}
      </div>
    </div>
    <div class="main-list">
      <div>
        <bn-input
            card
            placeholder="搜索..."
            suffix-icon="bn-icon-search"
            size="large"
        />
      </div>
      <div class="main-list-content">
        <div v-for="(item) in state.useData" :key="item.ucId" class="main-list-item flex align-center justify-start">
          <el-avatar :size="48" :src="item.userportraitImgUrl" />
          <div class="ml-12">
            <div class="name">{{item.realName}}</div>
            <div class="phone mt-6">{{item.mobile}}</div>
          </div>
          <div class="icon">
            <bn-icon-search :size="22" @click="openInfo(item)" />
          </div>
        </div>
      </div>
    </div>
  </div>
<!--  抽屉-->
  <bn-drawer
      v-model="visible"
      width="700px"
      popup-class="no-footer"
  >
    <template #body>
      <div class="flex align-center justify-center column drawer">
        <el-avatar :size="200" :src="state.useItem.userportraitImgUrl" />
        <div class="fs-29 mt-16 mb-8">
          {{state.useItem.realName}}
        </div>
        <div class="fs-18 mb-16">
          {{state.useItem.mobile}}
        </div>
        <div class="fs-18 mb-2">
          {{handlerSelect(state.useItem.gender, 'gender')}}
          <span>{{handlerSelect(state.useItem.stateCd, 'stateCd')}}</span>
          <span>{{handlerSelect(state.useItem.departmentPositionCd, 'departmentPositionCd')}}</span>
        </div>
        <div class="fs-18">
          所在部门：
          {{state.useItem.fullName}}
        </div>
      </div>
    </template>
  </bn-drawer>
</template>

<script setup lang="ts">
import {getDepTree, getUseList, handlerSelect, selectData} from "@/views/address-book/hooks";
import type {Tree,DataType,TreeDataType} from "@/views/address-book/hooks";
const visible = ref(false)
const state = reactive<{
  depTreeData: TreeDataType[]
  useData: DataType[]
  useItem: DataType
}>({
  depTreeData: [],
  useData: [],
  useItem: {
    userportraitImgUrl: '',
    realName: '',
    principal: ''
  }
})
// 树结构
const defaultProps = {
  children: 'children',
  label: 'label',
}

const handleNodeClick = (data: Tree) => {
  console.log(data, 'data 29')
}

const openInfo = (item: DataType) => {
  state.useItem = item
  visible.value = true

}

onMounted(async () => {
  state.depTreeData = await getDepTree()
  state.useData = await getUseList()
  console.log(state.useData, 'state.useData')
  console.log(state.depTreeData, 'state.depTreeData')
})

</script>

<style scoped lang="scss">
.main {
  width: 100%;
  height: 100%;
  background: #fff;

  &-tree {
    width: 350px;
    padding: 16px;
    overflow-y: auto;
    border-right: 1px solid hsla(210,8%,51%,.13);
    box-sizing: border-box;

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
    border-right: 1px solid hsla(210,8%,51%,.13);
    box-sizing: border-box;

    .selected-item {
      color: inherit !important;
      opacity: .6;
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
