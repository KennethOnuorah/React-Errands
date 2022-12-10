const AddButton = ({ onCreateNewErrand }) => {
  return (
    <button className="createErrandBtn" onClick={onCreateNewErrand} title="Create new errand">+</button>
  )
}
export default AddButton