import Login from "../components/Login.tsx";
import usePageTitle from "../hooks/usePageTitle.ts";

const LoginPage = () => {
    usePageTitle(`로그인`);
    return (
        <>
            <Login/>
        </>
    )
}

export default LoginPage;