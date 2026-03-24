import { Hono } from 'hono'
import router from './route'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/', router)

export default app
