import {LoginOrSignUpResponse, MemberInfoResponse} from "../api/member/types/loginOrSignUpResponse.ts";

export const setAccessToken = (accessToken :string) => {
    localStorage.setItem('accessToken', accessToken);
}

export const getAccessToken = () : string | null => {
    return localStorage.getItem('accessToken');
}

export const removeAccessToken = () => {
    localStorage.removeItem('accessToken');
}

export const setRefreshToken = (refreshToken :string) => {
    localStorage.setItem('refreshToken', refreshToken);
}

export const getRefreshToken = () : string | null => {
    return localStorage.getItem('refreshToken');
}

export const removeRefreshToken = () => {
    localStorage.removeItem('refreshToken');
}

export const setUserInfo = (memberInfo : MemberInfoResponse) => {
    localStorage.setItem("userInfo", JSON.stringify(memberInfo));
}

export const getUserInfo = () : MemberInfoResponse | null => {
    const item = localStorage.getItem("userInfo");
    if(!item) return null;
    return JSON.parse(item);
}

export const removeUserInfo = () => {
    localStorage.removeItem("userInfo");
}

export const setUserInfos = (loginOrSignUpResponse:LoginOrSignUpResponse) => {
    setAccessToken(loginOrSignUpResponse.jwtPairResponse.accessToken);
    setRefreshToken(loginOrSignUpResponse.jwtPairResponse.refreshToken);
    setUserInfo(loginOrSignUpResponse.memberInfoResponse);
}

export const removeUserInfos = () => {
    removeAccessToken();
    removeRefreshToken();
    removeUserInfo();
}