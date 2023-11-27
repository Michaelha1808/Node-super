import express from 'express'
import { sum } from './utils'
const app = express()
const port = 3000

app.get('/', (req, res) => {
  const data: any = null
  const value = sum(data)
  res.send(`Hello World!, ${value}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// interface User {
//   name: string
//   age: number
// }
// const render = (user: User) => {
//   console.log(user)
// }
// const user = { name: 'Duc', age: 21 }

// render(user as User)
