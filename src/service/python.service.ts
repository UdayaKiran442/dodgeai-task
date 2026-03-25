import { QueryServiceError } from "../exceptions/service.exceptions";

export async function queryService(query_prompt: string) {
    try {
        const response = await fetch("http://127.0.0.1:8000/query", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                query_prompt: query_prompt 
            })
        })
        const data = await response.json()
        return data.response;
    } catch (error) {
        throw new QueryServiceError("Failed to fetch response from Python service", { cause: (error as Error).message })
    }
}