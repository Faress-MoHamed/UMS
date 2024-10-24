import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider"; // Adjust the import as necessary
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const location = useLocation();
	const { auth, setAuth } = useAuth();
	console.log(auth);
	

	// Safely retrieve auth data from localStorage and parse it
	useEffect(() => {
		const storedAuth = localStorage?.getItem("user");
		if (storedAuth) {
			try {
				const parsedAuth = JSON.parse(storedAuth);
				setAuth(parsedAuth); // Set the auth state with the parsed value
			} catch (error) {
				console.error("Error parsing auth from localStorage:", error);
				setAuth(null); // Reset auth in case of an error
			}
		} else {
			setAuth(null); // Ensure auth is null if nothing is found
		}
	}, [setAuth]);

	// Logging changes to the auth state for debugging purposes
	useEffect(() => {
		console.log("Auth state updated:", auth);
	}, [auth]);

	// Redirect authenticated users trying to access the login page
	if (auth && location.pathname === "/login") {
		return <Navigate to="/" replace />;
	}

	// Redirect unauthenticated users trying to access protected routes
	if (!auth && location.pathname !== "/login") {
		return <Navigate to="/login" replace />;
	}

	// Render children if authenticated, or when on the login page
	return <>{children}</>;
}
