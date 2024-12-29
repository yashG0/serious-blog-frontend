import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";
import {BACKEND_URL} from "../../asserts/constants.js";

export function PostCard({title, content, image}) {
	return (
		<Card className="mt-6 w-full sm:w-96 md:w-80 lg:w-96 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white">
			<CardHeader
				color="blue-gray"
				className="relative h-56 overflow-hidden rounded-t-lg"
			>
				<img
					className="absolute h-full w-full object-cover object-center transition-transform duration-500 hover:scale-110"
					src={`${BACKEND_URL}/${image}`}
					alt={title}
				/>
			</CardHeader>
			<CardBody className="p-6 h-[15vh]">
				<Typography
					variant="h5"
					color="blue-gray"
					className="mb-3 font-bold text-lg poppins-bold"
				>
					{title}
				</Typography>
				<Typography
					color="gray"
					className="text-sm text-justify leading-relaxed poppins-light"
				>
					{content.length > 50 ? `${content.substring(0, 75)}...` : content}
				</Typography>
			</CardBody>
			<CardFooter className="flex justify-center items-center p-4 border-t border-gray-200">
				<Button
					className="text-white bg-purple-400 hover:bg-purple-600 shadow-md hover:shadow-lg"
					size="sm"
				>
					Read More
				</Button>
			</CardFooter>
		</Card>
	);
}