import {motion} from "framer-motion";
import contact_img from "../../asserts/contact-img.webp";
import {container} from "../utils/motion_handler.js";


export const Contact = () => {
	return (
		<>
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
						Get in Touch - We're Here to Help
					</motion.h1>

					{/* BLOG PARAGRAPH */}
					<motion.p
						className="text-gray-300 text-center text-sm md:text-lg max-w-2xl md:max-w-4xl px-4 md:px-0 antialiased"
						initial={{scale: 0}}
						animate={{scale: 1}}
					>
						We’d love to hear from you! Whether you have a question, feedback, or just want to say hello, feel free to
						reach out. Our team is here to assist you with any inquiries or concerns you may have. Get in touch and
						we'll respond as soon as possible!

					</motion.p>
				</section>

				{/* LOWER SECTION */}
				<section className="flex flex-col md:flex-row items-center w-full justify-between py-12">

					{/* CONTACT FORM (Left Side) */}
					<motion.div variants={container(0.25)}
					            initial="hidden"
					            animate="visible"
					            transition={{duration: 0.25}}
					            className="flex flex-col w-full bg-gray-200 p-5 rounded shadow shadow-gray-300 md:w-1/2 px-4 space-y-6">

						{/* TITLE */}
						<h2 className="text-2xl text-gray-800 font-bold">Send Us a Message</h2>

						{/* FORM */}
						<form className="space-y-4">
							<input
								type="text"
								placeholder="Your Name"
								className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 border-2 border-gray-300 focus:outline-none focus:border-purple-500"
							/>
							<input
								type="email"
								placeholder="Your Email"
								className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 border-2 border-gray-300 focus:outline-none focus:border-purple-500"
							/>
							<textarea
								placeholder="Your Message"
								className="w-full p-3 rounded-lg bg-gray-100 text-gray-800 border-2 border-gray-300 focus:outline-none focus:border-purple-500"
								rows="6"
							></textarea>
							<button
								type="submit"
								className="w-full bg-purple-500 text-white py-3 rounded-lg hover:bg-purple-600 transition duration-300"
							>
								Send Message
							</button>
						</form>
					</motion.div>

					{/* AI IMAGE SECTION (Right Side for PC view) */}
					<motion.div variants={container(0.75)}
					            initial={{x: 100, opacity: 0}}
					            animate="visible"
					            transition={{duration: 0.25}}

					            className="hidden md:flex justify-center px-4 ">
						<motion.img
							whileHover={{scale: 1.1}}
							whileTap={{scale: 0.95}}
							src={contact_img}
							alt="AI Image"
							className="w-1/2 h-auto rounded-lg shadow-lg"
						/>
					</motion.div>
				</section>
			</main>
		</>
	);
}