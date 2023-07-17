import axios from 'axios'
import Category from '../models/Category.model'

axios
  .get('https://www.themealdb.com/api/json/v1/1/categories.php')
  .then(response => {
    response.data.categories.map(individualFoodCategories => {
      individualFoodCategories.strCategoryDescription =
        individualFoodCategories.strCategoryDescription.replace('//\r\n//', 'g')
      Category.create({
        title: individualFoodCategories.strCategory,
        image: individualFoodCategories.strCategoryThumb,
        description: individualFoodCategories.strCategoryDescription,
      })
        .then(newCreatedCategory => newCreatedCategory)
        .catch(e => ({ message: 'Category Creation Error', error: e }))
    })
  })
  .catch(e => ({ message: 'Axios Request Error', error: e }))

const categories = [
  'Beef',
  'Chicken',
  'Dessert',
  'Lamb',
  'Miscellaneous',
  'Pasta',
  'Pork',
  'Seafood',
  'Side',
  'Starter',
  'Vegan',
  'Vegetarian',
  'Breakfast',
  'Goat',
]

categories.map(c => {
  axios
    .get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${c}`)
    .then(response => {
      response.data.meals.map(meal => {
        Category.findOneAndUpdate({ title: c }, { $push: { recipes: meal } })
          .then(ar => ar)
          .catch(er => er)
      })
    })
})
