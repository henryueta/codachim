import { useEffect, useRef, useState } from "react"
import  code_field_list  from "../../constants/code-constant";
import useHandleAuth from "../../hooks/useHandleAuth";
import useHandleNavigate from "../../hooks/useHandleNavigate";
// import TitleHeader from "../visual/TitleHeader";
import Timer from "../visual/Timer";
import useHandleDialog from "../../hooks/useHandleDialog";
import type { AxiosErrorType, AxiosResponseType } from "../../@types/axios-type";

const Checkout = () => {

        const [codeValueList,setCodeValueList] = useState<number[] | null[]>(code_field_list);
        const [checkoutCodeValue,setCheckoutCodeValue] = useState("");
        const [enableResend,setEnableResend] = useState(true);
        const [resendSecondsTimer,setResendSecondsTimer] = useState<number>(59);
        const {onCheckout,currentAuthContext,onEmailCooldown,authQueryState} = useHandleAuth({verifyAuth:true});
        const {onNavigate} = useHandleNavigate();
        const  codeFieldRefList = useRef<HTMLInputElement[]>([]);
        const {showDialog} = useHandleDialog();


        useEffect(()=>{

            onEmailCooldown({
                onThen(result) {
                    const currentResult = result.data as AxiosResponseType
                    setResendSecondsTimer(currentResult.data.secondsLeft)
                },
                onCatch(error){
                    const currentError = error as AxiosErrorType
                    setResendSecondsTimer(currentError.response.data.data.secondsLeft)
                    setEnableResend(false)
                }
            })

        },[])

        const setCheckoutValue = ()=>{
            let codeListFormatedValue = "";
            codeValueList.forEach((code)=>
                codeListFormatedValue +=code   
            )
            !!(codeListFormatedValue.length === 4)
            && setCheckoutCodeValue(codeListFormatedValue)
        }
    
        useEffect(()=>{
    
            !!(checkoutCodeValue.length === 4)
            && onCheckout("post",false,checkoutCodeValue,{
                onCatch(error) {
                    const currentError = error as {message:string}
                        showDialog({
                            title:"Revise seus dados",
                            message:currentError.message,
                            type:"warn",
                            onConfirm:null,
                            onCancel:null,
                            onFinally:null
                        })
                },
            })
            
    
        },[checkoutCodeValue])
        

        useEffect(()=>{
    
            !!(currentAuthContext.isChecked)
            &&
            onNavigate("/")
            

        },[currentAuthContext.isChecked])
        console.log(resendSecondsTimer)
        useEffect(()=>{

            ((codeFieldRefList.current && codeFieldRefList.current.length)
            &&
            (()=>{
                codeFieldRefList.current[0].focus()
                codeFieldRefList.current.forEach((field,index)=>
                    (field.oninput = ()=>{
                        (
                        field.value.length === 1 
                        && 
                        index < (codeFieldRefList.current.length-1)
                        &&
                        !isNaN(Number.parseInt(field.value))
                        )
                        ? codeFieldRefList.current[index+1].focus()
                        : 
                        (field.value.length === 0 && index > 0)
                        &&
                        codeFieldRefList.current[index-1].focus()
                    })
                )
            })()
            )

        },[codeFieldRefList])

  return (
    <div className="checkoutContainer">
        {/* <TitleHeader
        title={"Verifique seu email"}
        subtitle="Enviamos um código para seu email"
        /> */}
      <div className="codeInsertContainer">
            {
                codeValueList.map((code,index)=>
                    <input 
                    id={"field_number_"+index} 
                    ref={
                        (field)=>{
                            const current_field = field as HTMLInputElement
                            codeFieldRefList.current[index] = current_field
                        }
                    }
                    key={index}
                    type="text" 
                    value={code || ""}
                    onChange={(e)=>{
                        const currentNumberValue = parseInt(e.target.value);
                        (e.target.value.trim().length < 2)
                        &&
                         setCodeValueList((prev)=>{
                            const currentListValue = [...prev]
                             currentListValue.splice(
                                index,
                                1,
                                currentNumberValue
                             )
                             return currentListValue as number[]
                        })
                         
                    }}
                    />  
                )
            }
        </div>
        <div className="confirmActionContainer">
            <button
            disabled={!!authQueryState.isLoading}
            className="unfilled_button" 
            onClick={()=>{
                setCheckoutValue()
            }}
            >
                Confirmar
            </button>
        </div>
        <div className="resendActionContainer">
            <button
            disabled={!!authQueryState.isLoading}
            className={
                enableResend
                ? "unfilled_button"
                : "filled_button"
            }
            onClick={()=>{
                    {
                        enableResend
                        &&
                        (()=>{
                            onCheckout("get",true)
                            setEnableResend(false)
                        })()
                    }
            }}
            >
                <span>
                    Reenviar 
                {
                !enableResend
                &&
                ' em '}
                {
                    !enableResend
                    &&
                    <Timer
                    onEnd={()=>{setEnableResend(true)}}
                    timer={{
                        seconds:resendSecondsTimer
                    }}
                    />
                }
                {
                    !enableResend
                    &&
                    'minutos'
                }
                </span>
            </button>
        </div>
    </div>
  )
}

export default Checkout
