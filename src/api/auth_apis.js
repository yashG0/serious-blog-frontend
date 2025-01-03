import axios from "axios";
import {BACKEND_URL} from "../../asserts/constants.js";
import log from "../utils/logger_handler.js";

const signInUser = async (email, password) => {

	const header = {
		'Accept': 'application/json',
		'Content-Type': 'application/x-www-form-urlencoded',
	}

	const body = new URLSearchParams({
		grant_type: 'password',
		username: email,
		password: password,
		scope: '',
		client_id: 'string',
		client_secret: 'string',
	}).toString();

	try {

		const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, body, {headers: header});

		log.info(`User ${email} signed in successfully`);

		localStorage.setItem('access_token', response.data.access_token);

	} catch (e) {
		log.error(`Failed to sign in user: ${e.message}`);
		throw new Error("Failed to sign in user");
	}
}

export {signInUser};