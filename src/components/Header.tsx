import styled from "styled-components";
import LogoIcon from "../assets/LogoIcon.tsx";
import {useNavigate} from "react-router-dom";
import {getAccessToken} from "../util/storage.ts";

const enum Colors {
    LogoColor = "#ed7233",
    HeaderUnderlineColor = "#974820",
    LinkItemBackgroundColor = "#ea936c",
    LinkItemTextColor = "#ffffff",
    LinkItemTextHoverColor = "#783a1b",
}

const Header = () => {
    const nav = useNavigate();
    return (
        <HeaderContainer underline_color={Colors.HeaderUnderlineColor} className="Header ">
            <HeaderLogoContainer onClick={() => nav("/")}>
                <LogoIcon color={Colors.LogoColor} height="35px" width="35px"/>
                <HeaderLogoContent color={Colors.LogoColor}>면접짱</HeaderLogoContent>
            </HeaderLogoContainer>
            <div>
                <HeaderLinkList>
                    <HeaderLinkListItem>
                        <HeaderLinkListItemA
                            color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                            hover_color={Colors.LinkItemTextHoverColor}
                            onClick={() => nav("/")} aria-current="page">
                            Home
                        </HeaderLinkListItemA>
                    </HeaderLinkListItem>
                    {
                        getAccessToken() ?
                            ( // 로그인 했을 경우
                                <HeaderLinkListItem>
                                    <HeaderLinkListItemA
                                        color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                                        hover_color={Colors.LinkItemTextHoverColor}
                                        href="#">
                                        Profile
                                    </HeaderLinkListItemA>
                                </HeaderLinkListItem>
                            ) : (
                                <>
                                    <HeaderLinkListItem>
                                        <HeaderLinkListItemA
                                            color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                                            hover_color={Colors.LinkItemTextHoverColor}
                                            onClick={() => nav("/signup")}>
                                            회원가입
                                        </HeaderLinkListItemA>
                                    </HeaderLinkListItem>
                                    <HeaderLinkListItem>
                                        <HeaderLinkListItemA
                                            color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                                            hover_color={Colors.LinkItemTextHoverColor}
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
    //background: darkgray;
    display: flex;
    flex-flow: row;
    padding: 0px;
    //border-radius: 8px;
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
    color: ${(props) => props.color};
    font-size: 25px;
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