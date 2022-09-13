import { ObjectId } from "mongodb"
import type { NextApiRequest, NextApiResponse } from "next"
import connectToDatabase from "../../../db"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const todoId = req.query.todoId
  if (req.method === "PUT") {
    try {
      const { task, isDone } = req.body
      const mongoId = new ObjectId(String(todoId))
      const client = await connectToDatabase()
      await client.db().collection("todo").updateOne({ _id: mongoId }, { $set: { task, isDone } })
      await client.close()
      return res.json({ message: "updated" })
    } catch (error) {
      return res.json({ error })
    }
  }

  if (req.method === "DELETE") {
    try {
      const mongoId = new ObjectId(String(todoId))
      const client = await connectToDatabase()
      const a = await client.db().collection("todo").deleteOne({ _id: mongoId })
      await client.close()
      return res.json({ message: "deleted" })
    } catch (error) {
      return res.json(error)
    }
  }
}

export default handler
