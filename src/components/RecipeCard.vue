<script setup lang="ts">
import type { RecipeModel } from '@/api/recipes/model'
import { ref } from 'vue'

const props = defineProps<{
  recipe: RecipeModel
}>()

const showAll = ref<boolean>(false)

const showMore = () => {
  showAll.value = true
}

const emit = defineEmits<{
  (e: 'quickView'): void
}>()
</script>

<template lang="pug">
v-card(class='h-100')
  .d-flex.flex-column.h-100
    v-img(
      :src="props.recipe.image"
      class="align-end flex-shrink-0 flex-grow-0"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
      height="200px"
      cover
    )
      v-chip.ma-4(
        variant="elevated"
        class="text-white"
      ) {{ props.recipe.category.title }}
    v-card-title {{ props.recipe.title }}
    v-card-text
      p.mb-3.recipe__description {{ props.recipe.description }}

      p.font-weight-bold.mb-2 Ingredients: 
      div(v-if="showAll")
        v-chip(
          v-for="(ing, index) in props.recipe.ingredients" :key="ing.title"
          size="small"
          class="text-grey mr-1 mb-2"
        )
          | {{ ing.title }}

      div(v-else)
        span(v-for="(ing, index) in props.recipe.ingredients" :key="ing.title")
          v-chip(
            v-if="index < 5"
            size="small"
            class="text-grey mr-1 mb-2"
          )
            | {{ ing.title }}

          v-chip(
            size="small"
            color="indigo"
            v-if="index === 5"
            class="text-primary  align-self-center mr-1 mb-2"
            @click="showMore"
          ) show more +{{ props.recipe.ingredients.length - 5 }}

    v-card-actions
      v-btn(
        class="flex-grow-1"
        color="red"
        variant="tonal"
        @click.stop="emit('quickView')"
      ) Quick view
      router-link(
        :to="`/${props.recipe.id}`"
        class="flex-grow-1 ml-2"
        )
        v-btn(
          block
          color="blue"
          prepend-icon="mdi-open-in-new"
          variant="tonal"
        ) View

</template>

<style lang="scss">
.recipe {
  &__description {
    height: 65px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
</style>
