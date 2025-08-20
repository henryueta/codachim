import axios from "axios";
import type { AxiosActionType, AxiosDataType, AxiosStateType, AxiosTreatmentType } from "../@types/axios-type";
import { useReducer } from "react";

const initialQueryState:AxiosStateType = {

    isLoading:null,
    hasError:null,
    hasSuccess:null

}

const handleQueryState = (state:AxiosStateType,action:AxiosActionType)=>{

    switch (action.type) {
        case "loading":
            return {...state,isLoading:action.value}
        case "error":
            return {...state,...{
                hasError:action.value,
                hasSuccess:false
            }}
        case "success":
            return {...state,...{
                hasSuccess:action.value,
                hasError:false
            }}
        default:
            return {...state}
    }

}

const useHandleAxios = ()=>{

    const [axiosState,setAxiosState] = useReducer(handleQueryState,initialQueryState);

    const onCreateCancelToken = ()=>{
        const source = axios.CancelToken.source();
        return source.token
    }

    const onTreatmentProvider = (treatment?:AxiosTreatmentType)=>{

        return {
            onThen(result:any){
                return (
                    !!treatment
                    &&
                    !!treatment.onThen
                    &&
                    treatment.onThen(result)
                )
            },
            onCatch(error:unknown){
                return (
                    !!treatment
                    &&
                    !!treatment.onCatch
                    &&
                    treatment.onCatch(error)
                )
            },
            onFinally(){
                return (
                    !!treatment
                    &&
                    !!treatment.onFinally
                    &&
                    treatment.onFinally()
                )
            }
        }

    }

    const onGet = async (data:Omit<AxiosDataType,"method"|'body'>,treatment?:AxiosTreatmentType)=>{
        
        setAxiosState({
            type:"loading",
            value:true
        })

        const treatment_provider = 
        (!!treatment
        ?
        onTreatmentProvider(treatment)
        :
        null
        )

        return await axios.get(data.url,{
            cancelToken:data.cancelToken
        })
        .then((result)=>{
            treatment_provider?.onThen(result)
            setAxiosState({
                type:"success",
                value:true
            })
        }
        )
        .catch((error)=>{
            treatment_provider?.onCatch(error)
            setAxiosState({
                type:"error",
                value:true
            })
        }
                
        )
        .finally(()=>{
            treatment_provider?.onFinally()
            setAxiosState({
                type:"loading",
                value:false
            })
        }
        )
    }

    const onRequest = async (data:AxiosDataType,treatment?:AxiosTreatmentType)=>{

        const formData = new FormData()
        let response = null;
        const treatment_provider = 
        (!!treatment
        ?
        onTreatmentProvider(treatment)
        :
        null
        )

        

        if(!!(data.body)){
            Object.entries(data.body).forEach(([key,value])=>
                formData.append(key,value)
            )
        }

        try{
            console.log(data.url)
            response = axios.request({
                url:data.url,
                method:data.method,
                data:formData,
                headers:{
                    "Content-Type":"multipart/form-data"
                },
                cancelToken:data.cancelToken
            })

        }
        catch(error){
            console.log(error)
        }

        return await response
        ?.then((result)=>{
            treatment_provider?.onThen(result)
        })
        .catch((error)=>{
            treatment_provider?.onCatch(error)
        })
        .finally(()=>{
            treatment_provider?.onFinally()
        })
        
    }

    return {
        onRequest,
        onGet,
        onCreateCancelToken,
        onTreatmentProvider,
        axiosState
    }

}

export default useHandleAxios