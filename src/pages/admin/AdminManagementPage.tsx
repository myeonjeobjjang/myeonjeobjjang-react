import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {getUserInfo} from "../../util/storage.ts";

const AdminManagementPage = () => {
    const nav = useNavigate();

    useEffect(() => {
        const userInfo = getUserInfo();
        if (!userInfo || (userInfo.role !== "ROLE_ADMIN")) {
            nav("/", {replace: true});
        }
    });
    return (
        <>
            관리페이지
        </>
    );
}

export default AdminManagementPage;