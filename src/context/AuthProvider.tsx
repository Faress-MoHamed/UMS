import { createContext, useState, useContext } from "react";

const AuthContext = createContext({});
export const useAuth = () => {
	return useContext(AuthContext);
};
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [auth, setAuth] = useState<unknown>(null);
	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export default AuthContext;
