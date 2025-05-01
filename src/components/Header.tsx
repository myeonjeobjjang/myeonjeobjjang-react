import styled from "styled-components";
import LogoIcon from "../assets/LogoIcon.tsx";

const enum Colors {
    LogoColor = "#ed7233",
    HeaderUnderLineColor = "#974820",
    LinkItemBackgroundColor = "#ea936c",
    LinkItemTextColor = "#ffffff",
}

const Header = () => {
    return (
        <HeaderContainer underLineColor={Colors.HeaderUnderLineColor} className="Header ">
            <HeaderLogoContainer href="http://localhost:5173/">
                <LogoIcon color={Colors.LogoColor} height="35px" width="35px"/>
                <HeaderLogoContent color={Colors.LogoColor}>면접짱</HeaderLogoContent>
            </HeaderLogoContainer>
            <div>
                <HeaderLinkList>
                    <HeaderLinkListItem>
                        <HeaderLinkListItemA
                            color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                            href="#" aria-current="page">
                            Home
                        </HeaderLinkListItemA>
                    </HeaderLinkListItem>
                    <HeaderLinkListItem>
                        <HeaderLinkListItemA
                            color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                            href="#">
                            About
                        </HeaderLinkListItemA>
                    </HeaderLinkListItem>
                    <HeaderLinkListItem>
                        <HeaderLinkListItemA
                            color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                            href="#">
                            Services
                        </HeaderLinkListItemA>
                    </HeaderLinkListItem>
                    <HeaderLinkListItem>
                        <HeaderLinkListItemA
                            color={Colors.LinkItemTextColor} background={Colors.LinkItemBackgroundColor}
                            href="#">
                            Contact
                        </HeaderLinkListItemA>
                    </HeaderLinkListItem>
                </HeaderLinkList>
            </div>
        </HeaderContainer>
    )
};

export default Header;

const HeaderContainer = styled.div<{ underLineColor: string }>`
    //background: darkgray;
    display: flex;
    flex-flow: row;
    padding: 0px;
    //border-radius: 8px;
    margin: 5px;
    justify-content: space-between;
    border-bottom: 2px solid ${(props) => props.underLineColor};
`;

const HeaderLogoContainer = styled.a`
    text-decoration-line: none;
    display: flex;
    margin: 10px;
    align-items: center;
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

const HeaderLinkListItemA = styled.a<{ background: string, color: string }>`
    background: ${(props) => props.background};
    display: block;
    color: ${(props) => props.color};
    padding: 6px;
    border-radius: 8px;
    text-align: center;
    text-decoration: none;
`;