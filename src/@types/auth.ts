//DtoRequestLogin
export type SignInCredential = {
    userName: string
    password: string
}

/*
"data": {
    "userName": "admin",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImFkbWluIiwicm9sZSI6IkFETUlOIiwibmJmIjoxNzEwNTE0MTQ3LCJleHAiOjE3MTA1MTc3NDcsImlhdCI6MTcxMDUxNDE0N30.sPduC29oaVOUa75dPYvM2H30gUNWU_x5kYV2HdR2vBY",
    "avatar": "/img/avatars/thumb-1.jpg",
    "authority": [
      "ADMIN"
    ],
    "email": "info@cashin.com"
  },
  "succeeded": true,
  "codeError": "",
  "message": "Bienvenido"
*/

// export type SignInResponse = {
//     token: string
//     user: {
//         userName: string
//         authority: string[]
//         avatar: string
//         email: string
//     }
// }

export type ResponseApi<T>={
    succeeded:boolean;
    codeError:string;
    message:string;
    data?:T | null;
}

export type SignInResponse={        
    
    userName:string;
    token:string;
    authority: string[];
    avatar: string;
    email: string;
    
}

export type SignUpResponse = SignInResponse

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    password: string
}
