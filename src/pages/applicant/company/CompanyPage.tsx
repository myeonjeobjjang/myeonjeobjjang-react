import {getUserInfo} from "../../../util/storage.ts";
import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";

const CompanyPage = () => {
    const nav = useNavigate();
    const companyNumber = useRef<HTMLInputElement>(null);
    useExitWhenNoPermission(nav, Role.ALL);
    usePageTitle(`회사`);

    return (
        <>
            <input type="number" defaultValue="1" ref={companyNumber}/>
            <button onClick={() => nav(`/company/${companyNumber.current?.value}`)}>
                회사 조회
            </button>
            {
                getUserInfo()?.role === "ROLE_ADMIN" || getUserInfo()?.role === "ROLE_COMPANY" ?
                    <>
                        <br/>
                        <button onClick={() => nav(`/company/create`)}>
                            회사 생성
                        </button>
                    </> : <></>
            }
        </>
    )
}

export default CompanyPage;