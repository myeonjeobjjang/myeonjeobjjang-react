import basicAxiosInstance from "../basicAxiosInstance.ts";
import {LoginOrSignUpResponse} from "./types/loginOrSignUpResponse.ts";
import {LoginRequest} from "./types/loginRequest.ts";
import {setUserInfos} from "../../util/storage.ts";

async function login(post: LoginRequest): Promise<LoginOrSignUpResponse> {
    return await basicAxiosInstance.post(
        "http://localhost:8080/api/visitor/members/login",
        post
    ).then((response) => {
        setUserInfos(response.data);

        console.log(response.data);
        return response.data;
    }).catch((error) => {
        const {response: {data: {message}}} = error;
        alert(message);
        return null;
    });
}

export default login;