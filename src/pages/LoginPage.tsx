import Login from "../components/Login.tsx";
import usePageTitle from "../hooks/usePageTitle.ts";
import {useExitWhenNoPermission} from "../hooks/useExitWhenNoPermission.ts";
import {useNavigate} from "react-router-dom";
import {Role} from "../constants/role.ts";

const LoginPage = () => {
    useExitWhenNoPermission(useNavigate(), Role.NO_ROLE);
    usePageTitle(`로그인`);
    return (
        <>
            <Login/>
        </>
    )
}

export default LoginPage;