import { Hono } from "hono";
import z from "zod";
import { query } from "../../controller/message.controller";
const messageRouter = new Hono();

const QuerySchema = z.object({
    prompt: z.string(),
})

export type IQuerySchema = z.infer<typeof QuerySchema>

messageRouter.post('/query', async (c) => {
    try {
        const validation = QuerySchema.safeParse(await c.req.json())
        if (!validation.success){
            throw validation.error;
        }
        const payload = validation.data;
        const response = await query(payload);
        return c.json({ success: true, data: response });
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errMessage = JSON.parse(error.message);
            return c.json({ success: false, error: errMessage[0], message: errMessage[0].message }, 401);
        }
    }
})

export default messageRouter;