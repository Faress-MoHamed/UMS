import React from "react";

export default function ChildrenContainer({ children }) {
	return (
		<div className="container md:px-8 px-4 w-full mx-auto md:mt-10 mt-5 h-full">
			{children}
		</div>
	);
}
