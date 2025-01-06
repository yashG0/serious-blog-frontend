import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Layout} from "./pages/Layout.jsx";
import {Hero} from "./pages/Hero.jsx";
import {CreateBlog} from "./pages/CreateBlog.jsx";
import {Login} from "./pages/Login.jsx";
import {Signup} from "./pages/Signup.jsx";
import {Admin} from "./pages/Admin.jsx";
import {Category} from "./pages/Category.jsx";
import {Blog} from "./pages/Blog.jsx";
import {Contact} from "./pages/Contact.jsx";
import {ViewAccount} from "./pages/ViewAccount.jsx";
import {BlogDetail} from "./pages/BlogDetail.jsx";


const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout/>,
		children: [
			{path: '/', element: <Hero/>},
			{path: '/create', element: <CreateBlog/>},
			{path: '/login', element: <Login/>},
			{path: '/register', element: <Signup/>},
			{path: '/admin', element: <Admin/>},
			{path: '/category', element: <Category/>},
			{path: '/blogs', element: <Blog/>},
			{path: '/contact', element: <Contact/>},
			{path: '/account', element: <ViewAccount/>},
			{path: '/post/:id', element: <BlogDetail/>},
		]
	}
])

function App() {

	return (
		<>
			<main className="text-white">
				<RouterProvider router={router}/>
			</main>
		</>
	)
}

export default App
