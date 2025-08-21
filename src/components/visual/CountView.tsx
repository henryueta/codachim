
const CountView = ({value,label,onClick}:
{value:number,
  label:{
  type:"text"|"image"
  source:string
  },
  onClick:()=>void
}) => {

  return (
    <div className="countViewContainer" onClick={onClick}>
      <div className="valueContainer">
          <span>{value}</span>
      </div>
      <div className="labelContainer">
          {
            label.type === 'text'
            ? <span>{label.source}</span>
            : <img src={label.source} alt={"countImage"} /> 
          }
      </div>
    </div>
  )
}

export default CountView
