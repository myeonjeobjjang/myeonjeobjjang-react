import axios from "axios";

const basicAxiosInstance = axios.create({
    timeout: 10_000,
    headers: {
        "Content-Type": "application/json"
    }
});

basicAxiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const {response: {status, data : {errorCode, message, timeStamp}} } = error;
        console.log(`Error Response ${status} : ${errorCode} ${message} [${timeStamp}]`, error);
        return Promise.reject(error);
    }
)

export default basicAxiosInstance;