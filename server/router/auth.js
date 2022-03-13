import express from 'express'
import {} from 'express-async-errors'
import * as authController from '../controller/auth_c.js'
import { validate } from '../middleware/validator.js'
import { body } from 'express-validator'
import { isAuth } from '../middleware/auth.js'

const router = express.Router()

const validateCredential = [
  body('username')
    .trim()
    .isLength({ min: 5 })
    .withMessage('username should be at least 5 chars'),
  body('password')
    .trim()
    .isLength({ min: 5 })
    .withMessage('password should be at least 5 chars'),
  validate,
]

const validateSignup = [
  ...validateCredential,
  body('name').notEmpty().withMessage('name is missing'),
  body('email').isEmail().normalizeEmail().withMessage('invalid Email'),
  body('url')
    .isURL()
    .withMessage('invalid URL')
    .optional({ nullable: true, checkFalsy: true }), // nullable : 데이터를 보내지 않았을때 , checkFalsy : 텅텅빈 문자열 보냈을 때
  validate,
]

// 로그인
router.post('/login', validateCredential, authController.login)
// 회원가입
router.post('/signup', validateSignup, authController.signup)

router.get('/me', isAuth, authController.me)

export default router
