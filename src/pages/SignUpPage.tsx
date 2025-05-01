import usePageTitle from "../hooks/usePageTitle.ts";
import SignUp from "../components/SignUp.tsx";

const SignUpPage = () => {
    usePageTitle(`회원가입`);
    return (
        <>
            <SignUp/>
        </>
    )
}

export default SignUpPage;