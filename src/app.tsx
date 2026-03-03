import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./contexts/auth-context";

export function App() {
	return (
		<AuthProvider>
			<RouterProvider router={router} />
			<Toaster richColors position="bottom-center" />
		</AuthProvider>
	);
}
