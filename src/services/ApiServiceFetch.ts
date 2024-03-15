import { ResponseApi } from '@/@types/auth';
//import BaseService from './BaseService'
//import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiServiceFetch = {    
        async fetchData<T>(url: string,param:any,method:string): Promise<ResponseApi<T>> {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(param)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData= await response.json();            
            debugger
    
            // Construir la respuesta con los datos recibidos
            const jsonResponse: ResponseApi<T> = {
                succeeded: responseData.succeeded,
                codeError: responseData.codeError,
                message: responseData.message,
                data: responseData.data
            };
    
            return jsonResponse;
        } catch (error) {
            // En caso de error, construir la respuesta con el mensaje de error
            const errorResponse: ResponseApi<T> = {
                succeeded: false,
                codeError: "ERROR",
                message: "",
                data: null
            };
    
            return errorResponse;
        }
    }
}

export default ApiServiceFetch
