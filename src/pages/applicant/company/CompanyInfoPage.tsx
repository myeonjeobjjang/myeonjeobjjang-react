import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import {CompanyInfoResponse} from "../../../api/company/types/CompanyInfoResponse.ts";
import getCompanyInfo from "../../../api/company/applicant/getCompanyInfo.ts";
import {IndustryInfo, useIndustryInfo} from "../../../hooks/useIndustryInfo.ts";

const callApi = async (companyId: number) => {
    const companyInfo = await getCompanyInfo(companyId);
    return companyInfo;
}

const initialData: CompanyInfoResponse = {
    companyId: 0,
    companyName: "",
    companyInformation: "",
    industryId: 0,
};

const initialCompanyIndustryData: IndustryInfo = {
    industryId: 0,
    industryName: "",
    industryInformation: "",
}

const CompanyInfoPage = () => {
    const {companyNumber} = useParams();
    const [companyInfo, setCompanyInfo] = useState(initialData);
    const [companyIndustryInfo, setCompanyIndustryInfo] = useState(initialCompanyIndustryData);
    const {industryInfoArray, updateInfo} = useIndustryInfo();
    useExitWhenNoPermission(useNavigate(), Role.ALL);
    usePageTitle(`${companyInfo.companyName} 정보`);

    useEffect(() => {
        updateInfo();
    }, []);

    useEffect(() => {
        const companyId: number = Number(companyNumber);
        callApi(companyId).then(data => {
                setCompanyInfo({...data});
            }
        );
    }, [companyNumber]);

    useEffect(() => {
        if(industryInfoArray.length > 0 && companyInfo.industryId > 0) {
            const industryInfo = industryInfoArray.find(
                (industryInfo) => industryInfo.industryId === companyInfo.industryId
            );
            if(industryInfo) {
                setCompanyIndustryInfo(industryInfo);
            }
        }
    }, [companyInfo.industryId, industryInfoArray]);
    return (
        <>
            회사 번호 : {companyInfo.companyId}
            <br/>
            산업군 : {companyIndustryInfo.industryName}
            <br/>
            회사 이름 : {companyInfo.companyName}
            <br/>
            회사 정보 : {companyInfo.companyInformation}
        </>
    )
}

export default CompanyInfoPage;