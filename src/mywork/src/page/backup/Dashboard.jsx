import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard({ setAuth }) {
	const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem("todos") || "[]"));
	const [input, setInput] = useState("");
	const [desc, setDesc] = useState("");
	const [filter, setFilter] = useState("all");
	const [search, setSearch] = useState("");
	const [editIndex, setEditIndex] = useState(null);
	const [status, setStatus] = useState("pending");
	const navigate = useNavigate();

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const logout = () => {
		setAuth(false);
		localStorage.setItem("isAuth", "false");
		localStorage.removeItem("currentUser");
		navigate("/login");
	};

	const handleAddOrUpdate = () => {
		if (!input.trim()) return;
		if (editIndex !== null) {
			const updated = todos.map((todo, idx) => (idx === editIndex ? { ...todo, title: input, description: desc, status } : todo));
			setTodos(updated);
			setEditIndex(null);
		} else {
			setTodos([...todos, { title: input, description: desc, status: "pending" }]);
		}
		setInput("");
		setDesc("");
		setStatus("pending");
	};

	const handleEdit = (idx) => {
		setInput(todos[idx].title);
		setDesc(todos[idx].description);
		setStatus(todos[idx].status);
		setEditIndex(idx);
	};

	const handleDelete = (idx) => {
		setTodos(todos.filter((_, i) => i !== idx));
	};

	const handleToggle = (idx) => {
		setTodos(todos.map((todo, i) => (i === idx ? { ...todo, status: todo.status === "completed" ? "pending" : "completed" } : todo)));
	};

	const filteredTodos = todos.filter((todo) => {
		if (filter !== "all" && todo.status !== filter) return false;
		if (search && !todo.title.toLowerCase().includes(search.toLowerCase())) return false;
		return true;
	});

	return (
		<div className="card max-w-2xl mx-auto mt-10">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-2xl font-bold">Todo Dashboard</h2>
				<button className="bg-red-500 text-white px-3 py-1 rounded" onClick={logout}>
					Logout
				</button>
			</div>
			<div className="flex gap-2 mb-4">
				<input
					type="text"
					className="flex-grow p-2 border rounded"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder="Title (required)"
				/>
				<input
					type="text"
					className="flex-grow p-2 border rounded"
					value={desc}
					onChange={(e) => setDesc(e.target.value)}
					placeholder="Description (optional)"
				/>
				<button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleAddOrUpdate}>
					{editIndex !== null ? "Update" : "Add"}
				</button>
			</div>
			<div className="flex gap-2 mb-4">
				<input
					type="text"
					className="p-2 border rounded flex-grow"
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					placeholder="Search by title"
				/>
				<select className="p-2 border rounded" value={filter} onChange={(e) => setFilter(e.target.value)}>
					<option value="all">All</option>
					<option value="completed">Completed</option>
					<option value="pending">Pending</option>
				</select>
			</div>
			<ul>
				{filteredTodos.map((todo, idx) => (
					<li key={idx} className="flex items-center justify-between border-b py-2">
						<div>
							<span className={`font-semibold ${todo.status === "completed" ? "line-through text-green-600" : ""}`}>{todo.title}</span>
							{todo.description && <span className="ml-2 text-gray-500">({todo.description})</span>}
							<span
								className={`ml-2 px-2 py-1 rounded text-xs ${
									todo.status === "completed" ? "bg-green-200 text-green-800" : "bg-yellow-200 text-yellow-800"
								}`}
							>
								{todo.status}
							</span>
						</div>
						<div className="flex items-center gap-2">
							<button className="bg-green-500 text-white px-2 rounded" onClick={() => handleToggle(idx)}>
								{todo.status === "completed" ? "Mark Pending" : "Mark Done"}
							</button>
							<button className="bg-blue-500 text-white px-2 rounded" onClick={() => handleEdit(idx)}>
								Edit
							</button>
							<button className="bg-red-500 text-white px-2 rounded" onClick={() => handleDelete(idx)}>
								Delete
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;
