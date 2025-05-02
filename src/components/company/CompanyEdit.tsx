import {FormEvent, useEffect} from "react";
import {IndustryInfoResponse} from "../../api/industry/types/IndustryInfoResponse.ts";
import {useIndustryInfo} from "../../hooks/useIndustryInfo.ts";

interface CompanyEditProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    titlePlaceHolder: string;
    titleRef: React.RefObject<HTMLInputElement | null>;
    companyInformationPlaceHolder: string;
    companyInformationRef: React.RefObject<HTMLTextAreaElement | null>;
    industryIdRef: React.RefObject<HTMLSelectElement | null>;
    submitButtonText: string
}

const CompanyEdit = (
    {
        onSubmit,
        titlePlaceHolder,
        titleRef,
        companyInformationPlaceHolder,
        companyInformationRef,
        submitButtonText,
        industryIdRef
    }: CompanyEditProps) => {
    const {industryInfoArray, updateInfo} = useIndustryInfo();
    useEffect(() => {
        updateInfo();
    }, [])
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={titlePlaceHolder} ref={titleRef}/>
            <select ref={industryIdRef}>
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
            <textarea rows={5} cols={40} placeholder={companyInformationPlaceHolder} ref={companyInformationRef}/>
            <br/>
            <button type="submit">{submitButtonText}</button>
        </form>
    )
}

export default CompanyEdit;