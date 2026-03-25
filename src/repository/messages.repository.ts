import { nanoid } from "nanoid"
import db from "./db"
import { messages } from "./schema"
import { FetchChatHistoryFromDBError, StoreMessagesInDBError } from "../exceptions/messages.exceptions"
import { eq } from "drizzle-orm"

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

export async function fetchChatHistoryFromDB(chatId: string) {
    try {
        return await db.select().from(messages).where(eq(messages.chatId, chatId))
    } catch (error) {
        throw new FetchChatHistoryFromDBError("Failed to fetch chat history from DB", { cause: (error as Error).message })
    }
}