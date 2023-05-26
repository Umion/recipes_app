import type { RecipeModel, CategoryModel, CreateRecipeModel } from './model'
import { recipes, categories } from './mockData'
import { getRandomId } from '@/utils/helper'

export const apiGetRecipes = (): Promise<RecipeModel[]> => {
  return Promise.resolve(recipes)
}

export const apiCreateRecipe = (item: CreateRecipeModel): Promise<RecipeModel> => {
  const recipe = {
    id: getRandomId(),
    ...item
  }
  return Promise.resolve(recipe)
}

export const apiGetCategories = (): Promise<CategoryModel[]> => {
  return Promise.resolve(categories)
}
