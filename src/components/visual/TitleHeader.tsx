
interface TitleHeaderProps {

    title:string,
    subtitle?:string,
    style?:{
        title?:React.CSSProperties,
        subtitle?:React.CSSProperties
    }

}

const TitleHeader = ({title,subtitle,style}:TitleHeaderProps) => {
  return (
    <section className="headerSection">
        <div className="titleContainer" style={style?.title || {}}>
            <h1>
                {
                    title
                }
            </h1>
        </div>
        {
        !!subtitle?.length
        &&
        <div className="subtitleContainer" style={style?.subtitle || {}}>
            <p>
                {
                    subtitle
                }
            </p>
        </div>
        }
    </section>
  )
}

export default TitleHeader
