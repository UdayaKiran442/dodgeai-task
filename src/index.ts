import { Hono } from 'hono'
import router from './route'
import { nanoid } from 'nanoid'

const app = new Hono()

app.get('/', (c) => {
  const nanoId = nanoid()
  return c.text('Hello Hono!' + nanoId)
})

app.route('/', router)

export default app
