import { nanoid } from "nanoid"
import db from "./db"
import { messages } from "./schema"
import { StoreMessagesInDBError } from "../exceptions/messages.exceptions"

export async function storePromptAndResponseInDB(payload: {prompt: string, response: string, chatId: string}){
    try {
        const insertPayload = {
            messageId: `message_${nanoid()}`,
            chatId: payload.chatId,
            prompt: payload.prompt,
            response: payload.response,
        }
        await db.insert(messages).values(insertPayload)
    } catch (error) {
        throw new StoreMessagesInDBError("Failed to store messages in DB", { cause: (error as Error).message })
    }
}