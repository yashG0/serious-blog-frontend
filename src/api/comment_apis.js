import axios from "axios";
import {BACKEND_URL} from "../../asserts/constants.js";
import log from "../utils/logger_handler.js";

const fetchCommentByPostId = async (id) => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/comment/all/${id}`);
		if (response.status === 200) {
			log.info(`Comment for post ${id} fetched successfully!`);  // Log the response data
			return response.data;
		}
		log.debug(`Failed to fetch comments: status code ${response.status}`);
		return `Failed to fetch comment for post ${id}`;

	} catch (e) {
		log.error(`Failed to fetch all posts: ${e.message}`);
		throw new Error(`Failed to fetch all posts with error: ${e.message}`);
	}
}

const createComment = async (postId, content) => {
	try {
		const token = localStorage.getItem("access_token");

		if (!token) {
			log.error("No token found");
			throw new Error("No token found");
		}

		const response = await axios.post(
			`${BACKEND_URL}/api/v1/comment/create/${postId}`,
			{content},
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
					accept: "application/json",
				},
			}
		);

		if (response.status === 201) {
			console.log("Comment created successfully:", response.data);
			return true;
		}
		log.debug(`Failed to create comment: status code ${response.status}`);
		return `Failed to create comment`;

	} catch (e) {
		log.error(`Failed to create comment: ${e.message}`);
		throw new Error(`Failed to create comment with error: ${e.message}`);
	}
}

const deleteCommentById = async (postId, commentId) => {

	const token = localStorage.getItem("access_token");
	try {
		const response = await axios.delete(`${BACKEND_URL}/api/v1/comment/remove/${postId}/${commentId}`,{
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
				accept: "application/json",
			}
		});
		if (response.status === 204) {
			log.info(`Comment removed successfully!`);
			return true
		}
		log.debug(`Failed to removed comment: status code ${response.status}`);
		return `Failed to removed comment`;
	} catch (e) {
		log.error(`Failed to removed comment: ${e.message}`);
		throw new Error(`Failed to removed comment with error: ${e.message}`);
	}
}

export {fetchCommentByPostId, createComment, deleteCommentById}