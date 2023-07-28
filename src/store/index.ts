import { defineStore } from "pinia";

export const useStore = defineStore("counter", () => {
  const state = reactive({
    name: '三哥',
    userinfo: {}
  })
  return { state };
});
