import { FetchChatHistoryError, FetchChatHistoryFromDBError, QueryPromptError, StoreMessagesInDBError } from "../exceptions/messages.exceptions";
import { QueryServiceError } from "../exceptions/service.exceptions";
import { fetchChatHistoryFromDB, storePromptAndResponseInDB } from "../repository/messages.repository";
import { IQuerySchema } from "../route/v1Router/message.route";
import { queryService } from "../service/python.service";

export async function query(payload: IQuerySchema){
    try {
        // call python service to get response
        const response = await queryService(payload.prompt);
        // store message and response in db
        (async () => {
            storePromptAndResponseInDB({
                prompt: payload.prompt,
                response: response,
                chatId: "chat_YuFNLdJgOg3GQUFSf_i1q"
            })
        })()
        return response;

    } catch (error) {
        if (error instanceof QueryServiceError || error instanceof StoreMessagesInDBError) {
            throw error;
        }
        throw new QueryPromptError("Failed to process the query prompt", { cause: (error as Error).message })
    }
}

export async function fetchChatHistory(chatId: string) {
    try {
       return  await fetchChatHistoryFromDB(chatId);
    } catch (error) {
        if (error instanceof FetchChatHistoryFromDBError) {
            throw error;
        }
        throw new FetchChatHistoryError("Failed to fetch chat history", { cause: (error as Error).message })
    }
}