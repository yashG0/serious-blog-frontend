import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {fetchUserData} from "../api/user_apis.js";
import loadingIcon from "../../asserts/loading_icon.gif";
import {Link} from "react-router-dom";

export const ViewAccount = () => {

	const [userData, setUserData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		fetchUserData().then((data) => {
			setUserData(data)
			console.log(data)
		}).catch((err) => setError(err)).finally(() => setLoading(false))
	}, [])

	const logOutHandler = () => {
		localStorage.removeItem("access_token");
		window.location.href = "/login";
	}

	return (
		<>
			{/* BACKGROUND */}
			<div className="absolute top-0 z-[-2] h-1/2 w-full bg-black"></div>

			{/* OUTER CONTAINER */}
			<main className="container mx-auto h-screen w-full px-4 md:px-6 lg:px-8">

				{/* UPPER SECTION */}
				<section className="flex flex-col justify-center items-center h-2/5 w-full space-y-6 md:space-y-4 text-center">

					{/* BLOG HEADING */}
					<motion.h1
						className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-4 poppins-bold-italic antialiased text-center"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						View Your Account

					</motion.h1>

					{/* BLOG PARAGRAPH */}
					<motion.p
						className="text-gray-300 text-center text-sm md:text-lg max-w-2xl md:max-w-4xl px-4 md:px-0 antialiased"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						A view of your account and all of the content you have created.
					</motion.p>
				</section>

				{/* LOWER SECTION	*/}
				<section className="md:mt-8 w-full bg-gray-200  rounded-lg shadow-lg shadow-gray-300 p-6 md:p-8">
					{/* Loading State */}
					{loading && (
						<div className="flex justify-center items-center h-full w-full">
							<img className="w-16 h-16 animate-spin" src={loadingIcon} alt="Loading..."/>
						</div>
					)}

					{/* Error State */}
					{error && (
						<p className="text-red-500 text-center text-lg font-medium">{error}</p>
					)}

					{/* User Data */}
					{userData && (
						<div className="space-y-6">
							{/* Heading */}
							<h2 className="text-2xl font-extrabold text-center text-gray-800 roboto-bold">
								Account Details
							</h2>

							{/* Details */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
								<div>
									<p className="text-sm md:text-base text-gray-600 roboto-medium">
										Username:
									</p>
									<p className="text-sm md:text-base text-gray-800 poppins-regular">{userData.username}</p>
								</div>
								<div>
									<p className="text-sm md:text-base text-gray-600 roboto-medium">
										Email:
									</p>
									<p className="text-sm md:text-base text-gray-800 poppins-regular">{userData.email}</p>
								</div>
								<div>
									<p className="text-sm md:text-base  text-gray-600 roboto-medium">
										Active:
									</p>
									<p className="text-sm md:text-base text-gray-800 poppins-regular">
										{userData.is_active ? "Yes" : "No"}
									</p>
								</div>
								<div>
									<p className="text-sm md:text-base  text-gray-600 roboto-medium">
										Admin:
									</p>
									<p className="text-sm md:text-base text-gray-800 poppins-regular">
										{userData.is_admin ? "Yes" : "No"}
									</p>
								</div>
								<div>
									<p className="text-sm md:text-base  text-gray-600 roboto-medium">
										Created At:
									</p>
									<p className="text-sm md:text-base text-gray-800 poppins-regular">
										{new Date(userData.created_at).toLocaleString()}
									</p>
								</div>
								<div>
									<p className="text-sm md:text-base  text-gray-600 roboto-medium">
										Updated At:
									</p>
									<p className="text-sm md:text-base text-gray-800 poppins-regular">
										{new Date(userData.updated_at).toLocaleString()}
									</p>
								</div>
							</div>
						</div>
					)}
				</section>

				{/* LOGOUT BUTTON	*/}
				<div className={"text-black text-center mt-8"}>
					<motion.button
						className="px-4 py-2  bg-transparent capitalize border-2 bg-red-500 text-white hover:bg-red-600 rounded"
						initial={{opacity: 0}}
						animate={{opacity: 1}}
						onClick={logOutHandler}>
						log out
					</motion.button>
				</div>
			</main>
		</>
	)
}