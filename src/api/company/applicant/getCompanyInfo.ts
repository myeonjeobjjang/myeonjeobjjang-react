import authAxiosInstance from "../../authAxiosInstance.ts";
import {CompanyInfoResponse} from "../types/CompanyInfoResponse.ts";

async function getCompanyInfo(companyId: number): Promise<CompanyInfoResponse> {
    return await authAxiosInstance.get(
        `http://localhost:8080/api/applicant/companies/${companyId}`
    ).then((response) => {
        return response.data;
    });
}

export default getCompanyInfo;