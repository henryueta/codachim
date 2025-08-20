import { Link } from "react-router-dom"
import Form from "../../components/forms/Form"
// import "../../styles/auth/auth-form.css"
import type { AuthStructureType } from "../../@types/auth-type"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import useHandleNavigate from "../../hooks/useHandleNavigate"
import { auth_type } from "../../constants/auth-constant"
import useHandleDialog from "../../hooks/useHandleDialog"
import type { AxiosErrorType } from "../../@types/axios-type"

const AuthPage = () => {

  const {type} = useParams();

  const [authStructure,setAuthStructure] = useState<AuthStructureType| null>(null)
  const {onNavigate} = useHandleNavigate();
  const {showDialog} = useHandleDialog();
  
  useEffect(()=>{

    const currentStructure = auth_type.find((structure=>structure.type === type))
    !!currentStructure
    &&
    setAuthStructure(currentStructure)

  },[type])

   

  return (
    
        !!authStructure
        &&
    <>
    <section className="authFormSection">
      <div className="logoContainer">
        {/* <Logo/> */}
      </div>
         <section className="formSection">
        {/* <TitleHeader
        title={authStructure.header.title}
        subtitle={authStructure.header.subtitle}
        /> */}
        <Form
        method="post"
        setPlacehorders
        submitButtonTitle={authStructure.form.submitTitle}
        model={authStructure.form.model}
        submit={{
          url:authStructure.form.url
        }}
        errorView
        treatment={{
          onThen(result) {
            localStorage.setItem("auth_token",result.data.data.token)
            onNavigate("/",{
              replace:true
            })
          },
          onCatch(error) {
            const currentError = error as AxiosErrorType
            showDialog({
              title:"Revise seus dados",
              message:currentError.response.data.message,
              type:"warn",
              onConfirm:null,
              onCancel:null,
              onFinally:null
            })
          },
        }}
        />
        
        <span className="authOtherOptionSpan">
            <span className="authAskSpan">
              {
                authStructure.otherOption.ask
              }
            </span>
            <Link className="authReplyRedirect"
              to={authStructure.otherOption.redirectTo}
              >
              {
                authStructure.otherOption.reply
              }
          </Link>
        </span>
            {
              type == 'login'
              &&
              <Link 
                className="forgotPasswordRedirect"
                to={"/forgot/password"}
                >
                Esqueceu sua senha?
              </Link>
            }
              
      </section>
      
    </section>
    </>
    
  )
}

export default AuthPage
