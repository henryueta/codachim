import { useState } from "react";
import TitleHeader from "../../components/visual/TitleHeader";
import useHandleNavigate from "../../hooks/useHandleNavigate";
import useHandleAuth from "../../hooks/useHandleAuth";
import useHandleDialog from "../../hooks/useHandleDialog";
import DefaultLoad from "../../components/load/DefaultLoad";
import type { AxiosErrorType } from "../../@types/axios-type";

const AuthForgotten = () => {

    const [emailForSend,setEmailForSend] = useState('');
    const {showDialog} = useHandleDialog();
    const {onNavigate} = useHandleNavigate()
    const {onForgot,authQueryState} = useHandleAuth({verifyAuth:false});

  return (
    <section className="authForgottenPageSection">
        {/* <div className="logoContainer">
            <Logo/>
        </div> */}
        <div className="authForgottenContainer">
            <TitleHeader
            title="Esqueceu sua senha?"
            subtitle="Escreva seu email para alterar a senha"
            />
            <div className="emailForSendContainer">
                <input 
                type="email" 
                placeholder="Email"
                onChange={(e)=>{
                    setEmailForSend(e.target.value)  
                }} 
                value={emailForSend}/>
            </div>
            <div className="forgottenActionsContainer">
                <button 
                onClick={()=>{
                    onNavigate("/auth/login")
                }}
                className="filled_button">
                    Cancelar
                </button>
                <button 
                onClick={()=>{
                    !!(emailForSend.trim().length)
                    &&
                    onForgot("post",{
                        email:emailForSend
                    },{
                        onThen() {
                            
                            onNavigate("/message/recovery")

                        },
                        onCatch(error){
                            const currentError = error as AxiosErrorType
                            showDialog({
                                title:"Revise seus dados",
                                message:currentError.response.data.message,
                                type:"warn",
                                onConfirm:null,
                                onCancel:null,
                                onFinally:null
                            })
                        }
                    })
                }}
                className="unfilled_button">
                    <DefaultLoad
                    isLoading={!!authQueryState.isLoading}
                    />
                    Confirmar
                </button>
            </div>
        </div>
    </section>
  )
}

export default AuthForgotten
