import Errand from "./Errand"

const ErrandAllocater = ({ 
  myErrands, 
  searchEntry, 
  onDelete, 
  onChangeColor, 
  onToggleCompletion, 
  onToggleEditMode }) => {
  return (
    <>
      {
        myErrands.map((errand) => (errand.title.toLowerCase().includes(searchEntry.toLowerCase()) || searchEntry == "") && 
        <Errand 
          key={errand.id} 
          errand={errand}
          onDelete={onDelete} 
          onChangeColor={onChangeColor}
          onToggleCompletion={onToggleCompletion} 
          onToggleEditMode={onToggleEditMode}
        />)
      }
    </>
  )
}
export default ErrandAllocater