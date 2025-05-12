import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import {useNavigate} from "react-router-dom";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import CompanyEdit from "../../../components/company/CompanyEdit.tsx";
import {FormEvent, useState} from "react";
import createCompany from "../../../api/company/company/createCompany.ts";
import {CreateCompanyRequest} from "../../../api/company/types/CreateCompanyRequest.ts";

const callApi = (data: CreateCompanyRequest) => {
    createCompany(data);
}

const CreateCompanyPage = () => {
    const nav = useNavigate();
    useExitWhenNoPermission(nav, Role.ADMIN_AND_COMPANY);
    usePageTitle(`회사 생성`);

    const [companyName, setCompanyName] = useState('');
    const [companyInformation, setCompanyInformation] = useState('');
    const [industryId, setIndustryId] = useState(0);

    const onCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setCompanyName(e.target.value);
    const onCompanyInformationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setCompanyInformation(e.target.value);
    const onIndustryIdChange = (e: React.ChangeEvent<HTMLSelectElement>) => setIndustryId(Number(e.target.value));

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
        callApi({
            companyName: companyName.trim(),
            companyInformation: companyInformation.trim(),
            industryId: industryId
        });
        nav(`/company/list-mine`, {replace: true});
    };

    return (
        <>
            CreateCompanyPage
            <br/>
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
                submitButtonText="등록"
            />
        </>
    )
}

export default CreateCompanyPage;