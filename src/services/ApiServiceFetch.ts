import { ResponseApi } from '@/@types/auth';
//import BaseService from './BaseService'
//import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

const ApiServiceFetch = {    
        async fetchData<T>(url: string,param:any,method:string): Promise<ResponseApi<T>> {
        try {

            let options: RequestInit = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            if (method === 'POST') {
                options.method = 'POST';
                options.body = JSON.stringify(param);
            }

            const response = await fetch(url, options);

          

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }    
            const responseData= await response.json();                       
    
            // Construir la respuesta con los datos recibidos
            const jsonResponse: ResponseApi<T> = {
                succeeded: responseData.succeeded,
                codeError: responseData.codeError,
                message: responseData.message,
                data: responseData.data,
                meta:responseData.meta
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
