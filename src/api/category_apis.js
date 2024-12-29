import axios from "axios";
import log from "../utils/logger_handler.js";
import {BACKEND_URL} from "../../asserts/constants.js";


const fetchAllCategory = async () => {
	try {
		const response = await axios.get(`${BACKEND_URL}/api/v1/category/all`);
		if (response.status === 200) {
			log.info(`All categories fetched successfully: ${response.data}`);  // Log the response data
			return response.data;
		}
		log.debug(`Failed to fetch categories: status code ${response.status}`);
		return null;

	} catch (e) {
		log.error(`Failed to fetch all category: ${e}`);
		throw new Error("Failed to fetch all category");
	}
}

const fetchCategoryById = async (id) => {
	try {
		const data = await axios.get(URL + id)
		if (data.status !== 200) {
			return null;
		}
		log.info(`category ${id} fetched Successfully`);
		return data.data;

	} catch (e) {
		log.error(`Failed to fetch category by id: ${e}`);
		throw new Error("Failed to fetch category by id");
	}
}

export {fetchAllCategory, fetchCategoryById};