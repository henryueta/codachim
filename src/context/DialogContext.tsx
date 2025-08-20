import { createContext, useState } from "react";
import type { DialogStructureProps } from "../@types/dialog-type";


const DialogContext = createContext({} as {
    dialogStructure:DialogStructureProps,
    setDialogStructure:React.Dispatch<React.SetStateAction<DialogStructureProps>>,
    initialDialogStructureValue:DialogStructureProps,
})



const DialogProvider = ({children}:{children:React.ReactNode})=>{

        const initialDialogStructureValue = {
            isOpen:false,
            type:"confirmation" as "confirmation",
            title:"",
            message:"",
            onConfirm:null,
            onCancel:null,
            onFinally:null
        }

        const [dialogStructure,setDialogStructure] = useState<DialogStructureProps>(initialDialogStructureValue);

    return (
        <DialogContext.Provider value={
            {
            dialogStructure,
            setDialogStructure,
            initialDialogStructureValue,
            }
        }>
            {children}
        </DialogContext.Provider>
    )
}

export {
    DialogContext,
    DialogProvider
}