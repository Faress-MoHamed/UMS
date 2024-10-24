import { createContext, useContext, useState } from "react";

// Define the context type
interface EditUserContextType {
	User: boolean;
	setUser: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default values
const EditUserContext = createContext<EditUserContextType | undefined>(
	undefined
);

// Custom hook to use the EditUserContext
export const useEditUser = (): EditUserContextType => {
	const context = useContext(EditUserContext);
	if (!context) {
		throw new Error("useEditUser must be used within an EditUserProvider");
	}
	return context;
};

// Provider component
export const EditUserProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const [User, setUser] = useState(false);

	return (
		<EditUserContext.Provider value={{ User, setUser }}>
			{children}
		</EditUserContext.Provider>
	);
};
