import { useMutation, useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query"
import useHandleAxios from "./useHandleAxios";
import type { AxiosTreatmentType } from "../@types/axios-type";
import type { MutationOptionType, QueryOptionType } from "../@types/query-type";

const useHandleQuery = ()=>{

    const {onRequest,onTreatmentProvider} = useHandleAxios();

    const onQueryClient = ()=>{
        const queryClient = useQueryClient();
        return queryClient
    }

    const onQuery = (options:QueryOptionType):UseQueryResult=>{
       const query = useQuery({
        queryKey:options.key,
        queryFn:options.action
        });
        return query
    }

    const onMutation = (options:MutationOptionType,treatment?:AxiosTreatmentType)=>{

        

        const treatmentProvider = (
            !!treatment
            ?
            onTreatmentProvider(treatment)
            : 
            null
        )

        return useMutation({
            mutationFn:async(action_params:{
                body?:{},
                url_params?:{field:string,value:string}[]
            })=>{
                const formated_url_params = 
                (!!action_params.url_params
                    ? action_params.url_params.map((param,param_index)=>
                    {
                        if(param_index !== 0){
                            return `&${param.field}=${param.value}` 
                        }
                        return `?${param.field}=${param.value}`
                    }
                    ).join("")
                    : ""
                )  
                return onRequest({
                url:(options.action.url+formated_url_params),
                method:options.action.method,
                body:(action_params.body),
                cancelToken:options.action.cancelToken
            })
            .then((result)=>
                treatmentProvider?.onThen(result)
            )
            .catch((error)=>
                treatmentProvider?.onCatch(error)    
            )
            .finally(()=>
                treatmentProvider?.onFinally()
            )
            }
        })
    }

    return {
        onMutation,
        onQuery,
        onQueryClient
    }

}

export default useHandleQuery