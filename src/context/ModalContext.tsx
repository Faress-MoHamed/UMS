import { createContext, useState, useContext, type ReactNode } from "react";

// Create the context
const ModalContext = createContext(null);

// Custom hook to use the ModalContext
export const useModal = () => {
	return useContext(ModalContext);
};

export const ModalProvider = (props) => {
	const [isOpen, setIsOpen] = useState(false);
	const [modalContent, setModalContent] = useState(null);

	// Function to open the modal with specific content
	const openModal = (content) => {
		setModalContent(content);
		setIsOpen(true);
	};

	// Function to close the modal
	const closeModal = () => {
		setIsOpen(false);
		setModalContent(null);
	};

	return (
		<ModalContext.Provider
			value={{ isOpen, modalContent, openModal, closeModal }}
		>
			{props.children}
		</ModalContext.Provider>
	);
};
