import type { CancelToken } from "axios"

interface QueryOptionType {
    key:string[],
    action:()=>void
}

interface MutationOptionType {
    action:{
        body?:{}
        // url_params?:{field:string,value:string}[]
        url:string
        method:"get"|'delete'|'put'|'post',
        cancelToken:CancelToken
    }
}

export type {
    QueryOptionType,
    MutationOptionType
}