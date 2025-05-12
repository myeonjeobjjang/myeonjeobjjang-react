import authAxiosInstance from "../../authAxiosInstance.ts";
import {CreateCompanyRequest} from "../types/CreateCompanyRequest.ts";
import {CompanyInfoResponse} from "../types/CompanyInfoResponse.ts";

async function createCompany(post: CreateCompanyRequest): Promise<CompanyInfoResponse> {
    return await authAxiosInstance.post(
        `http://localhost:8080/api/company/companies`,
        post
    ).then((response) => {
        return response.data;
    });
}

export default createCompany;