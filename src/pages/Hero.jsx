import {fetchAllPosts, fetchPostByCategoryId, fetchPostById} from "../api/post_apis.js";
import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import {container} from "../utils/motion_handler.js";
import {FaArrowRight} from "react-icons/fa6";
import {CATEGORIES} from "../../asserts/constants.js";
import loadingIcon from "../../asserts/loading_icon.gif";
import {PostCard} from "../components/PostCard.jsx";
import {fetchAllCategory} from "../api/category_apis.js";
import {get_id_by_category_name} from "../utils/get_id_by_category_name.js";

export const Hero = () => {
	const [postData, setPostData] = useState([]);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [activeCategory, setActiveCategory] = useState("All");
	const [category, setCategory] = useState([])

	useEffect(() => {
		if (activeCategory === "All") {
			fetchAllPosts()
				.then((data) => setPostData(data))
				.catch((err) => setError(err))
				.finally(() => setLoading(false));
		} else {
			fetchAllCategory().then((data) => {
				const category = data.find((item) => item.name === activeCategory);
				return category.id
			}).then((id) => fetchPostByCategoryId(id)).then((data) => setPostData(data)).catch((err) => setError(err)).finally(() => setLoading(false));
		}
	}, [activeCategory]);

	return (
		<>
			<div className="text-purple-400 absolute top-0 z-[-2] h-1/2 w-full bg-black"></div>

			{/* OUTER CONTAINER */}
			<main className="container mx-auto h-screen w-full px-4 md:px-6 lg:px-8">

				{/* UPPER SECTION */}
				<section className="flex flex-col justify-center items-center h-2/5 w-full space-y-6 md:space-y-4 text-center">

					{/* HERO HEADING */}
					<motion.h1
						className="text-white text-4xl md:text-6xl font-bold tracking-wide antialiased"
						variants={container(0.25)}
						initial="hidden"
						animate="visible"
						transition={{duration: 0.25}}
					>
						Welcome to Our Blog
					</motion.h1>

					{/* HERO PARAGRAPH */}
					<motion.p
						className="text-gray-300 text-sm md:text-lg max-w-2xl md:max-w-4xl px-4 md:px-0 antialiased"
						variants={container(0.5)}
						initial="hidden"
						animate="visible"
						transition={{duration: 0.25}}
					>
						Dive into a world of captivating stories, insightful articles, and the latest trends across various topics.
						Explore, learn, and be inspired as you journey through our thoughtfully crafted content.
					</motion.p>

					{/* LEARN MORE LINK */}
					<motion.span
						className="flex items-center justify-center my-2 space-x-2 border border-gray-300 px-4 py-2 rounded cursor-pointer text-sm md:text-base"
						whileHover={{scale: 1.1}}
						whileTap={{scale: 0.95}}
						variants={container(0.75)}
						initial={{x: 100, opacity: 0}}
						animate="visible"
						transition={{duration: 0.25}}
					>
						<span>Learn more</span> <FaArrowRight/>
					</motion.span>
				</section>

				{/* MAIN SECTION */}
				<section className="text-black w-full">
					{/* CATEGORY LIST */}
					<ul
						className="capitalize flex flex-wrap text-sm md:text-xl p-4 md:p-5 justify-center space-x-4 md:space-x-6 poppins-medium w-full">
						{CATEGORIES.map((item, index) => (
							<li
								key={index}
								className={`cursor-pointer ${activeCategory === item ? "text-purple-400 border-b-2 border-purple-400" : ""}`}
								onClick={() => setActiveCategory(item)}
							>
								{item}
							</li>
						))}
					</ul>

					<hr className="border-gray-200"/>

					{/* POSTS */}
					<div
						className={`w-full ${error ? "text-purple-400 mt-20" : "grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:gap-10 justify-items-center"}`}>
						{loading ? (
							<div className="flex justify-center items-center h-full w-full">
								<img className="w-16 h-16" src={loadingIcon} alt="loading"/>
							</div>
						) : error ? (
							<span className="bg-slate-200 text-lg md:text-3xl p-2 flex justify-center items-center w-full h-full">
								Failed to Fetch Data from server
							</span>
						) : postData.length === 0 ? (
							<span className="bg-slate-200 text-lg md:text-3xl p-2 flex justify-center items-center w-full h-full">
								No Data Found
							</span>
						) : (
							postData.map((item, key) => (
								<PostCard key={key} title={item.title} image={item.image} content={item.content}/>
							))
						)}
					</div>
				</section>
			</main>
		</>
	);
};