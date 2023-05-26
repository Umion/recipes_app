<script setup lang="ts">
import { ref, computed } from 'vue'

const rail = ref<boolean>(true)
</script>

<template lang="pug">
v-navigation-drawer(
  :model-value="true"
  rail
  class="bg-blue-accent-4 rounded-e-xl py-10"
  permanent
  expand-on-hover
)
  v-list-item(
    prepend-icon="mdi-note-multiple-outline"
    title="Recipes App"
  )

  v-divider

  v-list(density="compact" nav class='mt-8')
    router-link(to="/")
      v-list-item( prepend-icon="mdi-home-city" title="Home" value="home")
    v-list-item( disabled prepend-icon="mdi-information-outline" title="About us" value="account")
    v-list-item( disabled prepend-icon="mdi-account-group-outline" title="Users" value="users")
</template>
