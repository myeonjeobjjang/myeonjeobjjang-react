import {useNavigate} from "react-router-dom";
import {useExitWhenNoPermission} from "../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../constants/role.ts";
import usePageTitle from "../../hooks/usePageTitle.ts";

const AdminManagementPage = () => {
    const nav = useNavigate();
    useExitWhenNoPermission(nav, Role.ADMIN);
    usePageTitle(`관리자 페이지`);

    return (
        <>
            관리자 페이지
        </>
    );
}

export default AdminManagementPage;