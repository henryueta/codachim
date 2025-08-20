
interface DialogStructureProps {

    isOpen:boolean,
    title:string,
    message:string,
    type:'warn'|'confirmation',
    onConfirm:(()=>void) | null,
    onCancel:(()=>void) | null,
    onFinally:(()=>void) | null

}


type DialogStateAction = 
{
    type:"show",
    value:DialogStructureProps
}
|
{
    type:"reset",
    value:{
        isOpen:false,
        type:null,
        content:null,
        title:null
    }
}

export type {
    DialogStateAction,
    DialogStructureProps
}