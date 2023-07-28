<template>
  <div>
    <bn-space direction="vertical">
      <bn-space size="small">
        <bn-button>默认</bn-button>
        <bn-button type="primary">主题</bn-button>
        <bn-button type="success">成功</bn-button>
        <bn-button type="warning">警告</bn-button>
        <bn-button type="strong">强烈警告</bn-button>
        <bn-button type="danger">危险</bn-button>
      </bn-space>

      <bn-space size="small">
        <bn-button plain>默认</bn-button>
        <bn-button type="primary" plain>主题</bn-button>
        <bn-button type="success" plain>成功</bn-button>
        <bn-button type="warning" plain>警告</bn-button>
        <bn-button type="strong" plain>强烈警告</bn-button>
        <bn-button type="danger" plain>危险</bn-button>
      </bn-space>

      <bn-space size="small">
        <bn-button plain @click="store.state.name = '四哥'">{{
          store.state.name
        }}</bn-button>
        <bn-button type="success" plain @click="navigatorTo">成功</bn-button>
      </bn-space>
    </bn-space>
  </div>
  <div>
    <router-view />
  </div>
</template>

<script lang="ts" setup>
import { useStore } from "@/store";
const store = useStore();
const router = useRouter();

const navigatorTo = () => {
  store.state.name = "五哥";
  router.push({
    name: "childrenOne",
    query: {
      id: 123,
      code: 555,
    },
  });
};
</script>

<style scoped></style>
