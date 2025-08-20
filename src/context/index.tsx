import type { ChildrenProp } from "../@types/children-type"
import { DialogProvider } from "./DialogContext"

const AppProvider = ({children}:ChildrenProp) => {
  return (
    <DialogProvider>
        {children}
    </DialogProvider>
  )
}

export default AppProvider
