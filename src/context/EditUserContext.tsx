import { createContext, useState, useContext } from "react";

// Create the context
const EditUserContext = createContext(null);

// Custom hook to use the EditUserContext
export const useEditUser = () => {
	return useContext(EditUserContext);
};

export const EditUserProvider = ({ children }) => {
	const [User, setUser] = useState(false);

	// Function to open the modal with specific content

	return (
		<EditUserContext.Provider value={{ User, setUser }}>
			{children}
		</EditUserContext.Provider>
	);
};
