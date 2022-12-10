import Task from "./Task"

const TaskAllocater = ({ 
  myTasks, 
  searchEntry, 
  onDelete, 
  onChangeColor, 
  onToggleCompletion, 
  onToggleEditMode }) => {
  return (
    <>
      {
        myTasks.map((t) => (t.title.toLowerCase().includes(searchEntry.toLowerCase()) || searchEntry == "") && 
        <Task 
          key={t.id} 
          task={t}
          onDelete={onDelete} 
          onChangeColor={onChangeColor}
          onToggleCompletion={onToggleCompletion} 
          onToggleEditMode={onToggleEditMode}
        />)
      }
    </>
  )
}
export default TaskAllocater