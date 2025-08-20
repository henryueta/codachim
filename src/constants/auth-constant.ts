import type { ZodObject, ZodRawShape } from "zod";
import api_endpoints from "../config/api";
import user_model from "../models/user-model";
import type { AuthStructureType } from "../@types/auth-type";

const auth_type:AuthStructureType[] = [

    {
      type:"register",
      header:{
        title:"Seja bem vindo",
        subtitle:"Crie sua conta"
      },
      form:{
        model:user_model,
        url:api_endpoints.auth.register,
        submitTitle:"Criar conta"
      },
      otherOption:{
        ask:'Já possui conta?',
        reply:"Faça seu login",
        redirectTo:"/auth/login"
      }

    },
    {
      type:"login",
      header:{
        title:"Bem vindo novamente",
        subtitle:"Faça seu login"
      },
      form:{
        model:{
                schema:(user_model.schema as ZodObject<ZodRawShape>).omit({
                    username:true
                }),
                form:user_model.form.filter((field)=>
                    field.registerId !== 'username'
                )
            },
        url:api_endpoints.auth.login,
        submitTitle:"Entrar"   
      },
      otherOption:{
        ask:'Não possui conta?',
        reply:"Crie sua conta",
        redirectTo:"/auth/register"
      }
    }

  ]

  export {
    auth_type
  }