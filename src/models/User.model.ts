import { Schema, model, Types } from 'mongoose'

interface UserSchema {
  name: string
  username: string
  password: string
  cookbooks?: Types.ObjectId[]
}

const userSchema = new Schema(
  {
    name: String,
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    cookbooks: {
      type: [Types.ObjectId],
      ref: 'Cookbook',
    },
  },
  { timestamps: true }
)

const User = model<UserSchema>('User', userSchema)

export default User
