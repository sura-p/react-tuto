export const apiKeys = {
    Login: "/auth/login",
    SignUp: "/user/signup",
    CUList:'/contacts/peers',
    Messages:'/message/list',
    ProfileUpdate:'/auth/update-profile',
    GetProfile:'/auth/get-profile',
    Search:'/contacts/search-peer',
    AddPeer:'/contacts/save-contact'
    
}
export const apiConfig = process.env.REACT_APP_BACKEND_URL;