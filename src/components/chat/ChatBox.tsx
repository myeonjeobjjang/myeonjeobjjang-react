import styled from "styled-components";
import React from "react";
import {ThreeDot} from "react-loading-indicators";

interface ChatMessage {
    id: number | null;
    sender: "USER" | "ASSISTANT";
    text: string;
}

interface ChatBoxProps {
    messages: ChatMessage[];
    lastApiCalledTime: string;
    startOfBoxRef: React.Ref<HTMLDivElement>;
    endOfBoxRef: React.Ref<HTMLDivElement>;
    topLoading: boolean;
    bottomLoading: boolean;
}

const ChatBox = ({messages, startOfBoxRef, endOfBoxRef, topLoading, bottomLoading}: ChatBoxProps) => {
    console.log(messages);
    return (
        <>
            <ChatBoxDiv id="chat-box">
                <div ref={startOfBoxRef}/>
                <LoadingIndicatorContainer>
                    {
                        topLoading ? <ThreeDot color="#7b7b7b" size="small" text="" textColor=""/> : <></>
                    }
                </LoadingIndicatorContainer>
                {
                    messages.map((chatMessage) => {
                        return (
                            <MessageContainer key={chatMessage.id} sender={chatMessage.sender}>
                                <MessageDiv sender={chatMessage.sender}>
                                    {chatMessage.text}
                                </MessageDiv>
                            </MessageContainer>
                        )
                    })
                }
                <LoadingIndicatorContainer>
                    {
                        bottomLoading ? <ThreeDot color="#7b7b7b" size="small" text="" textColor=""/> : <></>
                    }
                </LoadingIndicatorContainer>
                <div ref={endOfBoxRef}/>
            </ChatBoxDiv>
        </>
    )
}

export default React.memo(ChatBox, (prevProps, nextProps) => {
    if (prevProps.messages.length !== nextProps.messages.length) {
        return false;
    }
    if (prevProps.lastApiCalledTime !== nextProps.lastApiCalledTime) {
        return false;
    }
    return true;
});

const ChatBoxDiv = styled.div`
    flex-grow: 1;
    overflow-y: auto;
    border-bottom: 1px solid #ccc;
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const LoadingIndicatorContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
`;

const MessageContainer = styled.div<{ sender: "USER" | "ASSISTANT" }>`
    display: flex;
    width: 100%;
    justify-content: ${({sender}) =>
            sender === "USER" ? "flex-end" : "flex-start"
    };
`;

const MessageDiv = styled.div<{ sender: "USER" | "ASSISTANT" }>`
    max-width: 60%;
    padding: 10px;
    border-radius: 10px;
    word-wrap: break-word;
    background-color: ${({sender}) =>
            sender === "USER" ? "#dcf8c6" : "#f1f1f1"
    };
    text-align: ${({sender}) =>
            sender === "USER" ? "right" : "left"
    };
    align-self: ${({sender}) =>
            sender === "USER" ? "flex-end" : "flex-start"
    };
`;