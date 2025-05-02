import axios, {InternalAxiosRequestConfig} from "axios";
import {getAccessToken, removeUserInfos} from "../util/storage.ts";
import {refreshTokens} from "./member/refreshTokens.ts";

const authAxiosInstance = axios.create({
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json"
    }
});

authAxiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const accessToken = getAccessToken();
        if(!accessToken) {
            return Promise.reject();
        }
        if (accessToken && config.headers) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
)

authAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {response: {status, data: {errorCode, message, timeStamp}}} = error;
        console.log(`Error Response ${status} : ${errorCode} ${message} [${timeStamp}]`, error);
        const originRequest = error.config;
        if (status === 401) {
            try {
                const newToken = await refreshTokens().catch((error) => {
                    throw error;
                });

                if (newToken) {
                    originRequest.headers.Authorization = `Bearer ${newToken.jwtPairResponse.accessToken}`;
                    return authAxiosInstance(originRequest);
                }
            } catch (error) {
                console.log("토큰 갱신 실패 ", error);
                removeUserInfos();
                window.location.href = "/login";
                return Promise.reject(error);
            }
        } else {
            if (!getAccessToken()) { // access token 이 없는 경우
                window.location.href = "/login";
                alert("로그인이 필요한 페이지입니다.");
            }
        }
        return Promise.reject(error);
    }
)

export default authAxiosInstance;