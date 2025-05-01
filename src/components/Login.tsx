import {useRef} from "react";
import login from "../api/member/login.ts";

const onSubmit = async (email: string) => {
    await login({email});
}

const Login = () => {
    const loginIdRef = useRef<HTMLInputElement>(null);

    const handleSubmit = () => {
        const id: string = loginIdRef.current?.value ?? "";
        onSubmit(id);
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