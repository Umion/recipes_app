<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useDisplay } from 'vuetify'
import { useRoute } from 'vue-router'
import { useRecipeStore } from '@/stores'
import { getImageUrl } from '@/utils/helper'

const route = useRoute()
const { lg, xl, xxl } = useDisplay()
const store = useRecipeStore()

const recipe = ref(null)

const colsCount = computed(() => {
  return xxl.value ? 6 : xl.value ? 8 : lg.value ? 10 : 12
})

onMounted(async () => {
  recipe.value = store.getRecipeById(+route.params.id) // in real project api request by id
})
</script>
<template lang="pug">
v-row(justify="center")
  v-col(:cols="colsCount")
    div(v-if="recipe")
      h1.text-h4 {{ recipe.title }} 
      v-divider.mb-2
      p.text-h6.mb-2 Category: {{ recipe.category.title }}
      p.text-body-1.mb-2 {{ recipe.description }}
      .text-center
        img.recipe__img.mb-3(:src="getImageUrl(recipe.image)")
      v-card.bg-orange-lighten-5(variant="outlined" color="grey")
        v-card-text.text-black
          h2.text-h5.mb-3 Ingredients:
          .d-flex.align-items-center(v-for="ingredient in recipe.ingredients" )
            v-icon.mr-3.mb-2(
              icon="mdi-pot-mix-outline"
              color="light-green-darken-4"
            )
            p.text-body-1 {{ `${ingredient.title} - ${ingredient.count} ${ingredient.units}` }} 
      h2.text-h5.my-2 Method:
      p.text-body-1 {{ recipe.fullDescription }}

</template>

<style>
.recipe__img {
  width: 100%;
  max-width: 870px;
}
</style>
