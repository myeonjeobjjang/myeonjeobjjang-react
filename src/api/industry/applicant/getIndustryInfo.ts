import authAxiosInstance from "../../authAxiosInstance.ts";
import {IndustryInfoResponse} from "../types/IndustryInfoResponse.ts";

async function getIndustryInfo(industryId: number): Promise<IndustryInfoResponse> {
    return await authAxiosInstance.get(
        `http://localhost:8080/api/applicant/industries/${industryId}`
    ).then((response) => {
        return response.data;
    });
}

export default getIndustryInfo;