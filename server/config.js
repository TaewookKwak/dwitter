import dotenv from 'dotenv'
dotenv.config()

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue
  if (value == null) {
    throw new Error(`Key ${key} is undefined`)
  }
  return value
}

export const config = {
  jwt: {
    secretKey: required('JWT_SECRET'),
    expiresInSec: parseInt(required('JWT_EXPIRES_SEC', 86400)),
  },
  bcrypt: {
    saltRound: parseInt(required('BCRYPT_SALT_ROUNDS', 12)),
  },
  host: {
    port: parseInt(required('HOST_PORT', 8080)),
  },
}

// export const config = {
//     jwt: {
//       secretKey: process.env.JWT_SECRET,
//       expiresInSec: process.env.JWT_EXPIRES_SEC,
//     },
//     bcrypt: {
//       saltRound: process.env.BCRPT_SALT_ROUNDS,
//     },
//   }
