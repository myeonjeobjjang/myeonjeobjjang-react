import usePageTitle from "../hooks/usePageTitle.ts";
import SignUp from "../components/SignUp.tsx";
import {useExitWhenNoPermission} from "../hooks/useExitWhenNoPermission.ts";
import {useNavigate} from "react-router-dom";
import {Role} from "../constants/role.ts";

const SignUpPage = () => {
    useExitWhenNoPermission(useNavigate(), Role.NO_ROLE);
    usePageTitle(`회원가입`);
    return (
        <>
            <SignUp/>
        </>
    )
}

export default SignUpPage;