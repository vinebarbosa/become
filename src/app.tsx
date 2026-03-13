import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

import "./index.css";
import { Providers } from "./components/providers";
import { Toaster } from "./components/ui/sonner";

export function App() {
	return (
		<Providers>
			<RouterProvider router={router} />
			<Toaster richColors position="bottom-center" />
		</Providers>
	);
}
