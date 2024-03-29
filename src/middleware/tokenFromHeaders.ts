import { Request } from 'express'

export default (req: Request) => {
  // Check if the token is available on the request Headers
  // prettier-ignore
  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    // Get the encoded token string and return it
    return req.headers.authorization.split(' ')[1]
  }

  return null
}
