import * as authRepository from './auth_d.js'

let tweets = [
  {
    id: '1',
    text: '드림코더분들 화이팅!',
    createdAt: new Date().toString(),
    userId: '1',
  },
]

export async function getAll() {
  return Promise.all(
    tweets.map(async (tweet) => {
      const { username, name, url } = await authRepository.findById(
        tweet.userId,
      )
      return { ...tweet, username, name, url }
    }),
  )
}

export async function getAllByUsername(username) {
  return getAll().then((tweets) =>
    tweets.filter((tweet) => tweet.username === username),
  )
  // return tweets.filter((tweet) => tweet.username === username)
}

export async function getById(id) {
  const found = tweets.find((tweet) => tweet.id === id)
  if (!found) {
    return null
  }
  const { username, name, url } = await authRepository.findById(found.userId)
  return { ...found, username, name, url }

  // return tweets.find((tweet) => tweet.id === id)
}

export async function create(text, userId) {
  const tweet = {
    id: Date.now().toString(),
    text,
    createdAt: new Date(),
    userId,
  }
  tweets = [tweet, ...tweets]
  return getById(tweet.id)
}

export async function update(id, text) {
  const tweet = tweets.find((tweet) => tweet.id === id)
  if (tweet) {
    tweet.text = text
  }
  return getById(tweet.id)
}

export async function remove(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id)
}
