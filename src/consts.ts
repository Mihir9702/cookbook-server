import 'dotenv/config'

export const MONGO_URI = process.env.MONGO_URI || process.env.MONGO_LOCAL
export const PORT = process.env.PORT || 5002
