import {MemberInfoApplicantResponse} from "./types/memberInfoApplicantResponse.ts";
import authAxiosInstance from "../authAxiosInstance.ts";

async function who(): Promise<MemberInfoApplicantResponse> {
    return await authAxiosInstance.get(
        "http://localhost:8080/api/applicant/members/who",
    ).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

export default who;