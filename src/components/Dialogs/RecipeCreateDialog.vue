<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import type { CreateRecipeModel, IngredientModel } from '@/api/recipes/model'
import { useRecipeStore } from '@/stores'
import { useRules } from '@/composable/useRules'

const store = useRecipeStore()
const { isRequired } = useRules()

const newRecipe = reactive({
  title: '',
  description: '',
  fullDescription: '',
  image: '',
  category: null,
  ingredients: []
})

const newIngredient = reactive<IngredientModel>({
  title: '',
  count: '',
  units: ''
})

const rules = ref([(v) => !!v || 'Name is required'])
const form = ref('form')

const resetNewRecipe = () => {
  newRecipe.title = ''
  newRecipe.description = ''
  newRecipe.fullDescription = ''
  newRecipe.image = ''
  newRecipe.category = null
  newRecipe.ingredients = []
}

const resetNewIngredient = () => {
  newIngredient.title = ''
  newIngredient.count = ''
  newIngredient.units = ''
}

const addNewIngredient = () => {
  newRecipe.ingredients.push({ ...newIngredient })
  resetNewIngredient()
}

const removeIngradient = (item) => {
  newRecipe.ingredients = newRecipe.ingredients.filter((i) => i.title !== item.title) // in real project remove by id
}

const isNewIngredientDisabled = computed(() => {
  return !newIngredient.title || !newIngredient.count || !newIngredient.units
})

const cancel = () => {
  resetNewRecipe()
  resetNewIngredient()
  emit('cancel')
}

const submit = async () => {
  const { valid } = await form.value.validate()

  if (valid) {
    store.createRecipe(newRecipe)
    cancel()
  }
}

const emit = defineEmits<{
  (e: 'cancel'): void
}>()
</script>

<template lang="pug">
v-dialog(
  scrollable
  width="600"
  persistent
)
  v-card
    v-card-title
      span.text-h5 Add Recipe
    v-card-text
      v-container
        v-form(ref="form")
          v-text-field(
            v-model="newRecipe.title"
            class="mb-1"
            :rules="isRequired"
            label="Title"
            density="comfortable"
          )
          v-text-field(
            v-model="newRecipe.image"
            class="mb-1"
            :rules="isRequired"
            label="Image url"
            density="comfortable"
          )
          v-select(
            v-model="newRecipe.category"
            class="mb-1"
            :rules="isRequired"
            :items="store.getCategories"
            return-object
            label="Category"
            density="comfortable"
          )
          v-textarea(
            v-model="newRecipe.description"
            class="mb-1"
            :rules="isRequired"
            label="Short Description"
            density="comfortable"
          )
          v-textarea(
            v-model="newRecipe.fullDescription"
            class="mb-1"
            :rules="isRequired"
            label="Full Description (Method)"
            density="comfortable"
          )
          p Ingredients: ()
          p.warning.text-caption(v-if="!newRecipe.ingredients.length") Warning: The number of ingredients must be greater than 0
          p(
            v-for="(item) in newRecipe.ingredients"
            class="text-body-2 mb-2"
          ) 
            v-btn(
              icon="mdi-minus"
              size="small"
              density="compact"
              variant="tonal"
              color="red"
              class="mr-2"
              @click="removeIngradient(item)"
            )
            | {{ `${item.title} - ${item.count} ${item.units}` }}
          v-row
            v-col(cols="6" md="4")
              v-text-field(
                v-model="newIngredient.title"
                :rules="[v => !!newRecipe.ingredients.length || 'Ingredients is required']"
                label="Title"
                density="comfortable"
              )
            v-col(cols="6" md="3")
              v-text-field(
                v-model="newIngredient.count"
                :rules="[v => !!newRecipe.ingredients.length || 'Ingredients is required']"
                label="Count"
                density="comfortable"
              )
            v-col(cols="6" md="3")
              v-text-field(
                v-model="newIngredient.units"
                :rules="[v => !!newRecipe.ingredients.length || 'Ingredients is required']"
                label="Units"
                density="comfortable"
              )
            v-col(cols="6" md="2")
              v-btn(
                style="height: 48px"
                :disabled="isNewIngredientDisabled"
                @click="addNewIngredient"
              )
                v-icon(icon="mdi-plus")
    v-card-actions
      v-spacer
      v-btn(
        variant="tonal"
        color="red"
        @click="cancel"
      ) Close
      v-btn(
        variant="tonal"
        color="primary"
        @click="submit"
      ) Save
</template>

<style lang="scss">
.warning {
  color: $warning;
}
</style>
