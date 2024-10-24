import { createContext, useState, useContext, ReactNode } from "react";




// Define the type for the modal context
interface ModalContextType {
	isOpen: boolean;
	modalContent: ReactNode | null;
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
}

// Create the context with a default value of null for its type
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Custom hook to use the ModalContext, with an added check for context existence
export const useModal = (): ModalContextType => {
	const context = useContext(ModalContext);
	if (!context) {
		throw new Error("useModal must be used within a ModalProvider");
	}
	return context;
};

// Define props type for ModalProvider
interface ModalProviderProps {
	children: ReactNode;
}

// ModalProvider component
export const ModalProvider = ({ children }: ModalProviderProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [modalContent, setModalContent] = useState<ReactNode | null>(null);

	// Function to open the modal with specific content
	const openModal = (content: ReactNode) => {
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
			{children}
		</ModalContext.Provider>
	);
};
