export const Footer = () => {
	return (
		<footer className="bg-black text-white p-6 w-full absolute">
			<div className="container mx-auto text-center">
				<p className="text-sm md:text-lg">
					&copy; {new Date().getFullYear()} Your Website. All rights reserved.
				</p>
				<p className="text-xs md:text-sm mt-2">
					Follow us on{" "}
					<a href="#" className="text-blue-400 hover:text-blue-600">
						Facebook
					</a>
					,{" "}
					<a href="#" className="text-blue-400 hover:text-blue-600">
						Twitter
					</a>
					,{" "}
					<a href="#" className="text-blue-400 hover:text-blue-600">
						Instagram
					</a>
				</p>
			</div>
		</footer>
	);
}
