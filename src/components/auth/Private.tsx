import useHandleNavigate from "../../hooks/useHandleNavigate";
import { useEffect } from "react";
import useHandleAuth from "../../hooks/useHandleAuth";
import DefaultLoad from "../../components/load/DefaultLoad";
import { Navigate } from "react-router-dom";
import type { ChildrenProp } from "../../@types/children-type";

const Private = ({children}:ChildrenProp) => {

  const {currentAuthContext,authQueryState} = useHandleAuth({verifyAuth:true});
 const {onNavigate} = useHandleNavigate();
//  const [isAllow,setIsAllow] = useState<boolean  | null>(null);

//   useEffect(()=>{
    
//     (authQueryState.isLoading !== null
//     &&
//     !authQueryState.isLoading)
//     &&
//     currentAuthContext.isAuth !== null
//     &&
//     setIsAllow(currentAuthContext.isAuth)


//   },[currentAuthContext.isAuth,authQueryState.isLoading])

  useEffect(()=>{
    (authQueryState.isLoading !== null
    &&
    !authQueryState.isLoading)
    &&
    currentAuthContext.isAuth !== null
    &&
    (()=>{
    !currentAuthContext.isAuth
    &&
    onNavigate("/auth/login",{
      replace:true
    })
    })()

  },[currentAuthContext.isAuth,authQueryState.isLoading])


  return <>
    {
      !!authQueryState.isLoading
      ?
      <section className="loadAuthorizationSection">
      <DefaultLoad
      isLoading={!!authQueryState.isLoading}
      />
      </section>
      : 
      !!(currentAuthContext.isAuth)
      && 
      ((currentAuthContext.isChecked)
      ? children
      : <Navigate to={"/checkout"}/> 
      )
    }
  </>
}

export default Private
