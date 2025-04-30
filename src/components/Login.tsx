import {useRef} from "react";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json"
    }
});

interface LoginRequest {
    email : string
}

interface JwtPairResponse {
    accessToken : string;
    refreshToken :string;
}

interface MemberInfoResponse {
    memberId : number;
    email : string;
    userNmae : string;
    role : string;
}

interface LoginResponse {
    jwtPairResponse : JwtPairResponse;
    memberInfoResponse : MemberInfoResponse;
}

const onSubmit = async (email: string) => {
    console.log(email);
    const loginRequest: LoginRequest = {
        email
    };

    async function login(post: LoginRequest): Promise<LoginResponse> {
        const axiosResponse = await axiosInstance.post("/api/visitor/members/login", post);
        return axiosResponse.data;
    }

    const loginResponsePromise: LoginResponse = await login(loginRequest);
    console.log(loginResponsePromise.jwtPairResponse.accessToken);
    localStorage.removeItem("accessToken");
    localStorage.setItem("accessToken", loginResponsePromise.jwtPairResponse.accessToken);
}

const Login = () => {
    const idRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const id : string = idRef.current?.value ?? "";
        onSubmit(id);
    };

    return (
        <div className="Login">
            <h3>아이디 : </h3>
            <input type="text" ref={idRef}/>
            <button type="submit" onClick={handleSubmit} onSubmit={handleSubmit}>로그인</button>
        </div>
    )
}

export default Login;