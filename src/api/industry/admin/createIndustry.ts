import authAxiosInstance from "../../authAxiosInstance.ts";
import {IndustryInfoResponse} from "../types/IndustryInfoResponse.ts";
import {CreateIndustryAdminRequest} from "../types/CreateIndustryAdminRequest.ts";

async function createIndustry(post: CreateIndustryAdminRequest): Promise<IndustryInfoResponse> {
    return await authAxiosInstance.post(
        "http://localhost:8080/api/admin/industries",
        post
    ).then((response) => {
        console.log(response.data);
        return response.data;
    });
}

export default createIndustry;