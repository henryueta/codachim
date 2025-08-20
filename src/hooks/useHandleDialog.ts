import { useContext } from "react"
import { DialogContext } from "../context/DialogContext"
import type { DialogStructureProps } from "../@types/dialog-type"

const useHandleDialog = ()=>{

    const currentDialogContext = useContext(DialogContext)
    const {dialogStructure,setDialogStructure,initialDialogStructureValue} = currentDialogContext
    
    const resetDialog = ()=>{
        setDialogStructure(initialDialogStructureValue)
    }

    const showDialog = (structure:Omit<DialogStructureProps,"isOpen">)=>{
        setDialogStructure({
            isOpen:true,
            title:structure.title,
            message:structure.message,
            type:structure.type,
            onConfirm:()=>{
                !!structure.onConfirm
                &&
                structure.onConfirm()                
            },
            onCancel:()=>{
                !!structure.onCancel
                &&
                structure.onCancel()
            },
            onFinally() {

                !!structure.onFinally
                &&
                structure.onFinally()

                resetDialog()
            },
        })
    }



    return {
        dialogStructure,
        currentDialogContext,
        showDialog,
        resetDialog
    }

}

export default useHandleDialog  