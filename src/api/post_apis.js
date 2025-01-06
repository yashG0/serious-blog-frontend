import axios from "axios";
import {BACKEND_URL} from "../../asserts/constants.js";
import log from "../utils/logger_handler.js";


const fetchAllPosts = async () => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/posts/all`);
		if (response.status === 200) {
			log.info(`All posts fetched successfully: ${response.data}`);  // Log the response data
			return response.data;
		}

		log.debug(`Failed to fetch posts: status code ${response.status}`);
		return null;

	} catch (e) {
		log.error(`Failed to fetch all posts: ${e}`);
		throw new Error("Failed to fetch all posts");
	}
}

const fetchPostById = async (id) => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/posts/${id}`);
		if (response.status === 200) {
			log.info(`Post ${id} fetched successfully!`);  // Log the response data
			return response.data;
		}
		log.debug(`Failed to fetch posts: status code ${response.status}`);
		return `Failed to fetch post ${id}`;

	} catch (e) {
		log.error(`Failed to fetch all posts: ${e.message}`);
		throw new Error(`Failed to fetch all posts with error: ${e.message}`);
	}
}

const fetchPostByCategoryId = async (categoryId) => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/posts/all/by_category/${categoryId}`);
		if (response.status === 200) {
			return response.data;
		}

		log.debug(`Failed to fetch posts: status code ${response.status}`);
		return null;
	} catch (e) {
		log.error(`Failed to fetch post by category id: ${e}`);
		throw new Error("Failed to fetch post by category id");
	}
}

const fetchPostByUserId = async () => {
	const getToken = localStorage.getItem("access_token");
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/posts/all/by_user`, {
			headers: {
				"accept": "application/json",
				"Authorization": `Bearer ${getToken}`
			}
		});

		if (response.status === 200) {
			return response.data;
		}
		log.debug(`Failed to fetch posts: status code ${response.status}`);
		return null;

	} catch (e) {
		log.error(`Failed to fetch post by user id: ${e}`);
		throw new Error("Failed to fetch post by user id");
	}
}


const createPost = async (title, content, categoryId, image) => {
	const formData = new FormData();
	formData.append("new_title", title);
	formData.append("new_content", content);
	formData.append("new_category_id", categoryId);
	formData.append("image", image);

	const token = localStorage.getItem("access_token");

	try {
		const response = await axios.post(`${BACKEND_URL}/api/v1/posts/create`, formData, {
			headers: {
				"Authorization": `Bearer ${token}`,
				"Content-Type": "multipart/form-data",
			},
		});

		// Handle successful response
		if (response.status === 201) {
			console.log("Post created successfully:", response.data);
			return response.data;
		}
	} catch (error) {
		// Handle errors
		if (error.response) {
			// If the server responds with an error
			console.error("Error creating post:", error.response.data);
			throw new Error(error.response.data.detail || "Failed to create post");
		} else {
			// If no response is received
			console.error("Network error:", error.message);
			throw new Error("Network error occurred while creating the post.");
		}
	}
};

export {fetchAllPosts, fetchPostById, fetchPostByCategoryId, fetchPostByUserId, createPost};