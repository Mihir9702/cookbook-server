import 'dotenv/config'
import app from './app'
import { server } from './connect'

app.listen(process.env.PORT, () => server(app))

export default app
