import { useState } from "react";

import "./App.css";

function App() {
	const [todos, setTodos] = useState([]);
	const [input, setInput] = useState("");
	const [edit, setEdit] = useState(false);
	const [editIndex, setEditIndex] = useState(null);

	const addTodo = () => {
		if (input.trim() === "") return;

		if (edit) {
			const updateTodo = todos.map((todo, index) => (index === editIndex ? { ...todo, text: input } : todo));
			setTodos(updateTodo);
			setEdit(false);
			setEditIndex(null);
		} else {
			setTodos([...todos, { id: Date.now(), text: input, count: 0 }]);
		}

		setInput("");
	};

	const removeTodo = (index) => {
		const newTodo = todos.filter((_, i) => i !== index);
		setTodos(newTodo);

		if (edit) {
			setEdit(false);
			setEditIndex(null);
			setInput("");
		}
	};

	const editTodo = (index) => {
		setInput(todos[index]);
		setEdit(true);
		setEditIndex(index);
	};

	const increment = (index) => {
		const updatedTodo = todos.map((todo, idx) => (idx === index ? { ...todo, count: todo.count + 1 } : todo));
		setTodos(updatedTodo);
	};
	const deincrement = (index) => {
		const updatedTodo = todos.map((todo, idx) => (idx === index ? { ...todo, count: todo.count > 0 ? todo.count - 1 : 0 } : todo));
		setTodos(updatedTodo);
	};

	return (
		<div className="card">
			<div className="flex flex-wrap items-center gap-3 mt-4">
				<input
					type="text"
					className="flex-grow min-w-[200px] p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Add a todo"
				/>
				<button
					className={`px-4 py-2 rounded text-white font-semibold transition-colors duration-200 ${
						edit ? "bg-yellow-500 hover:bg-yellow-600" : "bg-blue-500 hover:bg-blue-600"
					}`}
					type="submit"
					onClick={addTodo}
				>
					{edit ? "Update" : "Add"}
				</button>
			</div>

			<table className="w-full mt-4 table-auto border text-black border-gray-300 text-left">
				<thead className="bg-gray-100">
					<tr>
						<th className="p-2 border-b">#</th>
						<th className="p-2 border-b">Todo</th>
						<th className="p-2 border-b">Count</th>
						<th className="p-2 border-b text-center">Actions</th>
					</tr>
				</thead>
				<tbody>
					{todos.map((todo, index) => (
						<tr key={index} className="border-b text-gray-200 hover:text-gray-800 hover:bg-gray-50">
							<td className="p-2">{index + 1}</td>
							<td className="p-2 font-bold">{todo.text}</td>
							<td className="p-2 font-bold">{todo.count}</td>
							<td className="p-2">
								<div className="flex flex-wrap gap-2 justify-start">
									<button className="px-3 py-1 bg-green-500  rounded" onClick={() => editTodo(index)}>
										Edit
									</button>
									<button className="px-3 py-1 bg-red-500  rounded" onClick={() => removeTodo(index)}>
										Remove
									</button>
									<button className="px-3 py-1 bg-blue-500  rounded" onClick={() => increment(index)}>
										+
									</button>
									<button className="px-3 py-1 bg-yellow-500  rounded" onClick={() => deincrement(index)}>
										-
									</button>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default App;
