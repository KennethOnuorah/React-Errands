const TaskSearchBar = ({ setSearchEntry }) => {
  return (
  <>
    <input 
    className="taskSearchBar" 
    type={"text"} 
    placeholder="Search tasks..." 
    onInput={(e) => setSearchEntry(e.target.value)}/>
	</>
  )
}
export default TaskSearchBar