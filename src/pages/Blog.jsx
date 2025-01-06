import {motion} from "framer-motion";
import {useState, useEffect} from "react";
import { fetchPostByUserId} from "../api/post_apis.js";
import loadingIcon from "../../asserts/loading_icon.gif";
import {PostCard} from "../components/PostCard.jsx";
import {CreatePostForm} from "../components/CreatePostForm.jsx";
import { IoAdd } from "react-icons/io5";


export const Blog = () => {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [showCreatePostForm, setShowCreatePostForm] = useState(false); // Manage form visibility

	useEffect(() => {
		fetchPostByUserId().then((data) => setPosts(data)).catch((err) => setError(err)).finally(() => setLoading(false));
	})

	const toggleCreatePostForm = () => {
		setShowCreatePostForm((prevState) => !prevState); // Toggle form visibility
	};

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
				<section className={"text-black w-full my-9 flex justify-between flex-col items-center"}>

					{/* USER POSTs DATA */}
					<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 px-2 h-[80vh] overflow-y-scroll scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-300">
						{/* Loading or error states */}
						{
							loading ? (
								<div className="flex justify-center items-center w-full">
									<img src={loadingIcon} alt="loading" className="w-16 h-16"/>
								</div>
							) : error ? (
								<div className="text-center text-lg text-red-500">{error}</div>
							) : (
								posts.length === 0 ? (
										<div className="bg-gray-300 mx-auto p-2 text-center text-lg text-red-500">You have no post!</div>
									) :
									posts.map((post, index) => (
										<PostCard key={index} title={post.title} image={post.image} content={post.content}/>
									))
							)}
					</div>

					{/* ADD NEW POST BUTTON */}
					<div className="mt-4 flex justify-center">
						<button
							onClick={toggleCreatePostForm}
							className="bg-violet-600 text-white p-4 rounded-full hover:bg-violet-700 transition">
							{/* Plus Icon */}
							<span className="text-xl"> <IoAdd /> </span>
						</button>
					</div>

					{/* CONDITIONAL CREATE POST FORM */}
					{showCreatePostForm && (
						<div className="mt-6">
							<CreatePostForm />
						</div>
					)}
				</section>
			</main>
		</>
	);
}