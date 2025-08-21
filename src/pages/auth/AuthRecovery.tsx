import { useEffect, useState } from "react"
import Form from "../../components/forms/Form"
import api_endpoints from "../../config/api"
import useHandleAuth from "../../hooks/useHandleAuth"
import recovery_model from "../../models/recovery-model"
import { useParams } from "react-router-dom"
import DefaultLoad from "../../components/load/DefaultLoad"
import TitleHeader from "../../components/visual/TitleHeader"
import useHandleNavigate from "../../hooks/useHandleNavigate"

const AuthRecovery = () => {

    const {onForgot,authQueryState} = useHandleAuth({verifyAuth:false});
    const {token} = useParams();
    const [isDenied,setIsDenied] = useState(false);
    const {onNavigate} = useHandleNavigate();

    useEffect(()=>{

        onForgot("get",{
            token:token
        },{
            onThen() {
                setIsDenied(false)
            },
            onCatch(error) {
                console.log(error)
                setIsDenied(true)
            },
        })

    },[])

  return (
    <section className="authRecoveryPageSection">
        {/* <div className="logoContainer">
            <Logo/>
        </div> */}
        <div className="authRecoveryContainer">
            {
                !isDenied
                &&
                <TitleHeader
                title="Recuperação de senha"
                subtitle="Você solicitou um link para redefinir sua senha.
                Preencha o formulário e confime seus dados"
                />
            }
        {
            !!authQueryState.isLoading
            ? <DefaultLoad
            isLoading={!!authQueryState.isLoading}
            />
            : 
            !isDenied
            ?<section className="formSection">
                <Form
                method="put"
                model={recovery_model}
                errorView
                setPlacehorders
                submit={{
                    url:api_endpoints.auth.password_recovery+"?token="+token,
                }}
                submitButtonTitle="Confirmar"
                treatment={{
                    onThen() {
                        onNavigate("/auth/login")
                    },
                    onCatch(error) {
                        console.log(error)
                    },
                }}
                />
            </section>
                : <div className="deniedRecoveryContainer">
                    <img src="" alt="" />
                    <p>Token inválido ou expirado.</p>
                </div>
        }
        </div>
    </section>
  )
}

export default AuthRecovery
