import { createContext, useState, type Dispatch } from "react"
import type { ChildrenProp } from "../@types/children-type";

interface AuthProps {

    isAuth:boolean | null,
    setIsAuth:Dispatch<React.SetStateAction<boolean | null>>,
    isChecked:boolean | null,
    setIsChecked:Dispatch<React.SetStateAction<boolean | null>>
}

const AuthContext = createContext({} as AuthProps);

const AuthProvider = ({children}:ChildrenProp) => {

    const [isAuth,setIsAuth] = useState<boolean | null>(null);
    const [isChecked,setIsChecked] = useState<boolean | null>(null);

  return (
    <AuthContext.Provider value={
        {
        isAuth,
        setIsAuth,
        isChecked,
        setIsChecked
        }
    }>
        {
            children
        }
    </AuthContext.Provider>
  )
}


export {
    AuthContext,
    AuthProvider,
}
