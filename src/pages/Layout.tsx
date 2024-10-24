import { Outlet } from "react-router-dom";
import SidebarContent from "../components/SidebarContent";
import SearchBar from "../components/SearchBar";
import { useState } from "react";
import NavBar from "../components/NavBar";

export default function Layout() {
	const [open, setOpen] = useState(false);
	return (
		<div className="flex">
			<SidebarContent />
			<NavBar open={open} setOpen={setOpen} />
			<div className="flex flex-col w-full">
				<SearchBar setOpen={setOpen} />
				<div className="bg-[#F8F8F8] w-full h-full font-Montserrat">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
