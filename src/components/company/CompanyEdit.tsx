import {FormEvent, useEffect, useState} from "react";
import getIndustryList from "../../api/industry/applicant/getIndustryList.ts";
import {IndustryInfoResponse} from "../../api/industry/types/IndustryInfoResponse.ts";

interface CompanyEditProps {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    titlePlaceHolder: string;
    titleRef: React.RefObject<HTMLInputElement | null>;
    companyInformationPlaceHolder: string;
    companyInformationRef: React.RefObject<HTMLTextAreaElement | null>;
    industryIdRef: React.RefObject<HTMLSelectElement | null>;
    submitButtonText: string
}

const initalIndustryInfoResponses: IndustryInfoResponse[] = [];

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
    const [industryList, setIndustryList] = useState(initalIndustryInfoResponses);
    useEffect(() => {
        const industryList = getIndustryListApi();
        industryList.then(industryList => {
            setIndustryList(industryList.industries);
        })
    }, [])
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={titlePlaceHolder} ref={titleRef}/>
            <select ref={industryIdRef}>
                {
                    industryList.length === 0 ? <></> :
                        industryList.map((industryInfoResponse: IndustryInfoResponse) =>
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

const getIndustryListApi = async () => {
    return await getIndustryList();
}