import React, {useEffect, useState} from "react";
import {createPost} from "../api/post_apis.js";
import {fetchAllCategory} from "../api/category_apis.js";
import log from "loglevel";

export const CreatePostForm = () => {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [categoryId, setCategoryId] = useState("");
	const [image, setImage] = useState(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const [categories, setCategory] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError("");
		setSuccess("");

		try {
			const data = await createPost(title, content, categoryId, image);
			setSuccess("Post created successfully!");
			console.log("Created Post:", data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchAllCategory().then(data => setCategory(data)).catch(err => log.error(err));
	}, [])

	return (
		<form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-200">
			<input
				type="text"
				placeholder="Title"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className="w-full p-2 border border-gray-300 rounded"
			/>
			<textarea
				placeholder="Content"
				value={content}
				onChange={(e) => setContent(e.target.value)}
				className="w-full p-2 border border-gray-300 rounded"
			></textarea>
			<div className="mb-4">
				<label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
				<select
					id="category"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
					className="w-full p-2 border border-gray-300 rounded"
				>
					<option value="">Select a category</option>
					{/* Default option */}
					{/* Map through categories and render each as an option */}
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name} {/* Display category name */}
						</option>
					))}
				</select>
			</div>
			<input
				type="file"
				onChange={(e) => setImage(e.target.files[0])}
				className="w-full p-2"
			/>
			<button
				type="submit"
				disabled={loading}
				className="px-4 py-2 bg-purple-500 text-white rounded"
			>
				{loading ? "Creating..." : "Create Post"}
			</button>
			{error && <div className="text-red-500">{error}</div>}
			{success && <div className="text-green-500">{success}</div>}
		</form>
	);
};
