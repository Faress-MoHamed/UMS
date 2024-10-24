import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Users from "./pages/Users";
import User from "./pages/User";
import AddUser from "./pages/AddUser";
import Profile from "./pages/Profile";
import AuthLayout from "./pages/AuthLayout";
import ProtectedRoute from "./pages/ProtectedRoute";

export default function App() {
	const routes = createBrowserRouter([
		{
			path: "/",
			element: (
				<ProtectedRoute>
					<Layout />
				</ProtectedRoute>
			),
			children: [
				{
					path: "",
					element: <Home />,
				},
				{
					path: "/users",
					element: <Users />,
				},
				{
					path: "/users/:id",
					element: <User />,
				},
				{
					path: "/add-user",
					element: <AddUser />,
				},
				{
					path: "/profile",
					element: <Profile />,
				},
			],
		},
		{
			path: "/login",
			element: (
				<ProtectedRoute>
					<AuthLayout />
				</ProtectedRoute>
			),
		},
	]);
	return (
		<>
			<RouterProvider router={routes} />
		</>
	);
}
