import {getUserInfo} from "../util/storage.ts";
import usePageTitle from "../hooks/usePageTitle.ts";

const Home = () => {
    const userInfo = getUserInfo();
    usePageTitle(`면접짱`);
    return (
        <div className={`Home`}>
            {
                (userInfo) ?
                    `안녕하세요! ${userInfo.userName}님!`
                    :
                    "로그인 해주세요."
            }
        </div>
    )
}

export default Home;