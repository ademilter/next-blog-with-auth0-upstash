import { nanoid } from 'nanoid'
import Redis from 'ioredis'

export default async function handler(req, res) {
  // CREATE
  if (req.method === 'POST') {
    const { url, userToken, text } = req.body

    if (!url || !userToken || !text)
      return res.status(400).json({ message: 'parametreler eksik veya hatalı' })

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
    let redis = new Redis(process.env.REDIS_URL)
    const comments = await redis.lrange(
      'http://localhost:3000/blog/deneme-yazi',
      0,
      -1
    )
    redis.quit()

    const data = comments.map((o) => JSON.parse(o))

    res.status(200).json(data)
  }
}
