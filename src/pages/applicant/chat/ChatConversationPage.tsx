import {useNavigate, useParams} from "react-router-dom";
import supervisorChat from "../../../api/chat/applicant/supervisorChat.ts";
import {
    MockInterviewChatApplicantRequest
} from "../../../api/chat/applicant/types/MockInterviewChatApplicantRequest.ts";
import React, {FormEvent, useEffect, useMemo, useRef, useState} from "react";
import styled from "styled-components";
import chatHistory from "../../../api/chat/applicant/chatHistory.ts";
import ChatBox from "../../../components/chat/ChatBox.tsx";
import ChatTextInputForm from "../../../components/chat/ChatTextInputForm.tsx";
import {getCurrentTime} from "../../../util/getCurrentTime.ts";
import {getUserInfo} from "../../../util/storage.ts";
import {useExitWhenNoPermission} from "../../../hooks/useExitWhenNoPermission.ts";
import {Role} from "../../../constants/role.ts";
import usePageTitle from "../../../hooks/usePageTitle.ts";

const callChatHistoryApi = async (chatId: number, lastConversationCreatedAt: string | null) => {
    return await chatHistory(chatId, {lastConversationCreatedAt, amount: 1000});
}

const callSupervisorChatApi = async (chatId: number, payload: MockInterviewChatApplicantRequest) => {
    console.log(chatId, payload);
    return await supervisorChat(chatId, payload);
}

interface ChatMessage {
    id: number | null;
    sender: "USER" | "ASSISTANT";
    text: string;
}

const ChatConversationPage = () => {
    const {chatId, mode} = useParams();
    const nav = useNavigate();
    const [inputDisabled, setInputDisabled] = useState(false);
    const [lastApiCalledTime, setLastApiCalledTime] = useState("");
    const [userMessage, setUserMessage] = useState("");
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [topLoading, setTopLoading] = useState(false)
    const [bottomLoading, setBottomLoading] = useState(false)
    const [lastKey, setLastKey] = useState(0)

    const startOfBoxRef: React.Ref<HTMLDivElement> = useRef(null);
    const endOfBoxRef: React.Ref<HTMLDivElement> = useRef(null);

    const userInfo = getUserInfo();
    useExitWhenNoPermission(useNavigate(), Role.ALL);
    usePageTitle(`${userInfo?.userName}님의 채팅`);

    if (!mode) {
        nav("/", {replace: true});
    }

    const chatApi = useMemo(() => {
        if (mode === "supervisor") {
            return callSupervisorChatApi;
        }
        return callSupervisorChatApi;
        // modes : "normal", "tools", "react"
    }, [mode, nav])

    useEffect(() => {
        if (!chatId || !mode || mode !== "supervisor") {
            nav("/", {replace: true});
        }
    }, [mode, nav]);

    useEffect(() => {
        callChatHistoryApi(Number(chatId), null).then((response) => {
                setLastApiCalledTime(getCurrentTime());
                setMessages(response.conversationLogInfos.content.reverse().map((conversationLogInfo): ChatMessage => {
                    return {
                        id: conversationLogInfo.conversationLogId,
                        sender: conversationLogInfo.messageType,
                        text: conversationLogInfo.message
                    };
                }))
                const maxId = Math.max(...response.conversationLogInfos.content.map((conversationLogInfo) => conversationLogInfo.conversationLogId));
                setLastKey(maxId);
            }
        );
    }, []);

    useEffect(() => {
        endOfBoxRef.current?.scrollIntoView({behavior: "smooth", block: "end"});
    }, [messages]);

    const onchange = (e: React.ChangeEvent<HTMLInputElement>) => setUserMessage(e.target.value);
    const onclick = () => {
        if (!messages) {
            return;
        }
        setInputDisabled(true);

        setLastApiCalledTime(getCurrentTime());
        setMessages(prev => [...prev, {id: lastKey + 1, sender: "USER", text: userMessage}]);
        setUserMessage("");
        setBottomLoading(true);
        chatApi(Number(chatId), {userMessage}).then((response: string) => {
            setLastApiCalledTime(getCurrentTime());
            setMessages(prev => [...prev, {id: lastKey + 2, sender: "ASSISTANT", text: response}]);
        }).finally(() => {
            setBottomLoading(false);
            setInputDisabled(false);
            setLastKey(lastKey + 2);
        });
    };

    const onsubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onclick();
    }

    return (
        <ChatPageBody>
            <ChatContainerDiv id="chat-container">
                <ChatBox messages={messages} lastApiCalledTime={lastApiCalledTime} startOfBoxRef={startOfBoxRef}
                         endOfBoxRef={endOfBoxRef}
                         topLoading={topLoading} bottomLoading={bottomLoading}/>
                <ChatTextInputForm onsubmit={onsubmit} onclick={onclick} onchange={onchange} userMessage={userMessage}
                                   inputDisabled={inputDisabled}/>
            </ChatContainerDiv>
        </ChatPageBody>
    )
}

export default ChatConversationPage;

const ChatPageBody = styled.div`
    font-family: Arial, sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
    background-color: #ffffff;
`;

const ChatContainerDiv = styled.div`
    width: 80vw;
    height: 75vh;
    display: flex;
    flex-direction: column;
    border: 2px solid #ccc;
    border-radius: 10px;
    background: white;
    padding: 10px;
`;