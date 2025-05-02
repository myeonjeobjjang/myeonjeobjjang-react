import {CreateIndustryAdminRequest} from "../../api/industry/types/CreateIndustryAdminRequest.ts";
import {FormEvent, useRef} from "react";
import createIndustry from "../../api/industry/admin/createIndustry.ts";
import {useNavigate} from "react-router-dom";
import FormTitleNMetadata from "../../components/FormTitleNMetadata.tsx";
import {useExitWhenNoPermission} from "../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../constants/role.ts";
import usePageTitle from "../../hooks/usePageTitle.ts";

const callApi = (industryName: string, industryInformation: string) => {
    const data: CreateIndustryAdminRequest = {
        industryName,
        industryInformation
    }
    createIndustry(data);
}

const AdminIndustryCreatePage = () => {
    const nav = useNavigate();
    const industryName = useRef<HTMLInputElement>(null);
    const industryInfo = useRef<HTMLTextAreaElement>(null);
    useExitWhenNoPermission(nav, Role.ADMIN);
    usePageTitle(`산업군 생성`);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!industryName.current || industryName.current.value.trim().length === 0) {
            alert("산업군 이름을 입력해주세요.");
            return;
        }
        if (!industryInfo.current || industryInfo.current.value.trim().length === 0) {
            alert("산업 메타데이터를 입력해주세요.");
            return;
        }
        callApi(industryName.current.value, industryInfo.current.value);
        nav(`/industry/list`, {replace: true});
    };

    return (
        <>
            <FormTitleNMetadata
                onSubmit={onSubmit}
                titlePlaceHolder="산업 이름"
                titleRef={industryName}
                metaDataPlaceHolder="산업 메타데이터"
                metaDataRef={industryInfo}
                submitButtonText="입력"
            />
        </>
    )
}

export default AdminIndustryCreatePage;