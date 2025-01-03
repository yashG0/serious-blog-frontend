import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import {fetchPostByUserId} from "../api/post_apis.js";
import loadingIcon from "../../asserts/loading_icon.gif";
import {PostCard} from "../components/PostCard.jsx";


export const Blog = () => {
	const [posts, setPosts] = useState([{
		"title": "Exploring the Cosmos",
		"content": "An in-depth look at recent advancements in space exploration.",
		"user_id": "493a3bd7-abde-4758-b430-e1fc8a650f12",
		"created_at": "2024-12-28T18:38:05.816338",
		"id": "8cd127d9-3cef-444c-8b57-c263ec798a98",
		"image": "static/images/0ba22150-5954-4232-a13e-51ab631ed639.jpg",
		"category_id": "17f1cfbc-b485-446b-b128-a62990e6331f",
		"updated_at": "2024-12-28T18:38:05.816340"
	}]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	// useEffect(() => {
	// 	fetchPostByUserId().then((data) => setPosts(data)).catch((err) => setError(err)).finally(() => setLoading(false));
	// })

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
						Our Blog - Explore Engaging Insights & Stories
					</motion.h1>

					{/* BLOG PARAGRAPH */}
					<motion.p
						className="text-gray-300 text-center text-sm md:text-lg max-w-2xl md:max-w-4xl px-4 md:px-0 antialiased"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						Delve into a world of captivating stories, fresh perspectives, and thought-provoking articles. Stay updated
						with the latest trends, tips, and insights that will inspire and inform you. Your next great read is just a
						click away!
					</motion.p>
				</section>


				{/* LOWER CONTAINER */}
				<section className={"text-black w-full my-9"}>
					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8">
						{/* Loading or error states */}
						{loading ? (
							<div className="flex justify-center items-center w-full">
								<img src={loadingIcon} alt="loading" className="w-16 h-16"/>
							</div>
						) : error ? (
							<div className="text-center text-lg text-red-500">{error}</div>
						) : (
							posts.map((post, index) => (
								<PostCard key={index} title={post.title} image={post.image} content={post.content}/>
							))
						)}
					</div>
				</section>
			</main>
		</>
	);
}