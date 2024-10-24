import React, { useEffect } from "react";
import { useAuth } from "../context/AuthProvider"; // Adjust import as necessary
import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const location = useLocation();
	const { auth, setAuth } = useAuth();
	const storedAuth = localStorage?.getItem("user");
	const parsedAuth = JSON.parse(storedAuth);

  console.log(!parsedAuth);

	useEffect(() => {
		if (storedAuth) {
			try {
				setAuth(parsedAuth); // This should correctly set the auth
				// console.log("Parsed Auth:", parsedAuth);
			} catch (error) {
				console.error("Error parsing auth from localStorage:", error);
			}
		}
	}, []);

	useEffect(() => {
		console.log("Auth state updated:", auth);
	}, [auth]);

	// Redirect logic for logged-in users trying to access the login page
	if (!!parsedAuth && location.pathname === "/login") {
		return <Navigate to="/" replace />;
	}

	// // Redirect logic for unauthenticated users trying to access protected routes
	// if (!parsedAuth) {
	// 	return <Navigate to="/login" replace />;
	// }

	return (
		<>
			{!parsedAuth && location.pathname !== "/login" ? (
				<Navigate to="/login" replace />
			) : (
				children
			)}
		</>
	); // Render children if authenticated
}
