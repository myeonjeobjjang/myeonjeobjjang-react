import {SliceInterface} from "../../../common/types/SliceInterface.ts";

export interface ConversationLogNoOffsetGetResponse {
    lastConversationCreatedAt: string;
    conversationLogInfos: SliceInterface<ConversationLogInfo>;
}

export interface ConversationLogInfo {
    conversationLogId: number;
    message: string
    messageType: string;
}