import { useState, useEffect } from 'react';
import axios from 'axios';

// With Axios, always use the baseUrl to start with to let browser confirm with the server CORS to allow access
const baseUrl = 'https://jsonplaceholder.typicode.com';

function PreventMemoryLeaks() {
	const [post, setPost] = useState({});
	const [isMounted, setIsMounted] = useState(true);

	const fetchPost = async () => {
		try {
			const { data } = await axios.get(`${baseUrl}/todos/1`);

			if (isMounted) {
				console.log(data);
				setPost(data);
			}
		} catch (err) {
			console.error(err);
			// todo, here you can show a Toast of an error message
			return err;
		}
	};

	useEffect(() => {
		fetchPost();
		return () => {
			setIsMounted(false);
		};
	}, []);

	return (
		<>
			{post && (
				<>
					<h3>{post.id}</h3>
					<h3>{post.title}</h3>
				</>
			)}
		</>
	);
}

export default PreventMemoryLeaks;
