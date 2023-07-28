<template>
孩子001
  <p>
    {{text.id}}
  </p>
</template>

<script setup lang='ts'>
const route = useRoute()


const text = computed(() => {
  return route.query
})
</script>

<style scoped lang='scss'>

</style>
