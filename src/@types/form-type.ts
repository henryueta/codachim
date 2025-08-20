import type { AxiosTreatmentType } from "./axios-type"
import type { ModelType } from "./model_type" 

interface FormComponentProps {
    model:ModelType,
    method:'post'|'put',
    submit:{
        url:string,
        onAction?:(data:any)=>void
    },
    submitButtonTitle:string,
    errorView?:boolean,
    treatment?:AxiosTreatmentType,
    defaultValues?:{
        id:string,
        value:string
    }[],
    setPlacehorders?:boolean,
    cancelButton?:{
        onCancel:()=>void
    }
}

interface FormItemType {

    id:string,
    tag:"textarea"|"input"|"select"
    type?:"file"|"text"|"checkbox"|"email"|"password",
    title:string,
    registerId:string

}

export type{ 
    FormItemType,
    FormComponentProps
}