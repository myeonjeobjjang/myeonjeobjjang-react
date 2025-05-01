import {getUserInfo} from "../util/storage.ts";

const Home = () => {
    const userInfo = getUserInfo();
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