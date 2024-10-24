import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { getAllUsers, DeleteUser } from "../Api/EndPoints";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useEditUser } from "../context/EditUserContext";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// User type definition
interface User {
	id: number;
	username: string;
	email: string;
	phone: string;
	ssn: string;
	birthDate: string;
	image: string;
}

export default function Users() {
	const { setUser } = useEditUser();
	const [users, setUsers] = useState<User[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const usersPerPage = 10;
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await getAllUsers();
				setUsers(res);
			} catch (err) {
				console.error(err);
				toast.error("Failed to fetch users");
			}
		};
		fetchData();
	}, []);

	const { mutate: deleteUserFunction } = useMutation<
		void,
		unknown,
		number,
		boolean
	>({
		mutationKey: ["deleteUser"],
		mutationFn: async (id: number) => {
			await DeleteUser(id);
		},
		onSuccess: (_, id) => {
			toast.success("User deleted successfully");
			setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
		},
		onError: () => {
			toast.error("Error deleting user");
		},
	});

	// Pagination logic
	const indexOfLastUser = currentPage * usersPerPage;
	const indexOfFirstUser = indexOfLastUser - usersPerPage;
	const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
	const totalPages = Math.ceil(users.length / usersPerPage);

	// Handlers for page navigation
	const handleNextPage = () => {
		if (currentPage < totalPages) setCurrentPage(currentPage + 1);
	};

	const handlePreviousPage = () => {
		if (currentPage > 1) setCurrentPage(currentPage - 1);
	};

	return (
		<div className="container mx-auto p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold">Users List</h1>
				<Link
					to="/add-user"
					className="bg-yellow-400 hover:bg-yellow-500 text-white font-bold py-2 px-4 rounded"
				>
					ADD NEW User
				</Link>
			</div>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white">
					<thead className="bg-gray-100">
						<tr>
							<th className="py-2 px-4 text-left">Name</th>
							<th className="py-2 px-4 text-left">Email</th>
							<th className="py-2 px-4 text-left">Phone</th>
							<th className="py-2 px-4 text-left">SSN</th>
							<th className="py-2 px-4 text-left">Birth Date</th>
							<th className="py-2 px-4 text-left"></th>
						</tr>
					</thead>
					<tbody>
						{currentUsers.map((user) => (
							<UserCard
								key={user.id}
								user={user}
								deleteUser={deleteUserFunction}
								setUser={setUser}
								navigate={navigate}
							/>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination controls */}
			<div className="flex justify-between items-center mt-4">
				<button
					className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50"
					onClick={handlePreviousPage}
					disabled={currentPage === 1}
				>
					Previous
				</button>
				<span className="text-gray-700">
					Page {currentPage} of {totalPages}
				</span>
				<button
					className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded disabled:opacity-50"
					onClick={handleNextPage}
					disabled={currentPage === totalPages}
				>
					Next
				</button>
			</div>
		</div>
	);
}

interface UserForm {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: string | number;
	phone: string;
	birthDate: string;
}
interface UserCardProps {
	user: User;
	setUser: Dispatch<SetStateAction<UserForm | null>>;
	deleteUser: (id: number) => void;
	navigate: (path: string) => void;
}

const UserCard = ({ user, setUser, deleteUser, navigate }: UserCardProps) => {
	return (
		<tr className="border-b hover:bg-gray-50">
			<td className="py-2 px-4">
				<div className="flex items-center">
					<div className="relative w-10 h-10 mr-3">
						<img
							src={user.image}
							alt={user.username}
							className="w-10 h-10 rounded-full"
						/>
					</div>
					{user.username}
				</div>
			</td>
			<td className="py-2 px-4">{user.email}</td>
			<td className="py-2 px-4">{user.phone}</td>
			<td className="py-2 px-4">{user.ssn}</td>
			<td className="py-2 px-4">{user.birthDate}</td>
			<td className="py-2 px-4">
				<div className="flex items-center space-x-6">
					<button
						onClick={() => {
							setUser(user);
							navigate("/add-user");
						}}
						className="text-yellow-500 hover:text-yellow-600"
					>
						<FiEdit2 className="w-5 h-5" />
					</button>
					<button
						onClick={() => deleteUser(user.id)}
						className={`text-red-500 hover:text-red-600 `}
					>
						<FiTrash2 className="w-5 h-5" />
					</button>
				</div>
			</td>
		</tr>
	);
};
