import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getIndustryInfo from "../../../api/industry/applicant/getIndustryInfo.ts";
import {IndustryInfoResponse} from "../../../api/industry/types/IndustryInfoResponse.ts";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";

const callApi = async (industryId: number) => {
    const industryInfo = await getIndustryInfo(industryId);
    return industryInfo;
}

const initialData: IndustryInfoResponse = {
    industryId: 0,
    industryName: "",
    industryInformation: "",
};

const IndustryInfoPage = () => {
    const {industryNumber} = useParams();
    const [industryInfo, setIndustryInfo] = useState(initialData);
    useExitWhenNoPermission(useNavigate(), Role.ALL);
    usePageTitle(`${industryInfo.industryName} 정보`);
    useEffect(() => {
        const industryId: number = Number(industryNumber);
        callApi(industryId).then(data => {
                setIndustryInfo({...data});
                console.log(industryInfo);
            }
        );
    }, [industryNumber]);
    return (
        <>
            산업군 번호 : {industryNumber}
            <br/>
            산업군 이름 : {industryInfo.industryName}
            <br/>
            산업군 메타정보 : {industryInfo.industryInformation}
        </>
    )
}

export default IndustryInfoPage;