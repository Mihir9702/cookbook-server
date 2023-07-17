import 'dotenv/config'
import jwt from 'express-jwt'
import tokenFromHeaders from './tokenFromHeaders'

const auth = jwt({
  secret:
    process.env.TOKEN_SECRET ||
    '7890218730130981093809128309217073120983780912807617295401571',
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: tokenFromHeaders,
})

export default auth
