import { useFormik } from "formik";
import Header from "../components/Header";
import InputField from "../components/InputField";
import * as Yup from "yup";
import { FormSignIn } from "../Api/EndPoints";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { useMutation } from "@tanstack/react-query";

export default function Sign() {
	const navigate = useNavigate();
	const { setAuth } = useAuth();

	const { mutate, isPending } = useMutation({
		mutationKey: ["signin"],
		mutationFn: async (data) => {
			const res = await FormSignIn(data);
			return res;
		},
		onSuccess: (res) => {
			setAuth(res.data);
			localStorage.setItem("user", JSON.stringify(res.data));
			navigate("/");
			toast.success("Sign in successful");
		},
	});

	const formik = useFormik({
		initialValues: {
			username: "emilys",
			password: "emilyspass",
		},
		validationSchema: Yup.object().shape({
			username: Yup.string().required("username is required"),
			password: Yup.string()
				.min(8, "the min password length 8 characters")
				.required("Password is required"),
		}),
		onSubmit: async (values) => {
			mutate(values);
		},
	});
	return (
		<div className="shadow-cardShadow md:p-[40px] p-5 bg-white rounded-[20px] flex flex-col md:gap-8 gap-4 font-Montserrat md:w-[475px] w-[80%] ">
			<Header>User Management System</Header>
			<div className="content-headers text-center my-6">
				<h1 className="md:text-[22px] text-[14px] leading-[26.82px] font-[600] uppercase">
					Sign In
				</h1>
				<p className="md:text-[14px] text-[11px] leading-[17.07px] font-[400] text-[#6C6C6C] mt-[10px]">
					Enter your credentials to access your account
				</p>
			</div>
			<form
				onSubmit={formik.handleSubmit}
				className="text-center flex flex-col md:gap-7 gap-4"
				action=""
			>
				<div className="flex flex-col gap-3 items-start">
					<InputField
						handleChange={formik.handleChange}
						id={"username"}
						label={"username"}
						type={"text"}
						value={formik.values.username}
						name={"username"}
						placeHolder={"Enter your username"}
					/>
					{formik.errors.username && formik.touched.username && (
						<p>{formik.errors.username}</p>
					)}
				</div>
				<div className="flex flex-col items-start gap-3">
					<InputField
						handleChange={formik.handleChange}
						id={"password"}
						label={"Password"}
						value={formik.values.password}
						type={"text"}
						name={"password"}
						placeHolder={"Enter your password"}
					/>
					{formik.errors.password && formik.touched.password && (
						<p>{formik.errors.password}</p>
					)}
				</div>
				<button
					disabled={isPending}
					type="submit"
					className={`w-full rounded-[4px] ${
						isPending ? "bg-gray-500" : "bg-[#FEAF00]"
					} md:h-[44px] h-[30px] text-white md:text-[14px] text-[12px] leading-[17.07px] font-[500] uppercase`}
				>
					{isPending ? "Loading" : "sign in"}
				</button>
			</form>
		</div>
	);
}
// box-shadow: 2px 5px 10px 0px #0000001A;
