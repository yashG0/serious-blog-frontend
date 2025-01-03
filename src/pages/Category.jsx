import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import {fetchAllCategory} from "../api/category_apis.js";
import loadingIcon from "../../asserts/loading_icon.gif";

export const Category = () => {

	const [category, setCategory] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState("")

	useEffect(() => {
		fetchAllCategory().then((data) => setCategory(data)).catch((err) => setError(err)).finally(() => setLoading(false))
	}, [])

	return (
		<>
			{/* BACKGROUND */}
			<div className="absolute top-0 z-[-2] h-1/2 w-full bg-black"></div>

			{/* OUTER CONTAINER */}
			<main className="container mx-auto h-screen w-full px-4 md:px-6 lg:px-8">

				{/* UPPER SECTION */}
				<section className="flex flex-col justify-center items-center h-2/5 w-full space-y-6 md:space-y-4 text-center">

					{/* CATEGORY HEADING */}
					<motion.h1
						className="text-white text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-4 poppins-bold-italic antialiased text-center"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
					>
						Explore Our Diverse Categories
					</motion.h1>

					{/* CATEGORY PARAGRAPH */}
					<motion.p
						className="text-gray-300 text-center text-sm md:text-lg max-w-2xl md:max-w-4xl px-4 md:px-0 antialiased"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						Discover stories that spark curiosity, inspire ideas, and keep you informed across a range of topics. Find
						your next favorite read today!
					</motion.p>
				</section>

				{/*	LOWER SECTION */}
				<section className={"text-black w-full my-9"}>

					{/* CARDs PART */}
					<div className={"grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 md:gap-10 justify-items-center"}>
						{
							loading ? (
								<div className="flex justify-center items-center h-full w-full">
									<img className="w-16 h-16" src={loadingIcon} alt="loading"/>
								</div>
							) : error ? (
								<span className="bg-slate-200 text-lg md:text-3xl p-2 flex justify-center items-center w-full h-full">
									Failed to Fetch Data from server
								</span>
							) : category.length === 0 ? (
								<span className="bg-slate-200 text-lg md:text-3xl p-2 flex justify-center items-center w-full h-full">
									No Data Found
								</span>
							) : (
								category.map((item, key) => (
									<div
										key={key}
										className="max-w-xs w-full bg-white rounded-xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 space-y-4"
									>
										<h5 className="text-xl font-semibold text-gray-800 hover:text-purple-500 transition duration-300">
											{item.name}
										</h5>
										<p className="text-sm text-gray-600">{item.description}</p>
										<button
											className="w-full text-center text-white bg-purple-400 hover:bg-purple-600 py-2 rounded-md mt-4 transition duration-300"
										>
											Explore {item.name}
										</button>
									</div>
								))

							)
						}
					</div>
				</section>
			</main>
		</>
	);
};