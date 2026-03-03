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
import { api } from "@/services/api";

const schema = z.object({
	name: z.string(),
	email: z.email("Digite um e-mail válido"),
	password: z.string("Campo obrigatório"),
});

type RegisterFormValues = z.infer<typeof schema>;

export function Register() {
	const [isSubmiting, setIsSubmiting] = useState(false);

	const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(schema),
	});

	const handleSubmit = form.handleSubmit((data) => {
		register(data);
	});

	async function register(data: RegisterFormValues) {
		setIsSubmiting(true);
		try {
			await api.post("/auth/register", data);
			toast.success("Sua conta foi criada! Redirecionando para login");

			setTimeout(() => {
				navigate("/sign-in");
			}, 3000);
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
					<CardTitle>Crie uma conta</CardTitle>
					<CardDescription>
						Informe os dados abaixo para criar uma conta
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={handleSubmit} id="register-form">
						<FieldGroup>
							<Controller
								name="name"
								control={form.control}
								render={({ field, fieldState }) => (
									<Field data-invalid={fieldState.invalid}>
										<FieldLabel htmlFor="name">Seu nome</FieldLabel>
										<Input
											{...field}
											id="name"
											aria-invalid={fieldState.invalid}
											placeholder="Digite seu nome"
											autoComplete="off"
										/>
										{fieldState.invalid && (
											<FieldError errors={[fieldState.error]} />
										)}
									</Field>
								)}
							/>
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
						form="register-form"
						className="w-full font-bold text-black"
						disabled={isSubmiting}
					>
						Criar conta
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
