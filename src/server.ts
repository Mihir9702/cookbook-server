import 'dotenv/config'
import app from './app'
import { server } from './connect'

server(app)

export default app
