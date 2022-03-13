import express from 'express'
import * as authController from '../controller/auth_c.js'
const router = express.Router()

// 로그인
router.post('/login', authController.login)
// 회원가입

// 로그아웃

export default router
