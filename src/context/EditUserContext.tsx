import { createContext, useContext, useState } from "react";

interface UserForm {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	age: string | number;
	phone: string;
	birthDate: string;
}

// Define the context type
interface EditUserContextType {
	User: UserForm | null; // Updated to allow null
	setUser: React.Dispatch<React.SetStateAction<UserForm | null>>; // Updated to allow null
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
	const [User, setUser] = useState<UserForm | null>(null);

	return (
		<EditUserContext.Provider value={{ User, setUser }}>
			{children}
		</EditUserContext.Provider>
	);
};
