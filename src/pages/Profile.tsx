import { useMutation, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { EditUser } from "../Api/EndPoints";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";
import { format } from "date-fns";
import { Hourglass } from "react-loader-spinner";
{
	/**{
    "id": 1,
    "firstName": "Emily",
    "lastName": "Johnson",
    "maidenName": "Smith",
    "age": 28,
    "gender": "female",
    "email": "emily.johnson@x.dummyjson.com",
    "phone": "+81 965-431-3024",
    "username": "emilys",
    "password": "emilyspass",
    "birthDate": "1996-5-30",
    "image": "https://dummyjson.com/icon/emilys/128",
    "bloodGroup": "O-",
    "height": 193.24,
    "weight": 63.16,
    "eyeColor": "Green",
    "hair": {
        "color": "Brown",
        "type": "Curly"
    },
    "ip": "42.48.100.32",
    "address": {
        "address": "626 Main Street",
        "city": "Phoenix",
        "state": "Mississippi",
        "stateCode": "MS",
        "postalCode": "29112",
        "coordinates": {
            "lat": -77.16213,
            "lng": -92.084824
        },
        "country": "United States"
    },
    "macAddress": "47:fa:41:18:ec:eb",
    "university": "University of Wisconsin--Madison",
    "bank": {
        "cardExpire": "03/26",
        "cardNumber": "9289760655481815",
        "cardType": "Elo",
        "currency": "CNY",
        "iban": "YPUXISOBI7TTHPK2BR3HAIXL"
    },
    "company": {
        "department": "Engineering",
        "name": "Dooley, Kozey and Cronin",
        "title": "Sales Manager",
        "address": {
            "address": "263 Tenth Street",
            "city": "San Francisco",
            "state": "Wisconsin",
            "stateCode": "WI",
            "postalCode": "37657",
            "coordinates": {
                "lat": 71.814525,
                "lng": -161.150263
            },
            "country": "United States"
        }
    },
    "ein": "977-175",
    "ssn": "900-590-289",
    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.93 Safari/537.36",
    "crypto": {
        "coin": "Bitcoin",
        "wallet": "0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a",
        "network": "Ethereum (ERC20)"
    },
    "role": "admin"
} */
}
// Define User Type
// Define the type for the authentication data (you can adjust this to your actual auth structure)

interface responseData {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	age: string | number;
	image: string;
	phone: string;
	birthDate: string;
}
const validationSchema = Yup.object().shape({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string().email("Invalid email").required("Email is required"),
	age: Yup.number()
		.positive("Age must be positive")
		.integer("Age must be an integer")
		.required("Age is required"),
	phone: Yup.string().required("Phone Number is required"),
	birthDate: Yup.date().required("Birth Date is required"),
});

export default function Profile() {
	const navigate = useNavigate();
	const { auth } = useAuth();

	const { data, isLoading, isSuccess } = useQuery<
		unknown,
		boolean,
		responseData
	>({
		queryKey: ["me"],
		queryFn: async () => {
			const res = await axios.get("https://dummyjson.com/user/me", {
				headers: {
					Authorization: `Bearer ${auth?.accessToken}`,
				},
			});
			console.log(res.data);
			return res.data;
		},
	});

	// Set default initial values for `initialValues`
	let initialValues: responseData = {
		id: 0,
		firstName: "",
		lastName: "",
		email: "",
		image: "",
		age: "",
		phone: "",
		birthDate: "",
	};

	// Update `initialValues` after data is successfully fetched
	if (isSuccess && data) {
		initialValues = {
			id: data.id,
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			image: data.image,
			age: data.age,
			phone: data.phone,
			birthDate: format(new Date(data.birthDate), "yyyy-MM-dd"),
		};
	}

	const formik = useFormik({
		initialValues,
		validationSchema,
		onSubmit: async (values: responseData) => {
			await EditUserFunction(values);
		},
		enableReinitialize: true, // This line will reinitialize form with fetched data
	});

	const { mutate: EditUserFunction, isPending: EditUserPending } = useMutation<
		unknown,
		boolean,
		responseData
	>({
		mutationKey: ["editUser"],
		mutationFn: async (data: responseData) => await EditUser(data, data?.id),
		onSuccess: () => {
			toast.success("User edited successfully");
			navigate("/users");
		},
		onError: () => toast.error("Error editing user"),
	});

	return isLoading && !data ? (
		<div className="flex justify-center items-center h-screen">
			<Hourglass
				visible={true}
				height="80"
				width="80"
				ariaLabel="hourglass-loading"
				wrapperStyle={{}}
				wrapperClass=""
				colors={["#306cce", "#72a1ed"]}
			/>
		</div>
	) : (
		<div className="py-4 px-6">
			<h3 className="text-[22px] font-bold">hello {data?.firstName}!</h3>
			<div className="w-full my-4 border-b"></div>

			<div className="bg-white p-8 rounded-lg shadow-md w-[80%] mx-auto">
				<div className="w-full h-[50px]  relative">
					<img
						className="absolute transform -top-16 left-2/4 -translate-x-2/4 bg-white rounded-full w-[100px] h-[100px] shadow-2xl"
						src={data?.image}
						alt=""
					/>
				</div>
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
								className={`w-full px-3 h-[44px] bg-gray-100 border ${
									formik.touched.firstName && formik.errors.firstName
										? "border-red-500"
										: "border-gray-300"
								} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500`}
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
								className={`w-full px-3 h-[44px] bg-gray-100 border ${
									formik.touched.lastName && formik.errors.lastName
										? "border-red-500"
										: "border-gray-300"
								} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500`}
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
								className={`w-full px-3 h-[44px] bg-gray-100 border ${
									formik.touched.email && formik.errors.email
										? "border-red-500"
										: "border-gray-300"
								} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500`}
							/>
							{formik.touched.email && formik.errors.email && (
								<p className="text-red-500">{formik.errors.email}</p>
							)}
						</div>
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
								className={`w-full px-3 h-[44px] bg-gray-100 border ${
									formik.touched.age && formik.errors.age
										? "border-red-500"
										: "border-gray-300"
								} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500`}
							/>
							{formik.touched.age && formik.errors.age && (
								<p className="text-red-500">{formik.errors.age}</p>
							)}
						</div>

						{/* Phone Number */}
						<div>
							<label
								htmlFor="phone"
								className="block text-sm font-medium text-gray-600 mb-1"
							>
								Phone Number
							</label>
							<input
								type="text"
								id="phone"
								name="phone"
								value={formik.values.phone}
								onChange={formik.handleChange}
								onBlur={formik.handleBlur}
								placeholder="Enter your Phone Number"
								className={`w-full px-3 h-[44px] bg-gray-100 border ${
									formik.touched.phone && formik.errors.phone
										? "border-red-500"
										: "border-gray-300"
								} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500`}
							/>
							{formik.touched.phone && formik.errors.phone && (
								<p className="text-red-500">{formik.errors.phone}</p>
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
								className={`w-full px-3 h-[44px] bg-gray-100 border ${
									formik.touched.birthDate && formik.errors.birthDate
										? "border-red-500"
										: "border-gray-300"
								} rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500`}
							/>
							{formik.touched.birthDate && formik.errors.birthDate && (
								<p className="text-red-500">{formik.errors.birthDate}</p>
							)}
						</div>
					</div>

					<div className="mt-6">
						<button
							type="submit"
							disabled={EditUserPending}
							className="px-6 py-2 bg-yellow-500 text-white font-bold rounded-md hover:bg-yellow-600 focus:ring-2 focus:ring-yellow-500"
						>
							{"Update User"}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
