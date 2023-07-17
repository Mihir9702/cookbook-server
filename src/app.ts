import 'dotenv/config'
import express, { Express } from 'express'
const app: Express = express()

import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import { database } from './connect'

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(logger('dev'))
app.use(cookieParser())
app.use(
  cors({
    credentials: true,
    origin: process.env.ORIGIN,
  })
)

database()

import indexRouter from './routes/index.routes'
app.use('/', indexRouter)

export default app
