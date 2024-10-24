import type { CSSProperties } from "react";
import type React from "react";

export default function Header({
	children,
	className,
	styling,
}: {
	children: React.ReactNode;
	className?: string;
	styling?: CSSProperties;
}) {
	return (
		<div className="border-l-[6px] border-[#F8D442]">
			<p
				className={`px-3 md:text-2xl text-[14px] leading-[29.26px] font-[700] font-Montserrat ${
					className && className
				}`}
				style={styling}
			>
				{children}
			</p>
		</div>
	);
}
