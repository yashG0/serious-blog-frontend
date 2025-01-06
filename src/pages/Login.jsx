import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import {useState} from "react";
import {signInUser} from "../api/auth_apis.js";

export const Login = () => {

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const submitHandler = (e) => {
		e.preventDefault();
		signInUser(email, password)
			.then(() => {
				window.location.href = "/account";
			})
			.catch((err) => setError(err))
			.finally(() => {
					setEmail("");
					setPassword("");
				}
			)
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
						Welcome Back to Your Account

					</motion.h1>

					{/* BLOG PARAGRAPH */}
					<motion.p
						className="text-gray-300 text-center text-sm md:text-lg max-w-2xl md:max-w-4xl px-4 md:px-0 antialiased"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						Please log in to access your personalized dashboard and continue where you left off. Stay connected, manage
						your account, and explore the latest features. Enter your details below to get started.
					</motion.p>
				</section>

				{/*	LOWER CONTAINER */}
				<section className="flex items-center justify-center md:my-9">

					{/* LEFT SIDE FORM */}
					<div className="bg-gray-300 shadow-md rounded-lg p-6 w-full max-w-md">
						<h2 className="text-2xl font-bold text-black text-center mb-4">Login</h2>
						<form className="space-y-4 text-black" onSubmit={submitHandler}>
							<div>
								<label htmlFor="email" className="block text-gray-600 font-medium">
									Email
								</label>
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									type="email"
									className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring focus:ring-purple-300"
									placeholder="Enter your email"
									autoComplete="email"
								/>
							</div>
							<div>
								<label htmlFor="password" className="block text-gray-600 font-medium">
									Password
								</label>
								<input
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									id="password"
									type="password"
									className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:ring focus:ring-purple-300"
									placeholder="Enter your password"
									autoComplete="current-password"
								/>
							</div>
							<button
								type="submit"
								className="w-full bg-purple-700 text-white font-medium py-2 rounded hover:bg-purple-600 focus:outline-none focus:ring focus:ring-purple-300"
							>
								Login
							</button>
							<p className="text-sm text-gray-600 text-center mt-4">
								Don't have an account?{" "}
								<Link to="/register" className="font-medium text-purple-700 hover:underline">
									Sign up
								</Link>
							</p>
						</form>
					</div>
				</section>

			</main>
		</>
	)
		;
}
