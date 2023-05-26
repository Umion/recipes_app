export interface RecipeModel {
  id: number
  title: string
  description: string
  fullDescription: string
  image: string
  category: CategoryModel
  ingredients: IngredientModel[]
}


export type CreateRecipeModel = Omit<RecipeModel, 'id'>

export interface CategoryModel {
  id: number
  title: string
}

export interface IngredientModel {
  title: string
  count: string
  units: string
}
