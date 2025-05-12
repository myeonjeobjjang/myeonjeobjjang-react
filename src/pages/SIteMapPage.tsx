import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import usePageTitle from "../hooks/usePageTitle.ts";

const hover_color = "#ed7233";

const SiteMapPage = () => {
    const nav = useNavigate();
    usePageTitle(`사이트맵`);
    const onClick = (path: string) => {
        nav(path);
    }
    return (
        <>
            <ul>
                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/")}>홈</SiteMapLi>
                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/login")}>로그인</SiteMapLi>
                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/profile")}>프로필</SiteMapLi>
                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/test")}>테스트</SiteMapLi>

                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/admin")}>관리자</SiteMapLi>

                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/industry")}>산업군</SiteMapLi>
                <ul>
                    <SiteMapLi hover_color={hover_color} onClick={() => onClick("/admin/industry/create")}>산업군 만들기</SiteMapLi>
                    <SiteMapLi hover_color={hover_color} onClick={() => onClick("/industry/list")}>산업군 리스트</SiteMapLi>
                </ul>

                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/company")}>회사</SiteMapLi>
                <ul>
                    <SiteMapLi hover_color={hover_color} onClick={() => onClick("/company/create")}>회사 생성</SiteMapLi>
                    <SiteMapLi hover_color={hover_color} onClick={() => onClick("/company/list-mine")}>관리 회사 목록</SiteMapLi>
                </ul>

                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/chat")}>채팅</SiteMapLi>

                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/no-permission")}>권한 없음</SiteMapLi>
                <SiteMapLi hover_color={hover_color} onClick={() => onClick("/not-found")}>페이지 없음</SiteMapLi>
            </ul>
        </>
    )
}

export default SiteMapPage;

const SiteMapLi = styled.li<{ hover_color: string }>`
    margin-bottom: 8px;

    &:hover {
        cursor: pointer;
        color: ${(props) => props.hover_color};
    }
`;