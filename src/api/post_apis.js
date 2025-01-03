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

const fetchPostById = async () => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/posts/${id}`);
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

	const getToken = localStorage.getItem("token");
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

export {fetchAllPosts, fetchPostById, fetchPostByCategoryId, fetchPostByUserId};