import {create} from "zustand/react";
import getIndustryList from "../api/industry/applicant/getIndustryList.ts";

export interface IndustryInfo {
    industryId: number;
    industryName: string;
    industryInformation: string;
}

interface IndustryInfoState {
    industryInfoArray: IndustryInfo[];
    updateInfo: () => void;
}

export const useIndustryInfo = create<IndustryInfoState>((set) => ({
    industryInfoArray: [],
    updateInfo: () => {
        getIndustryList().then(industryInfoResponses => {
            set({industryInfoArray: industryInfoResponses.industries});
        });
    },
}));