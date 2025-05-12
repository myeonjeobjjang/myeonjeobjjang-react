import getMyCompanies from "../../../api/company/company/getMyCompanies.ts";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import {CompanyInfoResponse} from "../../../api/company/types/CompanyInfoResponse.ts";

const callApi = async () => {
    return (await getMyCompanies()).companies;
}

const initialData: CompanyInfoResponse[] = [];

const MyCompanyListPage = () => {
    const nav = useNavigate();
    const [companyInfoList, setCompanyInfoList] = useState(initialData);
    useExitWhenNoPermission(nav, Role.ADMIN_AND_COMPANY);
    usePageTitle(`관리 회사 리스트`);
    useEffect(() => {
        callApi().then((companyInfos) => {
            setCompanyInfoList(companyInfos);
        });
    }, []);
    return (
        <>
            MyCompanyListPage
            <br/>
            {
                companyInfoList.map((companyInfo) => {
                    return (
                        <div key={companyInfo.companyId}>
                            {companyInfo.companyName}
                            <button onClick={() => nav(`/company/${companyInfo.companyId}`)}>
                                정보 보기
                            </button>
                            <button onClick={() => nav(`/company/${companyInfo.companyId}/edit`)}>
                                정보 수정
                            </button>
                        </div>
                    )
                })
            }
        </>
    )
}

export default MyCompanyListPage;