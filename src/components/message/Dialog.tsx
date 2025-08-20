import {AnimatePresence, motion} from "framer-motion"
import useHandleDialog from "../../hooks/useHandleDialog"
import Actions from "../action/Actions";

const Dialog = () => {

    const {currentDialogContext,resetDialog} = useHandleDialog();

  return (
    <AnimatePresence
    >
        {
        !!currentDialogContext.dialogStructure.isOpen
        &&
        <motion.dialog
        className="dialogPane"
        style={{
            display:"block"
        }}
        initial={
            {
                opacity:0,
                scale:0.8
            }
        }
        animate={
            {
                opacity:1,
                scale:1
            }
        }
        exit={
            {
                opacity:0,
                scale:0.8
            }
        }
        >
            <div className="contentContainer">
                {currentDialogContext.dialogStructure.message}
            </div>
            <Actions
            buttonActionList={[
                {
                    label:"Fechar",
                    action:()=>{
                        resetDialog()
                    }
                }
            ]}
            />
        </motion.dialog>    
        }
    </AnimatePresence>
  )
}

export default Dialog
