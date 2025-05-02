import styled from "styled-components";
import LogoIcon from "../../assets/LogoIcon.tsx";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {getUserInfo} from "../../util/storage.ts";
import {useEffect, useState} from "react";
import {MemberInfoResponse} from "../../api/member/types/loginOrSignUpResponse.ts";
import HeaderLinkListItem from "./HeaderLinkListItem.tsx";

export interface Colors {
    LogoColor: string;
    HeaderUnderlineColor: string;
    LinkItemBackgroundColor: string;
    LinkItemTextColor: string;
    LinkItemTextHoverColor: string;
}

const NormalColors: Colors = {
    LogoColor: "#ed7233",
    HeaderUnderlineColor: "#974820",
    LinkItemBackgroundColor: "#ea936c",
    LinkItemTextColor: "#ffffff",
    LinkItemTextHoverColor: "#783a1b"
}

const CompanyColors: Colors = {
    LogoColor: "#335eed",
    HeaderUnderlineColor: "#203897",
    LinkItemBackgroundColor: "#6c76ea",
    LinkItemTextColor: "#ffffff",
    LinkItemTextHoverColor: "#1b2378"
}

const AdminColors: Colors = {
    LogoColor: "#000000",
    HeaderUnderlineColor: "#000000",
    LinkItemBackgroundColor: "#000000",
    LinkItemTextColor: "#ffffff",
    LinkItemTextHoverColor: "#9f9f9f"
}

const profileListItem = (currentColor: Colors, nav: NavigateFunction) => (
    <HeaderLinkListItem color={currentColor} onClick={() => nav("/profile")} content="내 정보"/>
)

const listItemByRole = (userInfo: MemberInfoResponse | null, currentColor: Colors, nav: NavigateFunction) => {
    if (!userInfo) {
        return (
            <>
                <HeaderLinkListItem color={currentColor} onClick={() => nav("/signup")} content="회원가입"/>
                <HeaderLinkListItem color={currentColor} onClick={() => nav("/login")} content="로그인"/>
            </>
        );
    }
    switch (userInfo.role) {
        case "ROLE_APPLICANT":
            return (
                <>
                    {profileListItem(currentColor, nav)}
                </>
            )
        case "ROLE_COMPANY":
            return (
                <>
                    {profileListItem(currentColor, nav)}
                </>
            )
        case "ROLE_ADMIN":
            return (
                <>
                    <HeaderLinkListItem color={currentColor} onClick={() => nav("/admin")} content="관리"/>
                    {profileListItem(currentColor, nav)}
                </>
            )
    }
}

const Header = () => {
    const nav = useNavigate();
    const [currentColor, setCurrentColor] = useState(NormalColors);

    useEffect(() => {
        const userInfo = getUserInfo();
        if (!userInfo || (userInfo.role === "ROLE_APPLICANT")) {
            setCurrentColor(NormalColors);
        } else if (userInfo.role === "ROLE_COMPANY") {
            setCurrentColor(CompanyColors);
        } else if (userInfo.role === "ROLE_ADMIN") {
            setCurrentColor(AdminColors);
        }
    });

    return (
        <HeaderContainer underline_color={currentColor.LogoColor} className="Header ">
            <HeaderLogoContainer onClick={() => nav("/")}>
                <LogoIcon color={currentColor.LogoColor} height="35px" width="35px"/>
                <HeaderLogoContent color={currentColor.LogoColor}>면접짱</HeaderLogoContent>
            </HeaderLogoContainer>
            <div>
                <HeaderLinkList>
                    <HeaderLinkListItem color={currentColor} onClick={() => nav("/site-map")} content="사이트 맵"/>
                    {
                        listItemByRole(getUserInfo(), currentColor, nav)
                    }
                </HeaderLinkList>
            </div>
        </HeaderContainer>
    )
};

export default Header;

const HeaderContainer = styled.div<{ underline_color: string }>`
    display: flex;
    flex-flow: row;
    padding: 0px;
    margin: 5px;
    justify-content: space-between;
    border-bottom: 2px solid ${(props) => props.underline_color};
`;

const HeaderLogoContainer = styled.a`
    text-decoration-line: none;
    display: flex;
    margin: 10px;
    align-items: center;

    &:hover {
        cursor: pointer;
    }
`;

const HeaderLogoContent = styled.span<{ color: string }>`
    @font-face {
        font-family: 'UhBeeSe_hyun';
        src: url('https://gcore.jsdelivr.net/gh/projectnoonnu/noonfonts_five@.2.0/UhBeeSe_hyun.woff') format('woff');
        font-weight: normal;
        font-style: normal;
    };
    color: ${(props) => props.color};
    font-size: 20px;
    font-family: 'UhBeeSe_hyun', sans-serif;
    min-width: 65px;
`;

const HeaderLinkList = styled.ul`
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
`;