import { z } from "zod"
import { type FormItemType } from "../@types/form-type"
import type { ModelType } from "../@types/model_type"


const recovery_schema = z.object({
    password:z.string().refine((val)=>val.length,{
        message:"Campo senha inválido"
    }),
    repeat_password:z.string()
}).refine((val)=>val.repeat_password === val.password,{
    message:"Senhas não se equivalem",
    path:['repeat_password']
})

const recovery_form:FormItemType[] = [
    {
        id:"password_id",
        registerId:"password",
        tag:"input",
        title:"Nova senha",
        type:"password"
    },
    {
        id:"repeat_password_id",
        registerId:"repeat_password",
        tag:"input",
        title:"Confirme a nova senha",
        type:"password"
    }
]

const recovery_model:ModelType = {
    schema:recovery_schema,
    form:recovery_form
} 

export default recovery_model