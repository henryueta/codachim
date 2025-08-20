import { useNavigate } from "react-router-dom"


const useHandleNavigate = ()=>{

    const onNavigate = useNavigate();

    return {
        onNavigate
    }

}

export default useHandleNavigate