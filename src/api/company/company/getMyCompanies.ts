import authAxiosInstance from "../../authAxiosInstance.ts";
import {CompanyInfoResponses} from "../types/CompanyInfoResponses.ts";

async function getMyCompanies(): Promise<CompanyInfoResponses> {
    return await authAxiosInstance.get(
        `http://localhost:8080/api/company/companies/mine`
    ).then((response) => {
        return response.data;
    });
}

export default getMyCompanies;