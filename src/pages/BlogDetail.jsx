import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {fetchPostById} from "../api/post_apis.js";
import {fetchCommentByPostId, createComment, deleteCommentById} from "../api/comment_apis.js"; // Ensure you have this function
import {motion} from "framer-motion";
import {BACKEND_URL} from "../../asserts/constants.js";
import loadingIcon from "../../asserts/loading_icon.gif";
import {fetchUserData} from "../api/user_apis.js";

export const BlogDetail = () => {
	const {id} = useParams();
	const [post, setPost] = useState(null);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");
	const [commentsVisible, setCommentsVisible] = useState(false);
	const [userId, setUserId] = useState(null);
	const [deleteComment, setDeleteComment] = useState(false);

	useEffect(() => {
		fetchPostById(id)
			.then((data) => setPost(data))
			.catch((err) => setError(err))
			.finally(() => setLoading(false));

		fetchUserData().then(data => setUserId(data.id))
		toggleComments();
	}, [id]);




	const toggleComments = () => {
		if (!commentsVisible) {
			fetchCommentByPostId(id)
				.then((data) => setComments(data))
				.catch((err) => setError(err))
				.finally(() => setCommentsVisible(true));
		}
		setCommentsVisible(!commentsVisible);
	}

	const handleAddComment = () => {
		if (newComment.trim() === "") return;
		createComment(id, newComment)
			.then((data) => {
				setComments([...comments, data]);
				setNewComment("");
			})
			.catch((err) => setError(err))
			.finally(() => setLoading(false));
	}


	return (
		<>
			{/* BACKGROUND COLOR */}
			<div className="absolute top-0 z-[-2] h-1/2 w-full bg-black"></div>

			{/* OUTER CONTAINER */}
			<main className="container mx-auto h-screen w-full px-4 md:px-6 lg:px-8">

				{/* UPPER SECTION */}
				<section className="flex flex-col justify-center items-center h-2/5 w-full space-y-6 md:space-y-4 text-center">
					<motion.h1
						className="text-white text-4xl md:text-6xl font-extrabold tracking-tight leading-snug antialiased"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						Blog Details | Explore Captivating Stories
					</motion.h1>
					<motion.p
						className="text-gray-300 text-sm md:text-lg max-w-2xl leading-relaxed"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						Discover insights, engage with stories, and explore captivating
						topics in detail.
					</motion.p>
				</section>

				{/* INNER CONTENT */}
				<section className="mt-10 p-6 md:p-8">
					{loading ? (
						<div className="flex justify-center items-center w-full">
							<img src={loadingIcon} alt="loading" className="w-12 md:w-16 h-12 md:h-16"/>
						</div>
					) : error ? (
						<div className="text-center text-lg text-red-500 bg-gray-200 py-2">{error}</div>
					) : (
						post && (
							<>
								<div className="bg-gray-200 rounded-lg shadow-lg shadow-gray-300 p-6 md:p-8">
									<div className="text-center mb-6">
										<img
											src={`${BACKEND_URL}/${post.image}`}
											alt={post.title}
											className="w-full max-w-lg mx-auto rounded-lg object-cover shadow-md"
										/>
									</div>
									<h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
										{post.title}
									</h1>
									<p className="text-sm text-gray-600 mb-6">
										Published on: {new Date(post.created_at).toLocaleDateString()}
									</p>
									<p className="text-gray-700 leading-relaxed text-lg">
										{post.content}
									</p>
								</div>

								{/* Comment Section */}
								<div className="mt-6">
									<button
										className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
										onClick={toggleComments}
									>
										{commentsVisible ? "Hide Comments" : "Show Comments"}
									</button>

									{commentsVisible && (
										<div className="mt-4 bg-gray-100 rounded-lg p-4 shadow">
											<h2 className="text-lg text-gray-900 font-bold mb-4">Comments</h2>
											<div className="space-y-4">
												{comments.slice(0, 5).map((comment) => (
													<div
														key={comment.id}
														className="p-3 flex justify-between bg-white rounded-md shadow-sm border"
													>
														<div>
															<span className={"text-gray-800"}>{comment.user_id}</span>
															<p className="text-sm text-gray-700">{comment.content}</p>
														</div>
														{userId === comment.user_id && (
															<div className={"text-red-500 font-bold cursor-pointer"} onClick={()=>deleteCommentById(id, comment.id)}>X</div>
														)}
													</div>
												))}
											</div>
											<div className="mt-4">
                        <textarea
	                        className="w-full p-2 border rounded-md text-gray-800"
	                        rows="3"
	                        placeholder="Add a comment..."
	                        value={newComment}
	                        onChange={(e) => setNewComment(e.target.value)}
                        />
												<button
													className="mt-2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
													onClick={handleAddComment}
												>
													Add Comment
												</button>
											</div>
										</div>
									)}
								</div>
							</>
						)
					)}
				</section>
			</main>
		</>
	);
};
