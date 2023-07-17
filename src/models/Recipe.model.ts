import { Schema, model } from 'mongoose'
export interface RecipeSchema {
  id: string
  title: string
  category: string
  image: string
  video: string
  instructions: string[]
  ingredients: [string, string][]
}

const recipeSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },

  category: String,
  image: String,
  video: String,
  instructions: [String],
  ingredients: [[String]],
})

const Recipe = model<RecipeSchema>('Recipe', recipeSchema)

export default Recipe
