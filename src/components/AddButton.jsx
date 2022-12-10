const AddButton = ({ onCreateNewTask }) => {
  return (
    <button className="createTaskBtn" onClick={onCreateNewTask}>+</button>
  )
}
export default AddButton