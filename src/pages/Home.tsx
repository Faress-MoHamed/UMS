import { UsersIcon, UserPlusIcon, BookOpenIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers } from "../Api/EndPoints";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

// Define types for the User and Stat objects
interface User {
	firstName: string;
	lastName: string;
	email: string;
}

interface Stat {
	title: string;
	icon: React.ElementType;
	value: string;
	change: string;
}

export default function Dashboard() {
	const [users, setUsers] = useState<User[]>([]); // Remove 'unknown'
	const { auth } = useAuth();
	useEffect(() => {
		const fetchData = async () => {
			const res = await getAllUsers();
			if (Array.isArray(res)) {
				setUsers(res); // Ensure 'res' is an array before setting the state
			}
		};
		fetchData();
	}, []);

	const stats: Stat[] = [
		{
			title: "Total Users",
			icon: UsersIcon,
			value: "1,234",
			change: "+20% from last month",
		},
		{
			title: "Active Users",
			icon: UsersIcon,
			value: "890",
			change: "+5% from last week",
		},
		{
			title: "New Users (This Month)",
			icon: UserPlusIcon,
			value: "145",
			change: "+12% from last month",
		},
		{
			title: "User Logins (Today)",
			icon: BookOpenIcon,
			value: "573",
			change: "+8% from yesterday",
		},
	];

	const recentActivities = [
		"John Doe logged in",
		"Jane Smith updated profile",
		"New user registered: Alex Johnson",
		"Password reset for user ID: 1234",
		"User role changed: Sarah Brown",
	];

	return (
		<div className="flex bg-gray-100">
			<main className="flex-1 px-6 py-6 overflow-auto">
				<div className="grid gap-6">
					<h2 className="text-3xl font-bold">Welcome back, {auth?.username}!</h2>

					{/* Statistics Section */}
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
						{stats.map((stat, index) => (
							<div key={index} className="bg-white p-6 rounded-lg shadow-sm">
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-sm font-medium text-gray-500">
										{stat.title}
									</h3>
									<stat.icon className="h-5 w-5 text-gray-400" />
								</div>
								<div className="text-2xl font-bold">{stat.value}</div>
								<p className="text-xs text-gray-500">{stat.change}</p>
							</div>
						))}
					</div>

					{/* Recent Activities and Recently Added Users */}
					<div className="grid gap-6 md:grid-cols-2">
						{/* Recent Activities */}
						<div className="bg-white p-6 rounded-lg shadow-sm">
							<h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
							<ul className="space-y-4">
								{recentActivities.map((activity, index) => (
									<li key={index} className="flex items-center">
										<div className="w-2 h-2 bg-blue-500 rounded-full mr-2" />
										{activity}
									</li>
								))}
							</ul>
						</div>

						{/* Recently Added Users */}
						<div className="bg-white p-6 rounded-lg shadow-sm">
							<h3 className="text-lg font-semibold mb-4">
								Recently Added Users
							</h3>
							<ul className="space-y-4">
								{users.slice(0, 4).map((user, index) => (
									<li key={index} className="flex items-center space-x-3">
										<div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
											<span className="text-xl font-semibold">
												{user.firstName.charAt(0)}
											</span>
										</div>
										<div>
											<p className="font-medium">
												{user.firstName} {user.lastName}
											</p>
											<p className="text-sm text-gray-500">{user.email}</p>
										</div>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Quick Action Buttons */}
					<div className="flex justify-center space-x-4">
						<Link
							to="/add-user"
							className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
						>
							<UserPlusIcon className="mr-2 h-4 w-4" />
							Add New User
						</Link>
						<Link
							to="/users"
							className="flex items-center px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
						>
							<UsersIcon className="mr-2 h-4 w-4" />
							View All Users
						</Link>
					</div>
				</div>
			</main>
		</div>
	);
}
