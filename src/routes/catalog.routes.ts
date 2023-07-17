import { Router, Request, Response } from 'express'
const router = Router()

import Recipe from '../models/Recipe.model'
import Category from '../models/Category.model'

/***********************************************
           cookbook.com/api/catalog             
 ***********************************************/

// All Categories
router.get('/categories', async (req: Request, res: Response) => {
  try {
    const r = await Category.find()
      .sort('title')
      .select('title image description')
    res.status(200).json(r)
  } catch {
    res.status(500).json({ errorMessage: 'Unable to query categories' })
  }
})

// Specific Category
router.get('/categories/:category', async (req: Request, res: Response) => {
  try {
    const r = await Recipe.find({ category: req.params.category })
    res.status(200).json(r)
  } catch {
    res
      .status(500)
      .json({ errorMessage: `Unable to query ${req.params.category}` })
  }
})

// All Recipes
router.get('/recipes', async (_, res: Response) => {
  try {
    const r = await Recipe.find().select('_id title image')
    res.status(200).json(r)
  } catch {
    res.status(500).json({ errorMessage: `Unable to query recipes` })
  }
})

// Specific Recipe
router.get('/recipes/:recipe', (req: Request, res: Response) => {
  Recipe.findOne({ title: req.params.recipe })
    .then(r => {
      res.status(200).json(r)
    })
    .catch(() =>
      res.status(500).json({ errorMessage: `Unable to query recipe` })
    )
})

export default router
