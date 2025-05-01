import {useRef} from "react";
import signUp from "../api/member/signUp.ts";
import {useNavigate} from "react-router-dom";

const onSubmit = async (email: string, userName: string) => {
    return await signUp({email, userName});
}

const SignUp = () => {
    const signUpIdRef = useRef<HTMLInputElement>(null);
    const signUpNameRef = useRef<HTMLInputElement>(null);
    const nav = useNavigate();

    const handleSubmit = async () => {
        const id: string = signUpIdRef.current?.value ?? "";
        const userName: string = signUpNameRef.current?.value ?? "";
        if(id === "" || userName == "") {
            alert("아이디와 이름은 공백일 수 없습니다.");
            return;
        }
        const loginOrSignUpResponse = await onSubmit(id, userName);
        if(loginOrSignUpResponse) {
            nav("/", { replace: true });
        }
    };

    return (
        <div className="Login">
            <h1>회원가입</h1>
            <h3>아이디 : </h3>
            <input type="email" ref={signUpIdRef}/>
            <h3>이름 : </h3>
            <input type="text" ref={signUpNameRef}/>
            <button type="submit" onClick={handleSubmit} onSubmit={handleSubmit}>회원가입</button>
        </div>
    )
}

export default SignUp;