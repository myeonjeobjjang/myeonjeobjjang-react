import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import {useIndustryInfo} from "../../../hooks/useIndustryInfo.ts";

const IndustryListPage = () => {
    const nav = useNavigate();
    useExitWhenNoPermission(nav, Role.ALL);
    usePageTitle(`산업군 리스트`);
    const {industryInfoArray, updateInfo} = useIndustryInfo();

    useEffect(() => {
        updateInfo();
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
                {industryInfoArray.map((industry) => (
                    <IndustryInfoTr onClick={() => nav(`/industry/${industry.industryId}`)} key={industry.industryId}>
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