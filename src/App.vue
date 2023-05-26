<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
const route = useRoute();

const layout = computed(() => {
  return route.meta.layout || "default-layout"
})

</script>

<template lang="pug">
component(:is="layout") 
  router-view
</template>

<style scoped></style>
