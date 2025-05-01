import styled from "styled-components";
import LogoIcon from "../assets/LogoIcon.tsx";
import {useNavigate} from "react-router-dom";
import {getAccessToken, getUserInfo} from "../util/storage.ts";
import {useEffect, useState} from "react";

interface Colors {
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
                    <HeaderLinkListItem>
                        <HeaderLinkListItemA
                            color={currentColor.LinkItemTextColor} background={currentColor.LinkItemBackgroundColor}
                            hover_color={currentColor.LinkItemTextHoverColor}
                            onClick={() => nav("/")} aria-current="page">
                            Home
                        </HeaderLinkListItemA>
                    </HeaderLinkListItem>
                    {
                        getAccessToken() ?
                            ( // 로그인 했을 경우
                                <HeaderLinkListItem>
                                    <HeaderLinkListItemA
                                        color={currentColor.LinkItemTextColor}
                                        background={currentColor.LinkItemBackgroundColor}
                                        hover_color={currentColor.LinkItemTextHoverColor}
                                        onClick={() => nav("/profile")}>
                                        내 정보
                                    </HeaderLinkListItemA>
                                </HeaderLinkListItem>
                            ) : (
                                <>
                                    <HeaderLinkListItem>
                                        <HeaderLinkListItemA
                                            color={currentColor.LinkItemTextColor}
                                            background={currentColor.LinkItemBackgroundColor}
                                            hover_color={currentColor.LinkItemTextHoverColor}
                                            onClick={() => nav("/signup")}>
                                            회원가입
                                        </HeaderLinkListItemA>
                                    </HeaderLinkListItem>
                                    <HeaderLinkListItem>
                                        <HeaderLinkListItemA
                                            color={currentColor.LinkItemTextColor}
                                            background={currentColor.LinkItemBackgroundColor}
                                            hover_color={currentColor.LinkItemTextHoverColor}
                                            onClick={() => nav("/login")}>
                                            로그인
                                        </HeaderLinkListItemA>
                                    </HeaderLinkListItem>
                                </>
                            )
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
`;

const HeaderLinkList = styled.ul`
    list-style-type: none;
    margin: 0px;
    padding: 0px;
    overflow: hidden;
`;

const HeaderLinkListItem = styled.li`
    float: left;
    padding: 10px;
`;

const HeaderLinkListItemA = styled.a<{ background: string, color: string, hover_color: string }>`
    background: ${(props) => props.background};
    display: block;
    color: ${(props) => props.color};
    padding: 6px;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;

    &:hover {
        cursor: pointer;
        color: ${(props) => props.hover_color};
    }
`;