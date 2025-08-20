
const Actions = ({buttonActionList}:{buttonActionList:{label:string,action:()=>void}[]}) => {
  return (
    <div className="actionsContainer">
      {
        buttonActionList.map((action_item,action_index)=>
            <button 
            key={action_index}
            onClick={()=>
                action_item.action()
            }
            >   
            {
                action_item.label
            }
            </button>
        )
      } 
    </div>
  )
}

export default Actions
