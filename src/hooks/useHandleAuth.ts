import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import api_endpoints from "../config/api";
import useHandleAxios from "./useHandleAxios";
import type { AxiosStateType, AxiosTreatmentType } from "../@types/axios-type";
import useHandleNavigate from "./useHandleNavigate";

const useHandleAuth = ({verifyAuth,sendEmail}:{verifyAuth:boolean,sendEmail:boolean})=>{

    const currentAuthContext = useContext(AuthContext);
    const {onRequest,axiosState,onCreateCancelToken,onTreatmentProvider} = useHandleAxios();
    const [authQueryState,setAuthQueryState] = useState<AxiosStateType>(axiosState);
    const {onNavigate} = useHandleNavigate();
    const [emailForCheckout,setEmailForCheckout] = useState("");

    useEffect(()=>{

        verifyAuth
        &&
        setAuthQueryState(axiosState)

    },[axiosState])

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
        onCheckout("get");
    },[])    

      const onCheckout = (method:'get'|'post',code?:string,treatment?:AxiosTreatmentType)=>{
            
            onRequest({
            method:method,
            url:api_endpoints.auth.checkout+"?sendEmail="+sendEmail,
            cancelToken:onCreateCancelToken(),
            body:
                method === 'post'
                ? {code:code}
                : {}
            },
            {
             onThen(result) {
                const currentResult = result.response.data
                method === 'get'
                && (()=>{
                    currentAuthContext.setIsAuth(true)
                })()
                    setEmailForCheckout(currentResult.email)
                    currentAuthContext.setIsChecked(currentResult.is_checked)
                    !!treatment?.onThen
                    &&
                    treatment?.onThen(result);
            },
             onCatch(error) {
                 console.log("checkout_error",error)
                method === 'get'
                &&
                (()=>{
                    currentAuthContext.setIsAuth(false)
                })()
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
        onForgot,
        authQueryState,
        emailForCheckout
    }

}

export default useHandleAuth