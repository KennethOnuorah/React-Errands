const ErrandSearchBar = ({ setSearchEntry }) => {
  return (
  <>
    <input 
    className="errandSearchBar" 
    type={"text"} 
    placeholder="Search errands..." 
    onInput={(e) => setSearchEntry(e.target.value)}/>
	</>
  )
}
export default ErrandSearchBar