import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import {useNavigate} from "react-router-dom";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import CompanyEdit from "../../../components/company/CompanyEdit.tsx";
import {FormEvent, useRef} from "react";
import createCompany from "../../../api/company/company/createCompany.ts";
import {CreateCompanyRequest} from "../../../api/company/types/CreateCompanyRequest.ts";

const callApi = (data: CreateCompanyRequest) => {
    createCompany(data);
}

const CreateCompanyPage = () => {
    const nav = useNavigate();
    useExitWhenNoPermission(nav, Role.ADMIN_AND_COMPANY);
    usePageTitle(`회사 생성`);

    const titleRef = useRef<HTMLInputElement>(null);
    const companyInformationRef = useRef<HTMLTextAreaElement>(null);
    const industryIdRef = useRef<HTMLSelectElement>(null);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!titleRef.current || titleRef.current.value.trim().length === 0) {
            alert("회사 이름을 입력해주세요.");
            return;
        }
        if (!companyInformationRef.current || companyInformationRef.current.value.trim().length === 0) {
            alert("회사 정보를 입력해주세요.");
            return;
        }
        if (!industryIdRef.current || industryIdRef.current.value.trim().length === 0) {
            alert("산업군을 선택해주세요.");
            return;
        }
        callApi({
            companyName: titleRef.current.value.trim(),
            companyInformation: companyInformationRef.current.value.trim(),
            industryId: Number(industryIdRef.current.value)
        });
        nav(`/`, {replace: true});
        // nav(`/company/list/mine`, {replace: true});
    };

    return (
        <>
            CreateCompanyPage
            <br/>
            <CompanyEdit
                onSubmit={onSubmit}
                titlePlaceHolder="회사명을 입력해주세요."
                titleRef={titleRef}
                companyInformationPlaceHolder="회사 정보를 입력해주세요."
                companyInformationRef={companyInformationRef}
                industryIdRef={industryIdRef}
                submitButtonText="등록"
            />
        </>
    )
}

export default CreateCompanyPage;