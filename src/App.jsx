import { useEffect, useState } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import moment from "moment/moment"
import Header from "./components/Header"
import Footer from "./components/Footer"
import AboutPage from "./components/AboutPage"
import ErrandAllocater from "./components/ErrandAllocater"

function App() {
	const [myErrands, setMyErrands] = useState([])
	const [searchEntry, setSearchEntry] = useState("")

	useEffect(() => {
		const getErrands = async() => {
			const errandsFromServer = await fetchErrands()
			setMyErrands(errandsFromServer.reverse())
		}
		getErrands()
	}, [])

	const fetchErrands = async() => {
		const res = await fetch("http://localhost:5000/errands")
		const data = await res.json()
		return data
	}

	const createNewErrand = async() => {
		const newErrand = {
			title: "Title",
			description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			time: `${moment().format('lll')}`,
			backgroundColor: "#3B3B3B",
			editMode: false,
			errandCompleted: false
		}
		const res = await fetch(`http://localhost:5000/errands`, {
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(newErrand)
		})
		const data = await res.json()
		setMyErrands([data, ...myErrands])
	}

	const deleteErrand = async(id) => {
		await fetch(`http://localhost:5000/errands/${id}`, {
			method: "DELETE"
		})
		setMyErrands(myErrands.filter((errand) => errand.id != id))
	}

	const changeColor = (id, color) => {
		setMyErrands(myErrands.map((errand) => errand.id === id ? {
		...errand, 
		backgroundColor: color,
		} : errand))
	}

	const toggleCompleteStatus = async(id, completed) => {
		const res = await fetch(`http://localhost:5000/errands/${id}`, {
			method: "PATCH",
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify({
				errandCompleted: !completed
			})
		})
		setMyErrands(myErrands.map((errand) => errand.id === id && !errand.editMode ? {
		...errand, 
		errandCompleted: !errand.errandCompleted
		} : errand))
	}

	const toggleEditMode = async(id, isSaving=false, titleEdit="", descEdit="", colorEdit="") => {
		const res = isSaving && await fetch(`http://localhost:5000/errands/${id}`, {
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
		setMyErrands(myErrands.map((errand) => errand.id === id ? {
			...errand, 
			editMode: !errand.editMode, 
			title: isSaving ? updated.title : errand.title,
			description: isSaving ? updated.description : errand.description,
		} : errand))
	}

	return (
		<>
			<div className="appHeader">
				<Header 
					title={`Errand${myErrands.length != 1 ? `s`: ``}`} 
					errandCount={myErrands.length}
					setSearchEntry={setSearchEntry}
					onCreateNewErrand={createNewErrand}
				/>
			</div>
			<div className="errandsSection">
				{
					myErrands.length != 0 ? 
					<ErrandAllocater 
						myErrands={myErrands}
						searchEntry={searchEntry}
						onDelete={deleteErrand} 
						onChangeColor={changeColor}
						onToggleCompletion={toggleCompleteStatus} 
						onToggleEditMode={toggleEditMode}
					/> :
					<h2 className="noErrandPrompt">All caught up! 👍</h2>
				}
			</div>
			<Routes>
				<Route path="/about" element={<AboutPage/>}/>
			</Routes>
			<Footer/>
		</>
	)
}
export default App