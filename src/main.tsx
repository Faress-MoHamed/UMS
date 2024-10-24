import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { ModalProvider } from "./context/ModalContext.tsx";
import Modal from "./components/Modal.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { EditUserProvider } from "./context/EditUserContext.tsx";
import { AuthProvider } from "./context/AuthProvider.tsx";
const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
	<AuthProvider>
		<QueryClientProvider client={queryClient}>
			<EditUserProvider>
				<ModalProvider>
					<Toaster position="top-right" />
					<App />
					<Modal />
				</ModalProvider>
			</EditUserProvider>
		</QueryClientProvider>
	</AuthProvider>
);
