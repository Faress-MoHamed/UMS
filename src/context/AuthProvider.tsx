import { createContext, useState, useContext, ReactNode } from "react";

// Define the type for the auth state and the setAuth function
interface AuthContextType {
	auth: AuthState | null;
	setAuth: (auth: AuthState | null) => void;
}

// Define the type for the authentication data (you can adjust this to your actual auth structure)
interface AuthState {
	userId: string;
	token: string;
	roles: string[];
}

// Create the AuthContext with a default value of null
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Custom hook for consuming the auth context
export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};

// AuthProvider component to wrap your app and provide the auth state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [auth, setAuth] = useState<AuthState | null>(null);

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
