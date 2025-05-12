import {FormEvent, useEffect} from "react";
import {IndustryInfoResponse} from "../../api/industry/types/IndustryInfoResponse.ts";
import {useIndustryInfo} from "../../hooks/useIndustryInfo.ts";

interface CompanyEditProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    titlePlaceHolder: string;
    companyNameValue: string;
    onCompanyNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    companyInformationPlaceHolder: string;
    companyInformationValue: string;
    onCompanyInformationChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    industryIdValue: number;
    onIndustryIdChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    submitButtonText: string
}

const CompanyEdit = (
    {
        onSubmit,
        titlePlaceHolder,
        companyNameValue,
        onCompanyNameChange,
        companyInformationPlaceHolder,
        companyInformationValue,
        onCompanyInformationChange,
        submitButtonText,
        industryIdValue,
        onIndustryIdChange
    }: CompanyEditProps) => {
    const {industryInfoArray, updateInfo} = useIndustryInfo();
    useEffect(() => {
        updateInfo();
    }, [])
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={titlePlaceHolder} value={companyNameValue} onChange={onCompanyNameChange}/>
            <select value={industryIdValue} onChange={onIndustryIdChange}>
                {
                    industryInfoArray.length === 0 ? <></> :
                        industryInfoArray.map((industryInfoResponse: IndustryInfoResponse) =>
                            <option key={industryInfoResponse.industryId} value={industryInfoResponse.industryId}>
                                {industryInfoResponse.industryName}
                            </option>
                        )
                }
            </select>
            <br/>
            <textarea rows={5} cols={40} placeholder={companyInformationPlaceHolder} value={companyInformationValue}
                      onChange={onCompanyInformationChange}/>
            <br/>
            <button type="submit">{submitButtonText}</button>
        </form>
    )
}

export default CompanyEdit;