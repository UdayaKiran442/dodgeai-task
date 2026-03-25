import { QueryPromptError, StoreMessagesInDBError } from "../exceptions/messages.exceptions";
import { QueryServiceError } from "../exceptions/service.exceptions";
import { storePromptAndResponseInDB } from "../repository/messages.repository";
import { IQuerySchema } from "../route/v1Router/message.route";
import { queryService } from "../service/python.service";

export async function query(payload: IQuerySchema){
    try {
        // call python service to get response
        const response = await queryService(payload.prompt);
        // store message and response in db
        // TODO: run this in background
        await storePromptAndResponseInDB({
            prompt: payload.prompt,
            response: response,
            chatId: "chat_YuFNLdJgOg3GQUFSf_i1q"
        })
        return response;

    } catch (error) {
        if (error instanceof QueryServiceError || error instanceof StoreMessagesInDBError) {
            throw error;
        }
        throw new QueryPromptError("Failed to process the query prompt", { cause: (error as Error).message })
    }
}