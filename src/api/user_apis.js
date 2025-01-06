import axios from "axios";
import {BACKEND_URL} from "../../asserts/constants.js";
import log from "../utils/logger_handler.js";


const fetchUserData = async () => {

	const token = localStorage.getItem("access_token");
	if (!token) {
		log.error("No token found");
		throw new Error("No token found");
	}
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/user/me`, {
			headers: {
				"Authorization": `Bearer ${token}`,
				"accept": "application/json",
			}
		});
		log.info("User Data fetched successfully!")
		return response.data;

	} catch (e) {
		log.error(`Failed to fetch user data: ${e.message}`);
		throw new Error("Failed to fetch user data");
	}
}

const checkUserIsAdmin = async () => {
	const token = localStorage.getItem("access_token");
	if (!token) {
		log.error("No token found");
		throw new Error("No token found");
	}
	const response = await axios.get(`${BACKEND_URL}/api/v1/user/is_admin`, {
		headers: {
			"Authorization": `Bearer ${token}`,
			"accept": "application/json",
		}
	})

	if (response.status === 200) {
		return response.data;
	}
	log.error("Failed to fetch user data");
}

export {fetchUserData, checkUserIsAdmin};