import {Link} from "react-router-dom";
import {motion} from "framer-motion";
import {NAV_LINKS} from "../../asserts/constants.js";
import {useState} from "react";

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	return (
		<>
			{/* OUTER CONTAINER */}
			<nav className="container mx-auto h-[10vh] poppins-black">

				{/* INNER CONTAINER */}
				<div className="flex justify-between items-center h-full px-4 sm:px-8">

					{/* APP TITLE */}
					<Link to="/">
						<motion.h1 className="text-4xl font-bold text-white flex items-center space-x-2 cursor-pointer"
						           initial={{opacity: 0}}
						           animate={{opacity: 1}}>
              <span
	              className="bg-purple-500 text-black px-2 py-1 rounded-lg shadow-lg transform hover:scale-105 transition-transform"> B </span>
							<span className="text-gray-300 hover:text-purple-400 transition-colors"> logMaster </span>
						</motion.h1>
					</Link>

					{/* NAV LINKS */}
					<div
						className="hidden sm:flex items-center space-x-6 text-sm font-medium text-gray-300 uppercase tracking-wide">
						<ul className="flex items-center space-x-6">
							{
								NAV_LINKS.map((item, key) => (
									<motion.li key={key}
									           className="hover:text-purple-400 transition-colors duration-300 border-b-2 border-transparent hover:border-purple-400"
									           whileHover={{scale: 1.1}}
									           whileTap={{scale: 0.95}}>
										<Link to={item.link}>{item.name}</Link>
									</motion.li>
								))
							}
						</ul>

						{/* AUTH MANAGEMENT */}
						<div className="flex items-center space-x-6 text-sm font-medium text-gray-300 uppercase tracking-wide">
							<motion.button
								className="px-4 py-2 bg-transparent border-2 border-purple-400 hover:bg-purple-400 hover:text-black rounded"
								initial={{opacity: 0}}
								animate={{opacity: 1}}>
								<Link to="/login">Login</Link>
							</motion.button>
							<motion.button className="px-4 py-2 bg-purple-400 hover:bg-purple-500 text-black rounded"
							               initial={{opacity: 0}}
							               animate={{opacity: 1}}>
								<Link to="/register">Register</Link>
							</motion.button>
						</div>
					</div>

					{/* MOBILE MENU ICON */}
					<div className="sm:hidden flex items-center">
						<button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
							<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
							     className="w-6 h-6">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
							</svg>
						</button>
					</div>

				</div>

			</nav>

			{/* MOBILE MENU */}
			<div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"} bg-black text-white`}>
				<ul className="space-y-4 py-4 px-6">
					{
						NAV_LINKS.map((item, key) => (
							<motion.li key={key} className="hover:text-purple-400 transition-colors duration-300 uppercase">
								<Link to={item.link} onClick={() => setIsMenuOpen(false)}>{item.name}</Link>
							</motion.li>
						))
					}
					<div className="flex flex-col space-y-4 mt-4">
						<motion.button
							className="px-4 py-2 bg-transparent border-2 border-purple-400 hover:bg-purple-400 hover:text-black rounded"
							initial={{opacity: 0}}
							animate={{opacity: 1}}>
							<Link to="/login">Login</Link>
						</motion.button>
						<motion.button className="px-4 py-2 bg-purple-400 hover:bg-purple-500 text-black rounded"
						               initial={{opacity: 0}}
						               animate={{opacity: 1}}>
							<Link to="/register">Register</Link>
						</motion.button>
					</div>
				</ul>
			</div>

		</>
	);
};