import authAxiosInstance from "../../authAxiosInstance.ts";
import {IndustryInfoResponses} from "../types/IndustryInfoResponses.ts";

async function getIndustryList(): Promise<IndustryInfoResponses> {
    return await authAxiosInstance.get(
        "http://localhost:8080/api/applicant/industries/list"
    ).then((response) => {
        return response.data;
    });
}

export default getIndustryList;