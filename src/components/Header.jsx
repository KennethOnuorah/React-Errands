import ErrandSearchBar from "./ErrandSearchBar"
import AddButton from "./AddButton"

const Header = ({ title, errandCount, onCreateNewErrand, setSearchEntry }) => {
  return ( 
    <header className="header">
      <em>
        <h1 className="errandCounter">{errandCount} {title}</h1>
      </em>
      <div className="headerTools">
        <ErrandSearchBar setSearchEntry={setSearchEntry}/>
        <AddButton onCreateNewErrand={onCreateNewErrand}/>
      </div>
    </header>
  )
}
export default Header