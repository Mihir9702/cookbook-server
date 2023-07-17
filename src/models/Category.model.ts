import { Schema, model } from 'mongoose'
import { RecipeModel } from '../interfaces/recipe.interface'


interface CategorySchema {
  title: string
  image: string
  description: string
  recipes: Array<RecipeModel>
}

const categorySchema = new Schema({

  title: String,
  image: String,
  description: String,

  recipes: {
    type: [{
      strMeal: String,
      strMealThumb: String,
      idMeal: String
    }],
    unique: true
  }

})

const Category = model<CategorySchema>('Category', categorySchema)

export default Category