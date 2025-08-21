import type { CancelToken } from "axios";


interface AxiosStateType {

    isLoading:boolean | null,
    hasError:boolean | null,
    hasSuccess:boolean | null

}

type AxiosActionType = 
{
    type:"loading",
    value:boolean | null
}
|
{
    type:"success",
    value:boolean
}
|
{
    type:"error",
    value:boolean
}

interface AxiosDataType {
    method:'post'|'delete'|'put'|'get',
    url:string,
    body?:object,
    cancelToken:CancelToken
}

interface AxiosResponseType {
    message:string,
    data:any,
    status:string
}

interface AxiosErrorType {
    response:{
        data:Omit<AxiosResponseType,"data"|"status"> & Record<'data',any>
    }
} 

interface AxiosTreatmentType {
    onThen?:(result:any)=>void,
    onCatch?:(error:unknown)=>void,
    onFinally?:()=>void
}

export type {
    AxiosDataType,
    AxiosResponseType,
    AxiosTreatmentType,
    AxiosActionType,
    AxiosStateType,
    AxiosErrorType
}