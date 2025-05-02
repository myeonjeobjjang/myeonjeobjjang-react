import {Colors} from "./Header.tsx";
import styled from "styled-components";
import {MouseEventHandler} from "react";

interface HeaderLinkListItemProps {
    color: Colors;
    onClick: MouseEventHandler;
    content: string;
}

const HeaderLinkListItem = ({color, onClick, content}: HeaderLinkListItemProps) => {
    return (
        <HeaderLinkListItemContainer>
            <HeaderLinkListItemA
                color={color.LinkItemTextColor}
                background={color.LinkItemBackgroundColor}
                hover_color={color.LinkItemTextHoverColor}
                onClick={onClick}>
                {content}
            </HeaderLinkListItemA>
        </HeaderLinkListItemContainer>
    );
}

const HeaderLinkListItemContainer = styled.li`
    float: left;
    padding: 10px;
    min-width: 65px;
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

export default HeaderLinkListItem;