import express from 'express'
import 'express-async-errors'

const router = express.Router()
let tweets = [
  {
    id: '1',
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: Date.now().toString(),
    name: 'Bob',
    username: 'bob',
    url:
      'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '2',
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: Date.now().toString(),
    name: 'Ellie',
    username: 'ellie',
    url:
      'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
  {
    id: '3',
    text: '드림코딩에서 강의 들으면 너무 좋으다',
    createdAt: Date.now().toString(),
    name: 'Sam',
    username: 'sam',
    url:
      'https://widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-1.png',
  },
]

router.get('/', (req, res, next) => {
  const username = req.query.username
  const data = username ? tweets.filter((t) => t.username === username) : tweets
  res.status(201).json(data)
})

router.get('/:id', (req, res, next) => {
  const id = req.params.id
  const tweet = tweets.find((t) => t.id === id)
  if (tweet) {
    res.status(200).json(tweet)
  } else {
    res.status(404).json({ message: `Tweet id ${id} not found` })
  }
})

router.post('/', (req, res, next) => {
  const { text, username, name } = req.body
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    name,
    username,
  }
  tweets = [tweet, ...tweets]
  res.status(201).json(tweet)
})

router.put('/:id', (req, res, next) => {
  const id = req.params.id
  const text = req.body.text
  const tweet = tweets.find((t) => t.id === id)
  if (tweet) {
    tweet.text = text
    res.status(200).json(tweet)
  } else {
    res.status(404).json({ message: `Tweet id ${id} not found` })
  }
})

router.delete('/:id', (req, res, next) => {
  const id = req.params.id
  tweets = tweets.filter((t) => t.id !== id)
  res.sendStatus(204)
  res.status(201).send('DELETE: /')
})

export default router

// find vs filter
// find : 첫번째로 찾은 true 객체를 반환
// filter : 모든 true 객체를 배열로 반환
