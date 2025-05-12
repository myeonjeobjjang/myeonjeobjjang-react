import authAxiosInstance from "../../authAxiosInstance.ts";
import {MockInterviewChatApplicantRequest} from "./types/MockInterviewChatApplicantRequest.ts";

async function supervisorChat(chatId: number, payload: MockInterviewChatApplicantRequest): Promise<string> {
    return await authAxiosInstance.post(
        `http://localhost:8080/api/applicant/conversations/${chatId}/supervisor`,
        payload
    ).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

export default supervisorChat;