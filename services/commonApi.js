import axios from 'axios';


export const commonApi = async (httpRequestType, url, reqBody, reqHeader) => {
    const reqConfig = {
        method: httpRequestType,
        url: url,
        data: reqBody,
        headers: reqHeader || { "Content-Type": "application/json" },
    };

    console.log("API Request Config:", reqConfig); // Debugging the request

    try {
        const result = await axios(reqConfig);
        console.log("API Response:", result); // Debugging the response
        return result;
    } catch (err) {
        console.error("API Error:", err); // Debugging errors
        throw err;
    }
};
