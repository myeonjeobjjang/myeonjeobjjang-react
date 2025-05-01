import basicAxiosInstance from "../basicAxiosInstance.ts";
import {getRefreshToken, setAccessToken, setRefreshToken} from "../../util/storage.ts";
import {LoginOrSignUpResponse} from "./types/loginOrSignUpResponse.ts";

export async function refreshTokens(): Promise<LoginOrSignUpResponse> {
    return await basicAxiosInstance.get(
        "http://localhost:8080/api/applicant/members/refreshTokens",
        {
            headers: {
                refreshToken: `Bearer ${getRefreshToken()}`,
            },
        },
    ).then((response) => {
        setAccessToken(response.data.jwtPairResponse.accessToken);
        setRefreshToken(response.data.jwtPairResponse.refreshToken);

        console.log("토큰 리프레시 됨", response.data);
        return response.data;
    });
}