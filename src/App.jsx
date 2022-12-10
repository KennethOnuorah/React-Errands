import { useEffect, useState } from "react"

import moment from "moment/moment"
import Header from "./components/Header"
import TaskAllocater from "./components/TaskAllocater"

function App() {
	const [myTasks, setMyTasks] = useState([])
	const [searchEntry, setSearchEntry] = useState("")

	useEffect(() => {
		const getTasks = async() => {
			const tasksFromServer = await fetchTasks()
			setMyTasks(tasksFromServer.reverse())
		}
		getTasks()
	}, [])

	const fetchTasks = async() => {
		const res = await fetch("http://localhost:5000/tasks")
		const data = await res.json()
		return data
	}

	const createNewTask = async() => {
		const newTask = {
			title: "Title",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			time: `${moment().format('lll')}`,
			backgroundColor: "#3B3B3B",
			editMode: false,
			taskCompleted: false
		}
		const res = await fetch(`http://localhost:5000/tasks`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(newTask)
		})
		const data = await res.json()
		setMyTasks([data, ...myTasks])
	}

	const deleteTask = async(id) => {
		await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "DELETE"
		})
		setMyTasks(myTasks.filter((task) => task.id != id))
	}

	const changeColor = (id, color) => {
		setMyTasks(myTasks.map((task) => task.id === id ? {
		...task, 
		backgroundColor: color,
		} : task))
	}

	const toggleCompleteStatus = async(id, completed) => {
		const res = await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				taskCompleted: !completed
			})
		})
		setMyTasks(myTasks.map((task) => task.id === id && !task.editMode ? {
		...task, 
		taskCompleted: !task.taskCompleted
		} : task))
	}

	const toggleEditMode = async(id, isSaving=false, titleEdit="", descEdit="", colorEdit="") => {
		const res = isSaving && await fetch(`http://localhost:5000/tasks/${id}`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				title: titleEdit,
				description: descEdit,
				backgroundColor: colorEdit
			})
		})
		const updated = isSaving && await res.json()
		setMyTasks(myTasks.map((task) => task.id === id ? {
			...task, 
			editMode: !task.editMode, 
			title: isSaving ? updated.title : task.title,
			description: isSaving ? updated.description : task.description,
		} : task))
	}

	return (
		<>
			<div className="appHeader">
				<Header 
					title={`Errand${myTasks.length != 1 ? `s`: ``}`} 
					taskCount={myTasks.length}
					setSearchEntry={setSearchEntry}
					onCreateNewTask={createNewTask}
				/>
			</div>
			<div className="tasksSection">
				{
					myTasks.length != 0 ? 
					<TaskAllocater 
						myTasks={myTasks}
						searchEntry={searchEntry}
						onDelete={deleteTask} 
						onChangeColor={changeColor}
						onToggleCompletion={toggleCompleteStatus} 
						onToggleEditMode={toggleEditMode}
					/> :
					<h2 className="noTaskPrompt">All caught up! 👍</h2>
				}
			</div>
		</>
	)
}
export default App