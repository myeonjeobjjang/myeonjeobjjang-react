import {useNavigate} from "react-router-dom";
import {useRef} from "react";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import {getUserInfo} from "../../../util/storage.ts";

const IndustryPage = () => {
    const nav = useNavigate();
    const industryNumber = useRef<HTMLInputElement>(null);
    useExitWhenNoPermission(nav, Role.ALL);
    usePageTitle(`산업군`);

    return (
        <>
            <input type="number" defaultValue="1" ref={industryNumber}/>
            <button onClick={() => nav(`/industry/${industryNumber.current?.value}`)}>
                산업군 리스트 조회
            </button>
            <br/>
            <button onClick={() => nav(`/industry/list`)}>
                산업군 리스트 조회
            </button>
            {
                getUserInfo()?.role === "ROLE_ADMIN" ?
                    <>
                        <br/>
                        <button onClick={() => nav(`/admin/industry/create`)}>
                            산업군 생성
                        </button>
                    </> : <></>
            }
        </>
    );
}

export default IndustryPage;