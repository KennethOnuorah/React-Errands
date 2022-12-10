import TaskSearchBar from "./TaskSearchBar"
import AddButton from "./AddButton"

const Header = ({ title, taskCount, onCreateNewTask, setSearchEntry }) => {
  return ( 
    <header className="header">
      <em>
        <a 
          href="https://github.com/KennethOnuorah/React-Tasks" 
          target={'_blank'} 
          title={'Visit repository'}>
          <h1 className="appTitle">{taskCount} {title}</h1>
        </a>
      </em>
      <div className="headerTools">
        <TaskSearchBar setSearchEntry={setSearchEntry}/>
        <AddButton onCreateNewTask={onCreateNewTask}/>
      </div>
    </header>
  )
}
export default Header