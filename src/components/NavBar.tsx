import { motion, useAnimation, AnimatePresence } from "framer-motion";
import { useEffect, type Dispatch, type SetStateAction } from "react";
import { NavLink } from "react-router-dom";
import { IoClose } from "react-icons/io5";

function NavBar({
	open,
	setOpen,
}: {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const navLinks = [
		{
			id: 0,
			name: "Home",
			link: "/",
		},
		{
			id: 1,
			name: "Users",
			link: "/users",
		},
		{
			id: 2,
			name: "AddUsers",
			link: "/add-user",
		},
		{
			id: 3,
			name: "profile",
			link: "/profile",
		},
	];

	const controls = useAnimation();
	useEffect(() => {
		if (open) {
			controls.start({ x: 0, opacity: 1 });
		} else {
			controls.start({ x: -100, opacity: 0 });
		}
	}, [open, controls]);

	function handleClose() {
		setOpen((e: unknown) => !e);
	}

	return (
		<>
			{
				<AnimatePresence>
					{open && (
						<>
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.5 }}
								onClick={handleClose}
								className="left-0 top-0 h-full z-20 fixed inset-0 overflow-hidden bg-black bg-opacity-50 md:hidden block"
							></motion.div>
							<motion.div
								initial={{ x: 100, opacity: 0 }}
								animate={open ? { opacity: 1, x: 0 } : {}}
								exit={{ x: 100, opacity: 0 }}
								transition={{ duration: 0.5 }}
								className={`fixed ${
									open ? "" : "hidden"
								} right-0 top-0 z-[999] w-[55%] lg:top-5`}
							>
								<ul
									className={`flex ${"text-right items-end"} h-screen w-full flex-col items-start justify-start gap-10 bg-white p-3 backdrop-blur-lg md:hidden`}
								>
									<button
										aria-label="clos sidebar"
										className="text-4xl text-black"
										onClick={() => handleClose()}
									>
										<IoClose />
									</button>
									{navLinks.map((item, index) => {
										return (
											<motion.li
												initial={{ opacity: 0, x: 100 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.2 * item.id,
													ease: [0.17, 0.55, 0.55, 1],
												}}
												className={`relative  text-lg before:absolute before:bottom-[-5px] before:left-0 before:h-[3px] before:w-0 before:bg-slate-950 before:transition-all before:duration-300 hover:before:w-full `}
												key={index}
											>
												<NavLink
													to={`${item.link}`}
													onClick={() => {
														handleClose();
													}}
													className="cursor-pointer capitalize"
												>
													{item.name}
												</NavLink>
											</motion.li>
										);
									})}
								</ul>
							</motion.div>
						</>
					)}
				</AnimatePresence>
			}
		</>
	);
}

export default NavBar;
