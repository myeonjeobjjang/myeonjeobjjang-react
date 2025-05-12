import {getUserInfo} from "../../../util/storage.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";

const CompanyPage = () => {
    const nav = useNavigate();
    const companyNumber = useRef<HTMLInputElement>(null);
    useExitWhenNoPermission(nav, Role.ALL);
    usePageTitle(`회사`);

    const [userRole, setUserRole] = useState("");

    useEffect(() => {
        setUserRole(String(getUserInfo()?.role));
    }, []);

    return (
        <>
            <input type="number" defaultValue="1" ref={companyNumber}/>
            <button onClick={() => nav(`/company/${companyNumber.current?.value}`)}>
                회사 조회
            </button>
            {
                userRole === "ROLE_ADMIN" || userRole === "ROLE_COMPANY" ?
                    <>
                        <button onClick={() => nav(`/company/${companyNumber.current?.value}/edit`)}>
                            회사 정보 수정
                        </button>
                        <br/>
                        <button onClick={() => nav(`/company/list-mine`)}>
                            관리 회사 리스트 조회
                        </button>
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