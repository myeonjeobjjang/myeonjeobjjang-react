import styled from "styled-components";
import {FormEvent} from "react";

interface ChatTextInputFormProps {
    onclick: () => void;
    onsubmit: (e: FormEvent<HTMLFormElement>) => void;
    inputDisabled: boolean;
    onchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    userMessage: string;
}

const ChatTextInputForm = ({onsubmit, onchange, onclick, inputDisabled, userMessage}: ChatTextInputFormProps) => {
    return (
        <>
            <form onSubmit={onsubmit}>
                <InputContainer>
                    <UserInputMessage type="text" id="user-input" placeholder="메시지를 입력하세요..." onChange={onchange}
                                      value={userMessage} disabled={inputDisabled}/>
                    <SendButton id="send-btn" onClick={() => onclick()} disabled={inputDisabled}>전송</SendButton>
                </InputContainer>
            </form>
        </>
    )
}

export default ChatTextInputForm;

const InputContainer = styled.div`
    display: flex;
    padding: 10px;
    gap: 10px;
`;

const UserInputMessage = styled.input`
    flex: 1;
    padding: 5px;
`;

const SendButton = styled.button`
    padding: 5px 15px;

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;