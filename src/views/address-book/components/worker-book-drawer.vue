<template>
  <bn-drawer v-model="visible" width="700px" popup-class="no-footer">
    <template #body>
      <div class="flex-center column drawer">
        <el-avatar :size="200" :src="state.userportraitImgUrl" />
        <div class="fs-29 mt-16 mb-8">
          {{ state.realName }}
        </div>
        <div class="fs-18 mb-16">
          {{ state.mobile }}
        </div>
        <div class="fs-18 mb-2">
          {{ handlerSelect(state.gender, 'gender') }}
          <span>{{ handlerSelect(state.stateCd, 'stateCd') }}</span>
          <span>{{ handlerSelect(state.departmentPositionCd, 'departmentPositionCd') }}</span>
        </div>
        <div class="fs-18">
          所在部门：
          {{ state.fullName }}
        </div>
      </div>
    </template>
  </bn-drawer>
</template>

<script setup lang="ts">
import type { DataType } from '@/views/address-book/hooks'
import { handlerSelect } from '@/views/address-book/hooks'
const proops = defineProps<{
  state: DataType
}>()
const visible = ref(false)

const toggle = (val: boolean) => {
  return (visible.value = val)
}

defineExpose({
  toggle
})
</script>

<style scoped lang="scss"></style>
