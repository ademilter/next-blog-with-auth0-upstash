import { nanoid } from 'nanoid'
import Redis from 'ioredis'
import Boom from '@hapi/boom'

function errorResponse(res, error) {
  const { output } = error
  return res.status(output.statusCode).json(output.payload)
}

export default async function handler(req, res) {
  // CREATE
  if (req.method === 'POST') {
    const { url, userToken, text } = req.body

    if (!url || !userToken || !text) {
      return errorResponse(res, Boom.badData('parametre eksik'))
    }

    const userResponse = await fetch(
      `https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}/userinfo`,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`
        }
      }
    )
    const user = await userResponse.json()

    if (!user) {
      return errorResponse(res, Boom.unauthorized())
    }

    const comment = {
      id: nanoid(),
      createdAt: Date.now(),
      text,
      user: {
        name: user.name,
        picture: user.picture
      }
    }

    let redis = new Redis(process.env.REDIS_URL)
    redis.lpush(url, JSON.stringify(comment))
    redis.quit()

    res.status(200).json(comment)
  }

  // FETCH
  if (req.method === 'GET') {
    const { url } = req.query

    let redis = new Redis(process.env.REDIS_URL)
    const comments = await redis.lrange(url, 0, -1)
    redis.quit()

    const data = comments.map((o) => JSON.parse(o))

    res.status(200).json(data)
  }
}
