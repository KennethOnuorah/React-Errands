import { Link } from "react-router-dom"

const AboutPage = () => {
  return (
    <div className="aboutSection">
      <h1 className="appVersion"><a href="https://github.com/KennethOnuorah/React-Errands" target={"_blank"}>Version 1.0.0</a></h1>
      <h4>Author: Kenneth Onuorah</h4>
      <h4>Last updated: 12/11/2022</h4>
      <Link to="/React-Errands/"><strong>Go Back</strong></Link>
    </div>
  )
}
export default AboutPage
