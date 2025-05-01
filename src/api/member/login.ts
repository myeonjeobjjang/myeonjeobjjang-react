import basicAxiosInstance from "../basicAxiosInstance.ts";
import {LoginOrSignUpResponse} from "./types/loginOrSignUpResponse.ts";
import {LoginRequest} from "./types/loginRequest.ts";
import {setAccessToken, setRefreshToken} from "../../util/storage.ts";

async function login(post: LoginRequest): Promise<LoginOrSignUpResponse> {
    return await basicAxiosInstance.post(
        "http://localhost:8080/api/visitor/members/login",
        post
    ).then((response) => {
        setAccessToken(response.data.jwtPairResponse.accessToken);
        setRefreshToken(response.data.jwtPairResponse.refreshToken);

        console.log(response.data);
        return response.data;
    }).catch((error) => {
        const {response: {data: {message}}} = error;
        alert(message);
        return null;
    });
}

export default login;