
const api_base = import.meta.env.VITE_API_BASE_URL;

const api_endpoints = {
    auth:{
        login:api_base+"auth/login",
        register:api_base+"auth/register",
        checkout:api_base+"auth/checkout",
        logout:api_base+"auth/logout",
        forgot:api_base+"auth/forgot",
        email_cooldown:api_base+"auth/email-cooldown"
        // recovery:api_base+"auth/recovery"
    },
    // notification:{
    //     post:api_base+"notification/post",
    //     get:api_base+"notification/get"
    // },
    // follow:{
    //     post:api_base+"user/post/follow"
    // },
    // user:{
    //     get:api_base+"user/get",
    //     put:api_base+"user/put"
    // },
    // post:{
    //     post:api_base+"publish/post",
    //     get:api_base+"publish/get",
    //     put:api_base+"publish/put",
    //     delete:api_base+"publish/delete"
    // },
    // commentary:{
    //     get:api_base+"commentary/get",
    //     post:api_base+"commentary/post",
    //     delete:api_base+"commentary/delete"
    // },
    // like:{
    //     get:api_base+"like/get",
    //     post:api_base+"like/post"
    // }
}

export default api_endpoints