import { useState } from 'react'

import { FaTimesCircle } from 'react-icons/fa'
import { BiEdit, BiCheckSquare } from 'react-icons/bi'

const Task = ({ task, onDelete, onChangeColor, onToggleCompletion, onToggleEditMode }) => {
  const [titleEdit, setTitleEdit] = useState(task.title)
  const [descriptionEdit, setDescriptionEdit] = useState(task.description)
  const [colorEdit, setColorEdit] = useState(task.backgroundColor)
  const backgroundColors = [
    "#3B3B3B", //Dark gray (default)
    "#691307", //Dark red
    "#874a00", //Dark orange
    "#556600", //Vomit green
    "#466600", //Dark green
    "#006655", //Teal
    "#004266", //Dark blue
    "#000966", //Navy blue
    "#380066", //Dark purple
    "#66004b" //Dark magenta
  ]
  let currentColor = task.backgroundColor
  return (
    <div 
      id={`${task.id}`} 
      className="task"
      onClick={() => {
        if(task.editMode){
          currentColor = backgroundColors.indexOf(currentColor) != backgroundColors.length - 1 ? backgroundColors[backgroundColors.indexOf(currentColor) + 1] : backgroundColors[0]
          setColorEdit(currentColor)
          onChangeColor(task.id, currentColor)
        }
      }}
      onDoubleClick={() => onToggleCompletion(task.id, task.taskCompleted)} 
      style={{
        backgroundColor: currentColor,
        opacity: task.taskCompleted ? '0.5' : '1',
      }}>
      <h2>
        <div className='taskTopSection'>
          <h3
            className='taskTitle'
            contentEditable={task.editMode ? true : false} 
            onKeyDown={(e) => {
              if(e.key === "Enter") 
                e.preventDefault()
            }}
            onInput={(e) => setTitleEdit(e.target.innerText)} 
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => task.editMode ? e.stopPropagation() : e}>{task.title}
          </h3>
          <div className='taskTools'> {
            !task.editMode ? 
              <BiEdit 
                className='editTaskBtn'
                onClick={async (e) => {
                  if(task.taskCompleted)
                    return
                  e.stopPropagation()
                  await onToggleEditMode(task.id)
                }} 
                onDoubleClick={(e) => e.stopPropagation()} 
                color={'#72b027'}/> : 
              <BiCheckSquare 
                className='confirmEditBtn'
                onClick={async (e) => {
                  if(task.taskCompleted)
                    return
                  e.stopPropagation()
                  await onToggleEditMode(task.id, true, titleEdit, descriptionEdit, colorEdit)
                }} 
                onDoubleClick={(e) => e.stopPropagation()}  
                color={'#72b027'}/>
              }
            <FaTimesCircle 
              className='closeTaskBtn' 
              onClick={() => onDelete(task.id)}
              onDoubleClick={(e) => e.stopPropagation()} 
              cursor={'pointer'} 
              color={'#b51e16'}/>
          </div>
        </div>
      </h2>
      <p
        className='taskDescription'
        contentEditable={task.editMode ? true : false}
        onKeyDown={(e) => {
          if(e.key === "Enter") 
            e.preventDefault()
        }}
        onInput={(e) => setDescriptionEdit(e.target.innerText)} 
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => task.editMode && e.stopPropagation()}
        style={{textDecoration: task.taskCompleted ? 'line-through' : 'none'}}>
        {task.description}
      </p>
      <p>
        <em>{task.time}</em>
      </p>
    </div>
  )
}
export default Task