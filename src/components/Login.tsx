import {useRef} from "react";
import login from "../api/member/login.ts";
import {useNavigate} from "react-router-dom";

const onSubmit = async (email: string) => {
    return await login({email});
}

const Login = () => {
    const loginIdRef = useRef<HTMLInputElement>(null);
    const nav = useNavigate();

    const handleSubmit = async () => {
        const id: string = loginIdRef.current?.value ?? "";
        const loginOrSignUpResponse = await onSubmit(id);
        if(loginOrSignUpResponse) {
            nav("/", { replace: true });
        }
    };

    return (
        <div className="Login">
            <h1>로그인</h1>
            <h3>아이디 : </h3>
            <input type="text" ref={loginIdRef}/>
            <button type="submit" onClick={handleSubmit} onSubmit={handleSubmit}>로그인</button>
        </div>
    )
}

export default Login;