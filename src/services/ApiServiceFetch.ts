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
                const errorMessage = await response.text(); 
                throw new Error(errorMessage);
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
        } catch (errors:any) {            
            let ErrorFetch:string=errors.toString();
            ErrorFetch=ErrorFetch.replace("Error:","");
            console.log(ErrorFetch);
            const errorMessageJSON = JSON.parse(ErrorFetch);
            // En caso de error, construir la respuesta con el mensaje de error
            const errorResponse: ResponseApi<T> = {
                succeeded: false,
                codeError: "ERROR",
                message: errorMessageJSON.Message,
                data: null,
                meta:{
                    totalCount:0
                }
            };
    
            return errorResponse;
        }
    }
}

export default ApiServiceFetch
