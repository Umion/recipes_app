<script setup lang="ts">
import TheSidebar from '@/components/Application/TheSidebar.vue'
</script>

<template lang="pug">
v-app
  v-layout
    the-sidebar
    v-main
      .py-10
        v-container 
          slot
</template>

<style>
.v-main {
  height: 100vh;
  overflow-y: scroll;
}
</style>
