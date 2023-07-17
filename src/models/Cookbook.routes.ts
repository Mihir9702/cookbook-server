import { Schema, model, Types } from 'mongoose'

interface CookbookSchema {
  owner: string
  recipes: string[]
}

const cookBookSchema = new Schema({
  owner: String,
  recipes: [String],
})

const Cookbook = model<CookbookSchema>('Cookbook', cookBookSchema)

export default Cookbook
