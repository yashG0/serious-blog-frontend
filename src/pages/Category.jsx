import {motion} from "framer-motion";
import {container} from "../utils/motion_handler.js";

export const Category = () => {
	return (
		<>
			{/* BACKGROUND */}
			<div
				className="absolute top-0 z-[-2] h-2/5 w-screen bg-black"
			></div>

			{/* OUTER CONTAINER */}
			<main className="container mx-auto h-screen px-4 sm:px-6 md:px-8">

				{/* UPPER SECTION */}
				<section className="flex flex-col justify-center items-center w-full h-[29.25%]">
					{/* HERO HEADING */}
					<motion.h1
						className="text-white text-4xl md:text-5xl lg:text-6xl tracking-wide mb-4 poppins-bold-italic antialiased text-center"
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
					>
						Our Category Section
					</motion.h1>
				</section>

				{/* MAIN SECTION */}
				<section className="text-black text-center sm:text-left p-4 md:p-8">
					<p className="text-lg md:text-xl">
						Explore various categories available to suit your needs.
					</p>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
						{/* Example Category Cards */}
						<div className="p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg">
							<h3 className="text-xl font-semibold">Category 1</h3>
							<p>Some description here.</p>
						</div>
						<div className="p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg">
							<h3 className="text-xl font-semibold">Category 2</h3>
							<p>Some description here.</p>
						</div>
						<div className="p-4 bg-gray-200 rounded-lg shadow-md hover:shadow-lg">
							<h3 className="text-xl font-semibold">Category 3</h3>
							<p>Some description here.</p>
						</div>
					</div>
				</section>
			</main>
		</>
	);
};