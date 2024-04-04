import { API_SERVER, API_SERVER_AUTH_PREFIX } from '@/constants/route.constant'
import ApiService from './ApiService'
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
    ResponseApi,
} from '@/@types/auth'
import ApiServiceFetch from './ApiServiceFetch';

/*export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/sign-in',
        method: 'post',
        data,
    })
}*/

export async function apiSignIn(data: SignInCredential) {
    return ApiServiceFetch.fetchData<SignInResponse>(
        `${API_SERVER}${API_SERVER_AUTH_PREFIX}/Login`,
        data,
        'POST'
    );
}

export async function apiSignUp(data: SignUpCredential) {

    return ApiServiceFetch.fetchData<SignUpResponse>(
        `${API_SERVER}${API_SERVER_AUTH_PREFIX}/sign-up`,
        data,
        'POST'
    );

}

export async function apiSignOut() {
    /*return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    })*/
}

export async function apiForgotPassword(data: ForgotPassword) {
    /*return ApiService.fetchData({
        url: '/forgot-password',
        method: 'post',
        data,
    })*/
}

export async function apiResetPassword(data: ResetPassword) {
    /*return ApiService.fetchData({
        url: '/reset-password',
        method: 'post',
        data,
    })*/
}
