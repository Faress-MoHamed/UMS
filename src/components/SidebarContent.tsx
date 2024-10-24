import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Import useLocation to detect active path
import logo from "../assets/9c5672219055d43b0ffb2caf907f4b0d.jpeg";
import usersIcon from "../assets/usersIcon.svg";
import AddUserIcon from "../assets/AddUserIcon.svg";
import ProfileIcon from "../assets/ProfileIcon.svg";
import LogoutIcon from "../assets/LogoutIcon.svg";
import { IoHomeOutline } from "react-icons/io5";
import "./active.css"; // Custom CSS for active styles
import { GoSidebarCollapse } from "react-icons/go";

export default function SidebarContent() {
	const [collapsed, setCollapsed] = useState(false);
	const location = useLocation(); // Get the current location
	const navigate = useNavigate();
	const handleCollapse = () => {
		setCollapsed(!collapsed);
	};

	return (
		<Sidebar
			collapsed={collapsed}
			backgroundColor="#F2EAE1"
			className={`h-screen fixed md:block hidden top-0 left-0 bg-[#F2EAE1] font-Montserrat transition-all duration-300 ${
				collapsed ? "w-[80px] p-1" : "w-[250px] p-3"
			}`}
		>
			<button
				onClick={handleCollapse}
				className="text-gray-700 hover:text-[#FEAF00] transition-colors duration-300"
			>
				<GoSidebarCollapse className="text-lg" />
			</button>
			<div className="flex items-center justify-between mb-4">
				{/* <Header
					className={`${collapsed ? "text-[10px]" : "text-[12px]"} font-[400]`}
					styling={{}}
				>
					UMS
				</Header> */}
				<div className="border-l-[6px] border-[#F8D442]">
					<p
						className={`px-3 leading-[29.26px] font-[700] font-Montserrat ${
							collapsed ? "text-[10px]" : "text-[12px]"
						} font-[400]`}
					>
						UMS
					</p>
				</div>
			</div>

			<div
				className={`${
					collapsed ? "p-0" : "p-4"
				} mt-8 transition-all duration-300`}
			>
				<div className="flex flex-col items-center mb-6">
					<img
						src={logo}
						alt="Profile"
						className={`transition-all duration-300 ${
							collapsed ? "w-10 h-10" : "w-[128px] h-[128px]"
						}  rounded-full mb-2 `}
					/>
					{!collapsed && (
						<>
							<h2 className="text-lg font-semibold">Karthi Madesh</h2>
							<p className="text-sm text-[#FEAF00]">Admin</p>
						</>
					)}
				</div>

				<Menu className="text-center space-y-2">
					<MenuItem
						active={location.pathname === "/"} // Set active based on current path
						icon={<IoHomeOutline />}
						className={`${
							location.pathname === "/" ? "bg-[#FEAF00]" : "text-gray-700"
						} transition-colors duration-300 rounded-[4px] flex items-center justify-center w-full`}
						component={<Link to="/" className="w-full !p-0" />}
					>
						{!collapsed && "Home"}
					</MenuItem>

					<MenuItem
						active={location.pathname.includes("/users")}
						icon={<img src={usersIcon} alt="users" />}
						className={`${
							location.pathname.includes("/users")
								? "bg-[#FEAF00]"
								: "text-gray-700"
						} transition-colors duration-300 rounded-[4px] flex items-center justify-center`}
						component={<Link to="/users" className="w-full !p-0" />}
					>
						{!collapsed && "Users"}
					</MenuItem>

					<MenuItem
						active={location.pathname.includes("/add-user")}
						icon={<img src={AddUserIcon} alt="Add user" />}
						className={`${
							location.pathname.includes("/add-user")
								? "bg-[#FEAF00]"
								: "text-gray-700"
						} transition-colors duration-300 rounded-[4px] flex items-center justify-center`}
						component={<Link to="/add-user" className="w-full !p-0" />}
					>
						{!collapsed && "Add User"}
					</MenuItem>

					<MenuItem
						active={location.pathname.includes("/profile")}
						icon={<img src={ProfileIcon} alt="profile" />}
						className={`${
							location.pathname.includes("/profile")
								? "bg-[#FEAF00]"
								: "text-gray-700"
						} transition-colors duration-300 rounded-[4px] flex items-center justify-center`}
						component={<Link to="/profile" className="w-full !p-0" />}
					>
						{!collapsed && "Profile"}
					</MenuItem>
				</Menu>
			</div>

			<div className="absolute bottom-0 left-0 right-0 p-0">
				<Menu>
					<MenuItem
						icon={<img src={LogoutIcon} alt="logout" />}
						className={`text-gray-700 transition-colors duration-300 rounded-[4px] flex items-center justify-center`}
						component={<button className="w-full !p-0" />}
						onClick={() => {
							localStorage.clear();
							navigate("/login");
						}}
					>
						{!collapsed && "Logout"}
					</MenuItem>
				</Menu>
			</div>
		</Sidebar>
	);
}
