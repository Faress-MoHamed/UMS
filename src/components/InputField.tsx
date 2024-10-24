import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	type: string;
	name: string;
	id: string;
	placeHolder: string;
	handleChange: ChangeEventHandler<HTMLInputElement>;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	type,
	name,
	id,
	placeHolder,
	handleChange,
	...inputs
}) => {
	return (
		<div className="flex flex-col justify-center items-start gap-2 w-full">
			<label
				className="md:text-[14px] text-[12px] leading-[17.07px] font-[400] text-[#6C6C6C]"
				htmlFor={id}
			>
				{label}
			</label>
			<input
				className="rounded-[4px] h-[44px] border-[1px] border-[#E5E5E5] w-full px-4 focus:outline-none placeholder:text-[#CDCDCD] md:text-[14px] text-[10px]"
				type={type}
				name={name}
				id={id}
				placeholder={placeHolder}
				onChange={handleChange}
				{...inputs}
			/>
		</div>
	);
};

export default InputField;
