import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {useNavigate} from "react-router-dom";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";
import {useRef} from "react";

const ChatPage = () => {
    const nav = useNavigate();
    useExitWhenNoPermission(nav, Role.ALL);
    usePageTitle(`채팅 페이지`);
    const chatIdRef: React.Ref<HTMLInputElement> = useRef(null);

    const enterChat = () => {
        const chatId = chatIdRef.current?.value;
        nav(`/chat/${chatId}/supervisor`);
    }

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                enterChat();
            }}>
                <input type="number" ref={chatIdRef}/>
                <button onClick={enterChat}>채팅 입장</button>
            </form>
        </>
    )
}

export default ChatPage;