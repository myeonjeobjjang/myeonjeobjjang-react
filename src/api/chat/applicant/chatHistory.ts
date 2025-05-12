import authAxiosInstance from "../../authAxiosInstance.ts";
import {getCurrentTime} from "../../../util/getCurrentTime.ts";
import {ConversationLogNoOffsetGetRequest} from "./types/ConversationLogNoOffsetGetRequest.ts";
import {ConversationLogNoOffsetGetResponse} from "./types/ConversationLogNoOffsetGetResponse.ts";

async function chatHistory(chatId: number, payload: ConversationLogNoOffsetGetRequest): Promise<ConversationLogNoOffsetGetResponse> {
    if (!payload.lastConversationCreatedAt) {
        payload.lastConversationCreatedAt = getCurrentTime();
    }
    return await authAxiosInstance.post(
        `http://localhost:8080/api/applicant/conversations/${chatId}/conversationLogs`,
        payload
    ).then((response) => {
        return response.data;
    });
}

export default chatHistory;