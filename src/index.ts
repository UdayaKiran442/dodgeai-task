import { Hono } from 'hono'
import router from './route'
import { cors } from "hono/cors";


const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.use(
	"/*",
	cors({
		origin: ["http://localhost:3001"],
	}),
);


app.route('/', router)

export default app
