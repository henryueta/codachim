import github_icon from "../../assets/icons/github_icon.png"
import "../../styles/contact/contact.css"

const Contact = () => {
  return (
    <div className="developerContactContainer">
        <a href="https://github.com/henryueta" target="blank">
            <img src={github_icon} alt="githubt_icon" />
            <span>Desenvolvido por henryueta</span>
        </a>
    </div>
  )
}

export default Contact
