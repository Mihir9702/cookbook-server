import axios from 'axios'
import Category from '../models/Category.model'
import Recipe from '../models/Recipe.model';

Category
.find()
.then(all => {
  all.map(cat => {
    cat.recipes.map(re => {
      axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${re.idMeal}`)
      .then(response => {
        response.data.meals.map(recipeInfo => {
          const instructions = recipeInfo.strInstructions.replace(/\r?\n|\r/g, " ")
          const { strMeal, strCategory, strMealThumb } = recipeInfo
          const { strMeasure, strIngredient } = recipeInfo
          const recipe = { title: strMeal, category: strCategory, image: strMealThumb, ingredients: [strMeasure, strIngredient], instructions: instructions }
          Recipe.create(recipe)
          .then(recipe => recipe)
          .catch(() => 'Recipe Creation error')
        })
      })
    })
  })
}).catch(e => `err${e}`) 
