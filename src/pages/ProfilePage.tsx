import {getUserInfo, removeUserInfos} from "../util/storage.ts";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import usePageTitle from "../hooks/usePageTitle.ts";

const ProfilePage = () => {
    const nav = useNavigate();
    const userInfo = getUserInfo();
    usePageTitle(`${userInfo?.userName}님 프로필`);
    useEffect(() => {
        if (!userInfo) {
            nav("/", {replace: true});
        }
    });
    const logout = () => {
        removeUserInfos();
        nav("/", {replace: true});
    }
    return (
        <>
            {
                !userInfo ? <></> :
                    <>
                        <div>
                            이메일 : {userInfo.email}
                        </div>
                        <div>
                            이름 : {userInfo.userName}
                        </div>
                        <button onClick={logout}>
                            로그아웃
                        </button>
                    </>
            }
        </>
    )
}

export default ProfilePage;