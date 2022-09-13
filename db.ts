import { MongoClient } from "mongodb"

const connectToDatabase = async () => {
  const client = await MongoClient.connect(String(process.env.DB_CONNECTION_STRING))
  return client
}

export default connectToDatabase
