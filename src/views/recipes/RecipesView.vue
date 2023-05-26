<script setup lang="ts">
import RecipeViewDialog from '@/components/Dialogs/RecipeViewDialog.vue'
import RecipeCreateDialog from '@/components/Dialogs/RecipeCreateDialog.vue'
import RecipeCard from '@/components/RecipeCard.vue'
import { useDisplay } from 'vuetify'
import { onMounted, computed, ref } from 'vue'
import { useRecipeStore } from '@/stores'
import type { RecipeModel } from '@/api/recipes/model'

const dialogView = ref<boolean>(false)
const dialogCreate = ref<boolean>(false)
const dialogItem = ref<RecipeModel | null>(null)
const viewType = ref<number>(0)

const { name, xs, sm, md, lg, xl, xxl } = useDisplay()
const store = useRecipeStore()

const showViewModal = (item: RecipeModel) => {
  dialogItem.value = item
  dialogView.value = true
}

const closeViewModal = () => {
  dialogItem.value = null
  dialogView.value = false
}

const showCreateModal = () => {
  dialogCreate.value = true
}

const closeCreateModal = () => {
  dialogCreate.value = false
}

const colsCount = computed(() => {
  return xxl.value ? 2 : xl.value ? 3 : lg.value || md.value ? 4 : sm.value ? 6 : 12
})

onMounted(() => {
  store.init()
})
</script>

<template lang="pug">
div
  h1.text-h4.mb-2 Recipes App
  p.text-body.text-grey.mb-3 Explore recipes from all over the world

  .text-right.mb-3
    v-btn-toggle(
      v-if="(!sm && !xs)"
      v-model="viewType"
      variant="outlined"
      class='mr-2 pa-2'
    )
      v-btn(size="x-small")
        v-icon(icon="mdi-view-grid-outline")
      v-btn(size="x-small")
        v-icon(icon="mdi-view-list")
    v-btn(
      rounded="xl"
      color="blue-accent-4"
      prepend-icon="mdi-plus"
      @click="showCreateModal"
    ) Add Recipe
v-row(v-if="!viewType || (sm || xs)")
  v-col(
    v-for="item in store.getRecipes" 
    :cols="colsCount"
  )
    RecipeCard(
      :recipe="item"
      @quick-view="showViewModal(item)"
    )
v-row(v-else)
  v-col(cols="12")
    v-table
      tbody
        tr(
          v-for="item in store.getRecipes"
          :key="item.name"
        )
          td.pa-0.pr-2(style="width: 150px")
            v-img.w-100(
              :src="item.image"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            )
              v-chip.ma-1(
                size="x-small"
                variant="elevated"
                class="text-white"
              ) {{ item.category.title }}
          td
            p.text-body-1 {{ item.title }}
            p.text-caption.recipe__description {{ item.description }}
          td
            div(v-if="true")
              span(v-for="(ing, index) in item.ingredients" :key="index")
                span(
                  v-if="index < 5"
                  class="text-grey text-body-2"
                )
                  | {{ `${ing.title} / ` }}
                span(
                  v-if="index === 5"
                  class="text-grey text-body-2"
                )
                  | other+{{ item.ingredients.length - 5 }}
   
          td(style="width: 85px")
            v-btn(
              block
              class="mb-1"
              size="small"
              variant="tonal"
              color="red"
              @click="showViewModal(item)"
            ) Show
            router-link(
              :to="`/${item.id}`"
            )
              v-btn(
                block
                size="small"
                variant="tonal"
                color="blue"
              ) Open
RecipeViewDialog(
  v-model="dialogView"
  :item="dialogItem"
  @cancel="closeViewModal"
)
RecipeCreateDialog(
  v-model="dialogCreate"
  @cancel="closeCreateModal"
  )
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
