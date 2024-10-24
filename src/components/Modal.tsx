import { FiX } from "react-icons/fi";
import { useModal } from "../context/ModalContext";

export default function Modal() {
	const { isOpen, modalContent, closeModal } = useModal();

	// Do not render anything if modal is not open
	if (!isOpen) return null;

	return (
		<div
			role="button"
			onClick={() => closeModal()}
			className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 cursor-default"
		>
			<div className="bg-white rounded-lg w-1/3 p-6 relative min-h-[450px]">
				<button
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
					onClick={closeModal}
				>
					<FiX className="w-6 h-6" />
				</button>
				{/* Render the passed content dynamically */}
				{modalContent}
			</div>
		</div>
	);
}
