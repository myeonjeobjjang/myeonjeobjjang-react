import {FormEvent} from "react";

interface FormTitleNMetadata {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    titlePlaceHolder: string;
    titleRef: React.RefObject<HTMLInputElement | null>;
    metaDataPlaceHolder: string;
    metaDataRef: React.RefObject<HTMLTextAreaElement | null>;
    submitButtonText: string
}

const FormTitleNMetadata = (
    {
        onSubmit,
        titlePlaceHolder,
        titleRef,
        metaDataPlaceHolder,
        metaDataRef,
        submitButtonText
    }: FormTitleNMetadata) => {
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder={titlePlaceHolder} ref={titleRef}/>
            <br/>
            <textarea rows={5} cols={40} placeholder={metaDataPlaceHolder} ref={metaDataRef}/>
            <br/>
            <button type="submit">{submitButtonText}</button>
        </form>
    )
}

export default FormTitleNMetadata;