
import { commonApi } from "./commonApi";


// const BASE_URL = process.env.REACT_APP_BACKEND_URL;


export const addProductApi = async (productDetails, reqHeader) => {
    return await commonApi('POST', `${process.env.REACT_APP_BACKEND_URL}/api/books`, productDetails, reqHeader)
}


export const getAllProduct = async (reqHeader) => {
    return await commonApi('GET', `${process.env.REACT_APP_BACKEND_URL}/api/books`, "", reqHeader)
}


export const deleteProjectApi = async (Id, reqHeader) => {
    try {
        const response = await commonApi('DELETE', `${process.env.REACT_APP_BACKEND_URL}/api/books/${Id}`, {}, reqHeader);
        return response; // Return the response from the API
    } catch (error) {
        console.error('Error deleting book:', error);
        throw error; // Re-throw error to handle it in the calling function
    }
};

export const bookDetailsById = async (Id, reqHeader) => {
    try {
        const response = await commonApi('GET', `${process.env.REACT_APP_BACKEND_URL}/api/books/${Id}`, {}, reqHeader);
        return response; 
    } catch (error) {
        console.error('Error fetching book details:', error);
        throw error; // Re-throw error to handle it in the calling function
    }
};