import { BiBell, BiMenu, BiSearch } from "react-icons/bi";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ setOpen }) {
	const navigate = useNavigate();

	return (
		<div className="w-full h-[60px] flex items-center justify-between px-3">
			<button
				onClick={() => {
					navigate(-1);
				}}
			>
				<IoChevronBackCircleOutline className="text-2xl text-[#C4C4C4] hover:text-[#8c8c8c] duration-200" />
			</button>

			<div className="flex items-center gap-4">
				<div className="relative">
					<input
						type="text"
						placeholder="Search..."
						className="w-full py-2 px-4 rounded-[8px] border border-[#C4C4C4] focus:outline-none"
					/>
					<button className="absolute right-3 top-1/2 transform -translate-y-1/2">
						<BiSearch className="h-5 w-5 text-[#C4C4C4]" />
					</button>
				</div>
				<button
					onClick={() => {
						setOpen(true);
					}}
				>
					<BiMenu className="text-2xl text-[#C4C4C4] hover:text-[#8c8c8c] duration-200 md:hidden block" />
				</button>
			</div>
		</div>
	);
}
