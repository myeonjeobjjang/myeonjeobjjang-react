import {LoginOrSignUpResponse} from "./types/loginOrSignUpResponse.ts";
import basicAxiosInstance from "../basicAxiosInstance.ts";
import {SignUpRequest} from "./types/signUpRequest.ts";
import {setUserInfos} from "../../util/storage.ts";

async function signUp(post: SignUpRequest): Promise<LoginOrSignUpResponse> {
    return await basicAxiosInstance.post(
        "http://localhost:8080/api/visitor/members/sign-up",
        post
    ).then((response) => {
            setUserInfos(response.data);

            console.log(response.data);
            return response.data;
        }
    ).catch((error) => {
        const {response: {data: {message}}} = error;
        alert(message);
        return null;
    });
}

export default signUp;