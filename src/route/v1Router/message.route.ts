import { Hono } from "hono";
import z from "zod";
import { query } from "../../controller/message.controller";
import { QueryPromptError, StoreMessagesInDBError } from "../../exceptions/messages.exceptions";
import { QueryServiceError } from "../../exceptions/service.exceptions";
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
        if (error instanceof QueryPromptError || error instanceof QueryServiceError || error instanceof StoreMessagesInDBError) {
            return c.json({ success: false, message: error.message }, 500);
        }
        return c.json({ success: false, message: "An unexpected error occurred" }, 500);
    }
})

export default messageRouter;