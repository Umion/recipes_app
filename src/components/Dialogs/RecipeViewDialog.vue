<script setup lang="ts">
import { getImageUrl } from '@/utils/helper'

const props = defineProps<{
  item: RecipeModel | null
}>()

const emit = defineEmits<{
  (e: 'cancel'): void
}>()
</script>

<template lang="pug">
v-dialog(
  v-if="item"
  scrollable
  width="800"
  persistent
)
  v-card
    v-card-title {{ item.title }}
    v-divider
    v-card-text(style="height: 600px;")
      p {{ item.description }}
      img.w-100(:src="getImageUrl(item.image)")
      h2.text-h5.mb-3 Ingredients:
      .d-flex.align-items-center(v-for="ingredient in item.ingredients" )
        v-icon.mr-3.mb-2(
          icon="mdi-pot-mix-outline"
          color="light-green-darken-4"
        )
        p.text-body-1 {{ `${ingredient.title} - ${ingredient.count} ${ingredient.units}` }} 
      v-divider
      h2.text-h5.my-2 Method:
      p {{ item.fullDescription }}
    v-divider
    v-card-actions
      v-btn(
        color="blue-darken-4"
        variant="tonal"
        @click="emit('cancel')"
      ) Close
</template>
