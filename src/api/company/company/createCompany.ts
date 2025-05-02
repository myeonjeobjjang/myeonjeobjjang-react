import {IndustryInfoResponse} from "../../industry/types/IndustryInfoResponse.ts";
import authAxiosInstance from "../../authAxiosInstance.ts";
import {CreateCompanyRequest} from "../types/CreateCompanyRequest.ts";

async function createCompany(post: CreateCompanyRequest): Promise<IndustryInfoResponse> {
    return await authAxiosInstance.post(
        `http://localhost:8080/api/company/companies`,
        post
    ).then((response) => {
        return response.data;
    });
}

export default createCompany;