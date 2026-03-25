import { storePromptAndResponseInDB } from "../repository/messages.repository";
import { IQuerySchema } from "../route/v1Router/message.route";

export async function query(payload: IQuerySchema){
    try {
        // call python service to get response

        // store message and response in db
        const message = await storePromptAndResponseInDB({
            prompt: payload.prompt,
            response: "",
            chatId: ""
        })

        // return response

    } catch (error) {
        
    }
}