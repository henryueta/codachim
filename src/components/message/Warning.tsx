
const Warning = ({message}:{message:string}) => {
  return (
    <div className="warningContainer">
      <p>
        {
            message
        }
      </p>
    </div>
  )
}

export default Warning
