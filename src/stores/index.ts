import { defineStore } from 'pinia'
import { apiGetRecipes, apiGetCategories, apiCreateRecipe } from '@/api/recipes/index'
import type { RecipeModel, CategoryModel } from '@/api/recipes/model'

interface RecipeState {
  recipes: RecipeModel[]
  categories: CategoryModel[]
}

export const useRecipeStore = defineStore({
  id: 'recipe-store',
  state: (): RecipeState => ({
    recipes: [],
    categories: [],
  }),
  getters: {
    getRecipes(): RecipeModel[] {
      return this.recipes
    },
    getCategories(): CategoryModel[] {
      return this.categories
    },
    getRecipeById() {
      return (id: number) => {
        const recipe = this.recipes.find(r => r.id === id)
        return recipe
      }
    }
  },
  actions: {
    setRecipes(data: RecipeModel[]) {
      this.recipes = data
    },
    setCategories(data: CategoryModel[]) {
      this.categories = data
    },
    async loadCategories() {
      apiGetCategories().then(data => {
        this.setCategories(data)
      })
    },
    async createRecipe(recipe: RecipeModel) {
      apiCreateRecipe(recipe).then(data => {
        this.setRecipes([...this.recipes, data])
      })
    },
    async loadRecipes() {
      apiGetRecipes().then(data => {
        this.setRecipes(data)
      })
    },
    async init() {
      await this.loadCategories()
      await this.loadRecipes()
    }
  },
})

