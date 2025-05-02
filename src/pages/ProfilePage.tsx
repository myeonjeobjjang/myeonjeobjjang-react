import {getUserInfo, removeUserInfos} from "../util/storage.ts";
import {useNavigate} from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle.ts";
import {useExitWhenNoPermission} from "../hooks/useExitWhenNoPermission.ts";
import {Role} from "../constants/role.ts";

const ProfilePage = () => {
    const nav = useNavigate();
    const userInfo = getUserInfo();
    useExitWhenNoPermission(nav, Role.ALL);
    usePageTitle(`${userInfo?.userName}님 프로필`);
    const logout = () => {
        removeUserInfos();
        nav("/", {replace: true});
    }
    return (
        <>
            {
                !userInfo ?
                    <>
                        <div>사용자 정보 없음</div>
                        <button onClick={logout}>
                            사용자 정보 리프레시
                        </button>
                    </> :
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