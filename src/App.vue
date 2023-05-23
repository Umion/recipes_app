<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { RouterView, useRouter, useRoute } from 'vue-router'
const router = useRouter()
const location = useRoute();

const layout = computed(() => {
  return location.meta.layout || "default-layout"
})

</script>

<template lang="pug">
component(:is="layout") 
  router-view
</template>

<style scoped></style>
