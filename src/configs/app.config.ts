import { APP_PREFIX_PATH } from "@/constants/route.constant"

export type AppConfig = {
    apiPrefix: string
    authenticatedEntryPath: string
    unAuthenticatedEntryPath: string
    tourPath: string
    locale: string
    enableMock: boolean
}

const appConfig: AppConfig = {
    apiPrefix: '/api',    
    authenticatedEntryPath: `${APP_PREFIX_PATH}/home`,
    unAuthenticatedEntryPath: '/login',
    tourPath: '/',
    locale: 'es',
    enableMock: true,
}

export default appConfig
