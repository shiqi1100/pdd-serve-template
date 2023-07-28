<template>
  <span @click="visible = true">
    <slot />
  </span>
  <el-dialog
    custom-class="common-delete-dialog"
    v-model="visible"
    :title="title"
    append-to-body
  >
    <div class="content">
      <img src="@/assets/images/svg/warning.svg" alt="" />
      <span>{{ content }}</span>
    </div>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
let visible = ref(false);
const props = withDefaults(
  defineProps<{
    title?: string;
    content?: string;
  }>(),
  {
    title: "",
    content: "确定要删除吗？",
  }
);

const emits = defineEmits<{
  (e: "confirm"): void;
}>();

const confirm = () => {
  emits("confirm");
  visible.value = false;
};
</script>

<style lang="ts" scoped></style>

<style lang="scss">
.common-delete-dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  box-sizing: border-box;
  width: 460px;
  padding: 21px 0 48px;
  margin: 0;
  background: #fff;
  border-radius: 12px;
  transform: translate(-50%, -50%);

  .el-dialog__header {
    height: 26px;
    padding: 0 0 0 28px;
    margin: 0;

    .el-dialog__headerbtn {
      top: 21px;
      right: 20px;
      width: 26px;
      height: 26px;
    }

    .el-icon {
      width: 100%;
      height: 100%;
      background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjYiIGhlaWdodD0iMjYiIHZpZXdCb3g9IjAgMCAyNiAyNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSIjOUNBNkI5IiBmaWxsLXJ1bGU9Im5vbnplcm8iPjxwYXRoIGQ9Ik02LjM1NCA1LjY0NmwxNCAxNC0uNzA4LjcwOC0xNC0xNHoiLz48cGF0aCBkPSJNMTkuNjQ2IDUuNjQ2bC0xNCAxNCAuNzA4LjcwOCAxNC0xNHoiLz48L2c+PC9zdmc+")
        no-repeat center;
      background-size: 26px 26px;

      svg {
        display: none;
      }
    }
  }

  .el-dialog__body {
    .content {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      & > img {
        width: 60px;
        height: 60px;
        margin-bottom: 24px;
      }

      & > span {
        padding: 0 64px;
        font-family: PingFangSC-Semibold, "PingFang SC", sans-serif;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        color: #242934;
        text-align: center;
      }
    }

    margin-bottom: 32px;
  }

  .el-dialog__footer {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
  }
}
</style>
