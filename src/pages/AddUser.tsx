import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { AddNewUser, EditUser } from "../Api/EndPoints";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useEditUser } from "../context/EditUserContext";
import { format } from "date-fns";
import { useEffect } from "react";

// Define User Type
interface UserType {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: number;
	phone: string;
	birthDate: string;
}
interface UserForm {
	firstName: string;
	lastName: string;
	email: string;
	age: string | number;
	phoneNumber: string;
	birthDate: string;
}

// Validation schema
const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	age: Yup.number()
		.positive("Age must be positive")
		.integer("Age must be an integer")
		.required("Age is required"),
	phoneNumber: Yup.string().required("Phone Number is required"),
	birthDate: Yup.date().required("Birth Date is required"),
});

export default function AddUser() {
	const navigate = useNavigate();
	const { User, setUser } = useEditUser() as { User: UserType | null };
	console.log(User?.firstName);
	const initialValues = {
		firstName: User?.firstName || "",
		lastName: User?.lastName || "",
		email: User?.email || "",
		age: User?.age || "",
		phoneNumber: User?.phone || "",
		birthDate: User?.birthDate
			? format(new Date(User.birthDate), "yyyy-MM-dd")
			: "",
	};

	const { mutate: AddUserFunction, isPending: AddUserPending } = useMutation({
		mutationKey: ["addUser"],
		mutationFn: async (data: UserType) => await AddNewUser(data),
		onSuccess: () => {
			toast.success("User added successfully");
			navigate("/users");
		},
		onError: () => toast.error("Error adding user"),
	});

	const { mutate: EditUserFunction, isPending: EditUserPending } = useMutation({
		mutationKey: ["editUser"],
		mutationFn: async (data: UserType) => await EditUser(data, User?.id),
		onSuccess: () => {
			toast.success("User edited successfully");
			navigate("/users");
		},
		onError: () => toast.error("Error editing user"),
	});

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values: UserForm) => {
			if (User) {
				await EditUserFunction(values);
			} else {
				await AddUserFunction(values);
			}
		},
	});

	useEffect(() => {
		return setUser({});
	}, [setUser]);

	return (
		<div className="py-4 px-6">
			<h3 className="text-[22px] font-bold">
				{!User?.firstName ? "Add" : "Edit"} User
			</h3>
			<div className="w-full my-4 border-b"></div>

			<div className="bg-white p-8 rounded-lg shadow-md w-[80%] mx-auto">
				<form onSubmit={formik.handleSubmit}>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						{/* First Name */}
						<div>
							<label
								htmlFor="firstName"
								className="block text-sm font-medium text-gray-600 mb-1"
							>
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={formik.values.firstName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Enter your First Name"
								className="w-full px-3 h-[44px] bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							/>
							{formik.touched.firstName && formik.errors.firstName && (
								<p className="text-red-500">{formik.errors.firstName}</p>
							)}
						</div>

						{/* Last Name */}
						<div>
							<label
								htmlFor="lastName"
								className="block text-sm font-medium text-gray-600 mb-1"
							>
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={formik.values.lastName}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Enter your Last Name"
								className="w-full px-3 h-[44px] bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							/>
							{formik.touched.lastName && formik.errors.lastName && (
								<p className="text-red-500">{formik.errors.lastName}</p>
							)}
						</div>

						{/* Email */}
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-600 mb-1"
							>
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Enter your Email"
								className="w-full px-3 h-[44px] bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							/>
							{formik.touched.email && formik.errors.email && (
								<p className="text-red-500">{formik.errors.email}</p>
							)}
						</div>

						{/* Age */}
						<div>
							<label
								htmlFor="age"
								className="block text-sm font-medium text-gray-600 mb-1"
							>
								Age
							</label>
							<input
								type="number"
								id="age"
								name="age"
								value={formik.values.age}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Enter your Age"
								className="w-full px-3 h-[44px] bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							/>
							{formik.touched.age && formik.errors.age && (
								<p className="text-red-500">{formik.errors.age}</p>
							)}
						</div>

						{/* Phone Number */}
						<div>
							<label
								htmlFor="phoneNumber"
								className="block text-sm font-medium text-gray-600 mb-1"
							>
								Phone Number
							</label>
							<input
								type="text"
								id="phoneNumber"
								name="phoneNumber"
								value={formik.values.phoneNumber}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Enter your Phone Number"
								className="w-full px-3 h-[44px] bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							/>
							{formik.touched.phoneNumber && formik.errors.phoneNumber && (
								<p className="text-red-500">{formik.errors.phoneNumber}</p>
							)}
						</div>

						{/* Birth Date */}
						<div>
							<label
								htmlFor="birthDate"
								className="block text-sm font-medium text-gray-600 mb-1"
							>
								Birth Date
							</label>
							<input
								type="date"
								id="birthDate"
								name="birthDate"
								value={formik.values.birthDate}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								className="w-full px-3 h-[44px] bg-gray-100 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
							/>
							{formik.touched.birthDate && formik.errors.birthDate && (
								<p className="text-red-500">{formik.errors.birthDate}</p>
							)}
						</div>
					</div>

					{/* Submit Button */}
					<div className="mt-10 text-center ">
						<button
							type="submit"
							disabled={AddUserPending || EditUserPending}
							className="w-full md:w-[200px] bg-yellow-500 text-white h-[44px] px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transition duration-200"
						>
							{User ? "Edit" : "Save"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
