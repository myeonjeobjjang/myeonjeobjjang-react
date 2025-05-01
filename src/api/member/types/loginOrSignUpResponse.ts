interface JwtPairResponse {
    accessToken: string;
    refreshToken: string;
}

interface MemberInfoResponse {
    memberId: number;
    email: string;
    userName: string;
    role: string;
}

export interface LoginOrSignUpResponse {
    jwtPairResponse: JwtPairResponse;
    memberInfoResponse: MemberInfoResponse;
}