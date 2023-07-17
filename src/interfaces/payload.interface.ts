import { Request } from 'express'
import { Types } from 'mongoose'

export interface PayloadInfo extends Request {
  payload?: {
    _id: string
    name: string
    username: string
  } | null
}