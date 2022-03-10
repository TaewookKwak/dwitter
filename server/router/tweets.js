import express from 'express'
import 'express-async-errors'
import * as tweetController from '../controller/tweets.js'
import { body, param } from 'express-validator'
import { validate } from '../middleware/validator.js'

const router = express.Router()
const vailidateTweet = [
  body('text')
    .notEmpty()
    .trim()
    .isLength({ min: 3 })
    .withMessage('text should be at least 3 chars'),
  validate,
]
// GET /tweets
// GET /tweets?username=:username
router.get('/', tweetController.getTweets)

// GET /tweets/:id
router.get('/:id', tweetController.getTweet)

// POST /tweeets
router.post('/', vailidateTweet, tweetController.createTweet)

// PUT /tweets/:id
router.put('/:id', vailidateTweet, tweetController.updateTweet)

// DELETE /tweets/:id
router.delete('/:id', tweetController.deleteTweet)

export default router

// find vs filter
// find : 첫번째로 찾은 true 객체를 반환
// filter : 모든 true 객체를 배열로 반환
