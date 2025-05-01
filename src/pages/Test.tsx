import Login from "../components/Login.tsx";
import SignUp from "../components/SignUp.tsx";
import {refreshTokens} from "../api/member/refreshTokens.ts";
import who from "../api/member/who.ts";
import usePageTitle from "../hooks/usePageTitle.ts";

const Test = () => {
    usePageTitle(`테스트 페이지`);
    return (
        <div>
            <Login/>
            <SignUp/>
            <button onClick={refreshTokens}>토큰 리프레시</button>
            <button onClick={who}>내가 누구야</button>
        </div>
    )
}

export default Test;