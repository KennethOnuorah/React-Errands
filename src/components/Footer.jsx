import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer className="footer">
      <hr className="footerLine"></hr>
      <p>Copyright &copy; 2022</p>
      <Link to="/React-Errands/about">About</Link>
    </footer>
  )
}
export default Footer
