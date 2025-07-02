import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
	const [post, setPost] = useState([]);
	const [loading, setloading] = useState(true);

	useEffect(() => {
		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => res.json())
			.then((data) => {
				setPost(data);
				setloading(false);
			});
	}, []);

	useEffect(() => {
		const fetchPosts = async () => {
			const res = await fetch("https://jsonplaceholder.typicode.com/posts");
			const data = await res.json();
			setPost(data);
			setloading(false);
		};
		fetchPosts();
	}, []);

	return (
		<div className="card">
			<h1>post</h1>
			{loading ? (
				<div> post is loading ... </div>
			) : (
				<ul className="bg-slate-400 text-black">
					{post.map((post) => (
						<li key={post.id} className="border">
							<b>{post.title}</b>
							<p>{post.body}</p>
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default App;
