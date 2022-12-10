import { useState } from 'react'

import { FaTimesCircle } from 'react-icons/fa'
import { BiEdit, BiCheckSquare } from 'react-icons/bi'

const Errand = ({ errand, onDelete, onChangeColor, onToggleCompletion, onToggleEditMode }) => {
  const [titleEdit, setTitleEdit] = useState(errand.title)
  const [descriptionEdit, setDescriptionEdit] = useState(errand.description)
  const [colorEdit, setColorEdit] = useState(errand.backgroundColor)
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
  let currentColor = errand.backgroundColor
  return (
    <div 
      id={`${errand.id}`} 
      className="errand"
      onClick={() => {
        if(errand.editMode){
          currentColor = backgroundColors.indexOf(currentColor) != backgroundColors.length - 1 ? backgroundColors[backgroundColors.indexOf(currentColor) + 1] : backgroundColors[0]
          setColorEdit(currentColor)
          onChangeColor(errand.id, currentColor)
        }
      }}
      onDoubleClick={() => onToggleCompletion(errand.id, errand.errandCompleted)} 
      style={{
        backgroundColor: currentColor,
        opacity: errand.errandCompleted ? '0.5' : '1',
      }}>
      <h2>
        <div className='errandTopSection'>
          <h3
            className='errandTitle'
            contentEditable={errand.editMode ? true : false} 
            onKeyDown={(e) => {
              if(e.key === "Enter") 
                e.preventDefault()
            }}
            onInput={(e) => setTitleEdit(e.target.innerText)} 
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => errand.editMode ? e.stopPropagation() : e}>{errand.title}
          </h3>
          <div className='errandTools'> {
            !errand.editMode ? 
              <BiEdit 
                className='editErrandBtn'
                onClick={async (e) => {
                  if(errand.errandCompleted)
                    return
                  e.stopPropagation()
                  await onToggleEditMode(errand.id)
                }} 
                onDoubleClick={(e) => e.stopPropagation()} 
                color={'#72b027'}/> : 
              <BiCheckSquare 
                className='confirmEditBtn'
                onClick={async (e) => {
                  if(errand.errandCompleted)
                    return
                  e.stopPropagation()
                  await onToggleEditMode(errand.id, true, titleEdit, descriptionEdit, colorEdit)
                }} 
                onDoubleClick={(e) => e.stopPropagation()}  
                color={'#72b027'}/>
              }
            <FaTimesCircle 
              className='closeErrandBtn' 
              onClick={() => onDelete(errand.id)}
              onDoubleClick={(e) => e.stopPropagation()} 
              cursor={'pointer'} 
              color={'#b51e16'}/>
          </div>
        </div>
      </h2>
      <p
        className='errandDescription'
        contentEditable={errand.editMode ? true : false}
        onKeyDown={(e) => {
          if(e.key === "Enter") 
            e.preventDefault()
        }}
        onInput={(e) => setDescriptionEdit(e.target.innerText)} 
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => errand.editMode && e.stopPropagation()}
        style={{textDecoration: errand.errandCompleted ? 'line-through' : 'none'}}>
        {errand.description}
      </p>
      <p>
        <em>{errand.time}</em>
      </p>
    </div>
  )
}
export default Errand