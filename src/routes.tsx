import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "./components/protect-route";
import { Home } from "./pages/home";
import { Register } from "./pages/register";
import { SignIn } from "./pages/sign-in";

export const router = createBrowserRouter([
	{
		element: <ProtectedRoute />,
		children: [
			{
				path: "/app",
				element: <Home />,
			},
		],
	},
	{
		path: "/sign-in",
		element: <SignIn />,
	},
	{
		path: "/register",
		element: <Register />,
	},
]);
