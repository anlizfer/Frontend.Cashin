import { apiSignIn,apiSignUp,apiSignOut } from '@/services/AuthService'
//import { apiSignIn, apiSignOut, apiSignUp } from '@/services/AuthService'
import {
    setUser,
    signInSuccess,
    signOutSuccess,
    useAppSelector,
    useAppDispatch,
    CompanyState,
} from '@/store'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'
import type { SignInCredential, SignUpCredential } from '@/@types/auth'
import { jwtDecode } from 'jwt-decode'

type Status = 'success' | 'failed'

function useAuth() {
    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { token, signedIn } = useAppSelector((state) => state.auth.session)


    let getPayloadCompanies=(jwtToken:string)=>{          
        let objPayloadToken=jwtDecode<{ company: string }>(jwtToken);
        return objPayloadToken.company;
    }


    const signIn = async (
        values: SignInCredential
    ): Promise<
        | {
              status: Status
              message: string
          }
        | undefined
    > => {
        try {
            const resp = await apiSignIn(values)
            
            if (resp.succeeded) {
                const  {token}  = resp.data!;
                
                dispatch(signInSuccess(token))
                const Companies=getPayloadCompanies(token);                
                const CompaniesJSON = JSON.parse(Companies);
                let CompaniesArra:CompanyState[]=[];

                
                
                CompaniesJSON.company.forEach((company: { Id: number, Name: string }) => {                    
                    CompaniesArra.push({
                        id:company.Id,
                        name:company.Name
                    });
                });

                debugger

                if (resp.succeeded) {

                    //console.log("ANGEL ",resp.data);

                    dispatch(
                        setUser(                            
                            {
                                avatar: resp.data?.avatar,
                                userName: resp.data?.userName,
                                authority: resp.data?.authority,
                                email: resp.data?.email,
                                companies:CompaniesArra,
                                companyDefault:CompaniesArra[0]
                            }
                        )
                    )
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: '',
                }
            }else{
                return {
                    status: 'failed',
                    message: resp.message,
                }     
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signUp = async (values: SignUpCredential) => {
        try {
            const resp = await apiSignUp(values)                        
            if (resp.succeeded) {                
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(
                    redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath
                )
                return {
                    status: 'success',
                    message: 'Registro generado con éxito, Bienvenido a Cashin',
                }
            }else{
                return {
                    status: 'failed',
                    message: resp.message,
                }     
            }
            // eslint-disable-next-line  @typescript-eslint/no-explicit-any
        } catch (errors: any) {
            
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const handleSignOut = () => {
        dispatch(signOutSuccess())
        dispatch(
            setUser({
                avatar: '',
                userName: '',
                email: '',
                authority: [],
            })
        )
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        //await apiSignOut()
        handleSignOut()
    }

    return {
        authenticated: token && signedIn,
        signIn,
        signUp,
        signOut,
    }

    return {
        authenticated: token && signedIn,
        signIn       
    }
}

export default useAuth
