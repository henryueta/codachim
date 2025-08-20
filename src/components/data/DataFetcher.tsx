import { AnimatePresence,motion } from "framer-motion"
import PageLoad from "../load/PageLoad"
import { useState } from "react";
import type { ChildrenType } from "../../@types/children-type";

const DataFetcher = ({isLoading,children}:{isLoading:boolean,children:ChildrenType}) => {

    const [isLoaded,setIsLoaded] = useState(!isLoading);

    return (
    <>
        <AnimatePresence 
        onExitComplete={()=>{
            setIsLoaded(true)
        }}>
        {
            (isLoading)
            &&
            <motion.section
            className="pageLoadSection"
            initial={
                {
                    opacity:1,
                    scale:1
                }
            }
            exit={
                {
                    opacity:0,
                    scale:0.7
                }
            }
            >
            <PageLoad/>
            </motion.section>
        }   
        </AnimatePresence>  
        {
            (isLoaded)
            &&
            children
        } 
    </>
  )
}

export default DataFetcher
