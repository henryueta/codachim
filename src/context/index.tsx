import type { ChildrenProp } from "../@types/children-type"
import { AuthProvider } from "./AuthContext"
import { DialogProvider } from "./DialogContext"

const AppProvider = ({children}:ChildrenProp) => {
  return (
    <AuthProvider>
    <DialogProvider>
        {children}
    </DialogProvider>
    </AuthProvider>
  )
}

export default AppProvider
