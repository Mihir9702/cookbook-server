import mongoose from 'mongoose'
import { MONGO_URI } from './consts'

export const database = () => {
  if (MONGO_URI)
    mongoose
      .connect(MONGO_URI)
      .then(x =>
        console.log(
          `Connected to Mongo! Database name: "${x.connections[0].name}"`
        )
      )
      .catch(e => console.error('Error connecting to mongo: ', e))
}

export const server = (app: any) => {
  const PORT = process.env.PORT || 5002
  app.listen(PORT, () =>
    console.log(`Connected to server http://localhost:${PORT}`)
  )
}
