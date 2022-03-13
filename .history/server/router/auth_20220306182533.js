import express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.status(201).send('GET: /posts')
})

router.post('/', (req, res) => {
  res.status(201).send('post: /posts')
})

router.put('/:id', (req, res) => {
  res.status(201).send('put: /posts')
})

router.delete('/:id', (req, res) => {
  res.status(201).send('delete: /posts')
})

export default router
