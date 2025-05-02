import getIndustryList from "../../../api/industry/applicant/getIndustryList.ts";
import {useEffect, useState} from "react";
import {IndustryInfoResponse} from "../../../api/industry/types/IndustryInfoResponse.ts";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";

const callApi = async () => {
    const industryList = await getIndustryList();
    return industryList;
}

const initialData: IndustryInfoResponse[] = [];

const IndustryListPage = () => {
    const nav = useNavigate();
    useExitWhenNoPermission(nav, Role.ALL);
    usePageTitle(`산업군 리스트`);

    const [industries, setIndustries] = useState(initialData);
    useEffect(() => {
        callApi().then(data => {
                setIndustries(data.industries);
            }
        );
    }, []);
    return (
        <>
            <h2>산업군 리스트</h2>
            <IndustryTable>
                <thead>
                <IndustryHeadTr>
                    <th>ID</th>
                    <th>이름</th>
                    <th>설명</th>
                </IndustryHeadTr>
                </thead>
                <tbody>
                {industries.map((industry) => (
                    <IndustryInfoTr onClick={() => nav(`/industry/${industry.industryId}`)}>
                        <td>{industry.industryId}</td>
                        <td>{industry.industryName}</td>
                        <td>{industry.industryInformation}</td>
                    </IndustryInfoTr>
                ))}
                </tbody>
            </IndustryTable>
        </>
    )
}

export default IndustryListPage;

const IndustryTable = styled.table`
    border-collapse: collapse;
    width: 100%;
`;

const IndustryHeadTr = styled.tr`
    text-align: center;
    border-bottom: 2.5px solid #707070;
`;

const IndustryInfoTr = styled.tr`
    text-align: center;
    border-bottom: 1.5px solid #bcbcbc;

    &:hover {
        cursor: pointer;
        background: aliceblue;
    }

    &:last-child {
        border-bottom: none;
    }
`;