import { zodResolver } from "@hookform/resolvers/zod";
import type { AxiosError } from "axios";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth-context";
import { api } from "@/services/api";

const schema = z.object({
	email: z.email("Digite um e-mail válido"),
	password: z.string("Campo obrigatório"),
});

type SignInFormValues = z.infer<typeof schema>;

export function SignIn() {
	const [isSubmiting, setIsSubmiting] = useState(false);

	const { login } = useAuth();

  const navigate = useNavigate()

	const form = useForm({
		resolver: zodResolver(schema),
	});

	const handleSubmit = form.handleSubmit((data) => {
		signIn(data);
	});

	async function signIn(data: SignInFormValues) {
		setIsSubmiting(true);
		try {
			const formData = new FormData();
			formData.append("username", data.email);
			formData.append("password", data.password);

			const response = await api.post("/auth/login", formData);

			const token = response.data.access_token;

			api.defaults.headers.common.Authorization = `Bearer ${token}`;

			const { data: userData } = await api.get("/users/me");

			login(token, userData)

      navigate("/app")
		} catch (error) {
			const errorMessage = (error as AxiosError<{ detail: string }>).response
				?.data.detail;
			toast.error(errorMessage);
		} finally {
			setIsSubmiting(false);
		}
	}

	return (
		<div className="container">
			<Card className="min-w-md">
				<CardHeader>
					<CardTitle>Entre em sua conta</CardTitle>
					<CardDescription>
						Informe os dados abaixo para entrar em sua conta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} id="sign-in-form">
						<FieldGroup>
							<Controller
								name="email"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="email">E-mail</FieldLabel>
										<Input
											{...field}
											id="email"
											aria-invalid={fieldState.invalid}
											placeholder="Digite seu e-mail"
											autoComplete="email"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
							<Controller
								name="password"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="password">Senha</FieldLabel>
										<Input
											{...field}
											id="password"
											aria-invalid={fieldState.invalid}
											placeholder="Digite a senha"
											autoComplete="new-password"
											type="password"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
						</FieldGroup>
					</form>
				</CardContent>
				<CardFooter>
					<Button
						type="submit"
						form="sign-in-form"
						className="w-full font-bold text-black"
						disabled={isSubmiting}
					>
						Entrar
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
