import {useNavigate, useParams} from "react-router-dom";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import getCompanyInfo from "../../../api/company/applicant/getCompanyInfo.ts";
import editCompany from "../../../api/company/company/editCompany.ts";
import {FormEvent, useEffect, useState} from "react";
import {CompanyInfoResponse} from "../../../api/company/types/CompanyInfoResponse.ts";
import CompanyEdit from "../../../components/company/CompanyEdit.tsx";

const callInfoApi = async (companyId: number): Promise<CompanyInfoResponse> => {
    return await getCompanyInfo(companyId);
}

const callEditApi = async (companyId: number, companyName: string, companyInformation: string, industryId: number) => {
    await editCompany(companyId, {companyName, companyInformation, industryId});
}

const CompanyEditPage = () => {
    const nav = useNavigate();
    const {companyNumber} = useParams();
    useExitWhenNoPermission(nav, Role.ADMIN_AND_COMPANY);

    const [companyName, setCompanyName] = useState('');
    const [companyInformation, setCompanyInformation] = useState('');
    const [industryId, setIndustryId] = useState(0);

    usePageTitle(`${companyName} 수정`);

    const onCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value);
    const onCompanyInformationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCompanyInformation(e.target.value);
    const onIndustryIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIndustryId(Number(e.target.value));

    useEffect(() => {
        callInfoApi(Number(companyNumber)).then((response: CompanyInfoResponse) => {
                // setCompanyInfo(response);
                setCompanyName(String(response.companyName));
                setCompanyInformation(String(response.companyInformation));
                setIndustryId(Number(response.industryId));
            }
        );
    }, []);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!companyName || companyName.trim().length === 0) {
            alert("회사 이름을 입력해주세요.");
            return;
        }
        if (!companyInformation || companyInformation.trim().length === 0) {
            alert("회사 정보를 입력해주세요.");
            return;
        }
        if (!industryId || industryId < 0) {
            alert("산업군을 선택해주세요.");
            return;
        }
        callEditApi(
            Number(companyNumber),
            companyName.trim(),
            companyInformation.trim(),
            industryId
        );
        nav(`/company/list-mine`, {replace: true});
    };

    return (
        <>
            회사 데이터 수정
            <CompanyEdit
                onSubmit={onSubmit}
                titlePlaceHolder="회사명을 입력해주세요."
                companyNameValue={companyName}
                onCompanyNameChange={onCompanyNameChange}
                companyInformationPlaceHolder="회사 정보를 입력해주세요."
                companyInformationValue={companyInformation}
                onCompanyInformationChange={onCompanyInformationChange}
                industryIdValue={industryId}
                onIndustryIdChange={onIndustryIdChange}
                submitButtonText="수정"
            />
        </>
    )
}

export default CompanyEditPage;