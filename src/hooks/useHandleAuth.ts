import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import api_endpoints from "../config/api";
import useHandleAxios from "./useHandleAxios";
import type { AxiosStateType, AxiosTreatmentType } from "../@types/axios-type";
import useHandleNavigate from "./useHandleNavigate";

const useHandleAuth = ({verifyAuth}:{verifyAuth:boolean})=>{

    const currentAuthContext = useContext(AuthContext);
    const {onRequest,axiosState,onCreateCancelToken,onTreatmentProvider} = useHandleAxios();
    const [authQueryState,setAuthQueryState] = useState<AxiosStateType>(axiosState);
    const {onNavigate} = useHandleNavigate();

    useEffect(()=>{

        verifyAuth
        &&
        setAuthQueryState(axiosState)
    },[axiosState])

    const onGetToken = ()=>{
        const token = localStorage.getItem("auth_token")
        return token
    }

    const onEmailCooldown = (treatment?:AxiosTreatmentType)=>{

        const treatmentProvider = onTreatmentProvider(treatment)

        onRequest({
            method:"get",
            url:api_endpoints.auth.email_cooldown+"?token="+onGetToken(),
            cancelToken:onCreateCancelToken()
        },{
            onThen(result) {
                console.log(result)
                treatmentProvider.onThen(result)
            },
            onCatch(error) {
                console.log(error)
                treatmentProvider.onCatch(error)
            },
        })

    }

    const onLogout = ()=>{

        onRequest({
            method:"get",
            url:api_endpoints.auth.logout,
            cancelToken:onCreateCancelToken(),
        },
        {
             onThen() {
                currentAuthContext.setIsAuth(false)
                onNavigate("/")
             },
             onCatch(error) {
                console.log("logout_error",error)
             },
        })

    }   
      useEffect(()=>{
        verifyAuth
        &&
        onCheckout("get",false);
    },[])    

      const onCheckout = (method:'get'|'post',sendEmail:boolean,code?:string,treatment?:AxiosTreatmentType)=>{

            onRequest({
            method:method,
            url:api_endpoints.auth.checkout+"?sendEmail="+sendEmail+"&token="+onGetToken(),
            cancelToken:onCreateCancelToken(),
            body:
                (method === 'post'
                ? {code:code}
                : {})
            },
            {
             onThen(result) {
                console.log(result)
                const currentResult = result.data.data;                
                if(method === 'get'){
                    currentAuthContext.setIsAuth(true)
                }
                currentAuthContext.setIsChecked(currentResult.is_checked)
                !!treatment?.onThen
                &&
                treatment?.onThen(result);
            },
             onCatch(error) {
                 console.log("checkout_error",error)
                 console.log(currentAuthContext)
                 if(method === 'get'){
                    currentAuthContext.setIsAuth(false)
                 }
                treatment?.onCatch
                &&
                treatment.onCatch(error)
             },
            })
        }

        const onForgot = (method:'post'|'get',params:{
            email?:string,
            token?:string
        },treatment?:AxiosTreatmentType)=>{

            onRequest({
                method:method,
                url:api_endpoints.auth.forgot+(
                    method ===  'get'
                    ? "?token="+params.token
                    : ""
                ),
                cancelToken:onCreateCancelToken(),
                body:
                    method === 'post'
                    ? {
                    email:params.email
                    }
                    : {}
            },onTreatmentProvider(treatment))

        }

    return {
        currentAuthContext,
        onCheckout,
        onLogout,
        onEmailCooldown,
        onForgot,
        authQueryState,
    }

}

export default useHandleAuth