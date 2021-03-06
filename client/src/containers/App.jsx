/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from "react"
import "./App.css"
import PostForm from "./postForm"

function App() {
	const [error, setError] = useState(null)
	const [isLoaded, setIsLoaded] = useState(false)
	const [items, setItems] = useState([])
	const [editId, setEditId] = useState({})
	const [action, setAction] = useState(false)

	console.log(items)

	useEffect(() => {
		fetch("/api/muggers").then(res => res.json()).then(
			(result) => {
				setIsLoaded(true)
				setItems(result)
			},
			(error) => {
				setIsLoaded(true)
				setError(error)
			}
		)
	}, [])

	const newTtem = (item) => {
		setItems([...items, item])
	}

	const onDelete = (id) => {
		fetch(`/api/muggers/${id}`, {
			method: "DELETE"
		}).then(() => {
			console.log("removed")
		}).catch(err => {
			console.error(err)
		})

		setItems([...items.filter((elem) => elem._id !== id)])
	}

	const onChangeUser = (elem) => {
		setAction(!action)
		setEditId({ ...elem })
		console.log(elem)
	}

	const onEditClick = () => {
		const idx = items.findIndex((el) => el._id === editId._id)
		setItems([...items.splice(0, idx), editId, ...items.splice(idx + 1)])
		console.log(idx)

		fetch(`/api/muggers/${editId._id}`, {
			method: "PUT",
			body: JSON.stringify(
				{
					name: editId.name,
					age: editId.age,
					status: editId.status
				}
			),
			headers: {
				"Content-Type": "application/json"
			}
		}).then((response) => {
			response.json().then((response) => {
				console.log(response)
			})
		}).catch(err => {
			console.error(err)
		})
	}

	const onChangeName = (e) => {
		setEditId({ ...editId, name: e.target.value })
	}
	const onChangeAge = (e) => {
		setEditId({ ...editId, age: e.target.value })
	}
	const onChangeStatus = (e) => {
		setEditId({ ...editId, status: e.target.value })
	}

	if (error) {
		return <div>{`Ошибка: ${error.message}`}</div>
	} if (!isLoaded) {
		return <div>`Загрузка...`</div>
	} if (isLoaded) {
		return (
			<div className="row">
				<ul className="list-group">
					{ items.map((el, index) => (
						<div key={el[index]} className="main-content">
							<li className="list-group-item">
								<p>{`Name is: ${el.name}`}</p>
								<p>{`Age is: ${el.age}`}</p>
								<p>{`Status is: ${el.status}`}</p>
							</li>
							<button type="button" onClick={() => onDelete(el._id)}>del</button>
							<button type="button" onClick={() => onChangeUser(el)}>edit</button>
						</div>
					)) }
				</ul>
				<PostForm newItem={newTtem} />
				  { action ? (
					<div className="effect-on-edit">
						<input type="text" onChange={onChangeName} defaultValue={editId.name} placeholder="name" />
						<input type="text" onChange={onChangeAge} defaultValue={editId.age} placeholder="age" />
						<input type="text" onChange={onChangeStatus} defaultValue={editId.status} placeholder="status" />
						<input type="button" onClick={() => onEditClick()} value="edit" />
					</div>
				) : null }
			</div>
		)
	}
}

export default App
