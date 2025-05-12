import authAxiosInstance from "../../authAxiosInstance.ts";
import {EditCompanyRequest} from "../types/EditCompanyRequest.ts";
import {CompanyInfoResponse} from "../types/CompanyInfoResponse.ts";

async function editCompany(companyId: number, payload: EditCompanyRequest): Promise<CompanyInfoResponse> {
    return await authAxiosInstance.patch(
        `http://localhost:8080/api/company/companies/${companyId}`,
        payload
    ).then((response) => {
        return response.data;
    });
}

export default editCompany;