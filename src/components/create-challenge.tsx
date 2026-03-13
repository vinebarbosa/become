import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { useCreateChallenge } from "@/resources/challenge/mutations/use-create-challenge";
import { Button } from "./ui/button";
import {
	Carousel,
	type CarouselApi,
	CarouselContent,
	CarouselItem,
} from "./ui/carousel";
import { Field, FieldError } from "./ui/field";

const schema = z.object({
	title: z.string().min(1, "Campo obrigatório"),
	duration: z.number({ message: "Campo obrigatório" }).min(1, "Mínimo 1 dia"),
	startDate: z.string().min(1, "Campo obrigatório"),
});

type FormData = z.input<typeof schema>;

export function CreateChallenge() {
	const form = useForm<FormData>({
		resolver: zodResolver(schema),
	});

	const [api, setApi] = useState<CarouselApi>();
	const [step, setStep] = useState(0);

	const { duration } = useWatch({ control: form.control });

	const createChallenge = useCreateChallenge();

	useEffect(() => {
		if (!api) return;

		api.on("select", () => {
			setStep(api.selectedScrollSnap());
		});
	}, [api]);

	useEffect(() => {
		if (!api) return;
		api.scrollTo(step);
	}, [api, step]);

	async function handleNext(fields?: (keyof FormData)[]) {
		if (!fields) {
			setStep((prev) => prev + 1);
			return;
		}

		const isValid = await form.trigger(fields);
		if (isValid) {
			setStep((prev) => prev + 1);
		}
	}

	function handlePrevious() {
		setStep((prev) => prev - 1);
	}

	async function handleSubmit(data: FormData) {
		createChallenge(
			{
				title: data.title,
				duration: data.duration,
				start_date: new Date(data.startDate),
			},
			{
				onSuccess() {
					form.reset();
					setStep(0);
					toast.success("Desafio criado com sucesso!");
				},
				onError(error) {
					toast.error(error.message || "Ocorreu um erro ao criar o desafio");
				},
			},
		);
	}

	return (
		<div className="h-screen w-full flex items-center justify-center">
			<Carousel
				setApi={setApi}
				opts={{ watchDrag: false }}
				className="w-full max-w-5xl"
			>
				<CarouselContent>
					<CarouselItem>
						<div className="flex flex-col items-center justify-center gap-10 py-20">
							<div className="flex flex-col items-center gap-6">
								<h1 className="text-5xl tracking-tight text-white font-bold text-center">
									Pronto para um novo desafio?
								</h1>
								<p className="text-xl text-muted-foreground text-center max-w-md">
									Defina um objetivo, escolha a duração e comece sua jornada de
									transformação
								</p>
							</div>

							<Button
								onClick={() => handleNext()}
								size="lg"
								className="text-lg font-bold"
							>
								Simbora!
								<ArrowRight className="stroke-black size-8" />
							</Button>
						</div>
					</CarouselItem>

					<CarouselItem>
						<div className="flex flex-col items-center justify-center gap-10 py-20">
							<Field data-invalid={!!form.formState.errors.duration}>
								<label
									htmlFor="duration"
									className="text-4xl tracking-tight text-white font-medium text-center w-full"
								>
									Primeiro, quantos dias vai durar o desafio?
								</label>
								<input
									{...form.register("duration", { valueAsNumber: true })}
									id="duration"
									aria-invalid={!!form.formState.errors.duration}
									className="focus:ring-0 focus:outline-none focus:ring-offset-0 text-5xl text-primary text-center border-0 rounded-none border-b-2 border-primary bg-transparent max-w-50 mx-auto"
								/>
								<FieldError errors={[form.formState.errors.duration]} />
							</Field>

							<Button
								onClick={() => handleNext(["duration"])}
								size="lg"
								className="text-lg font-bold"
							>
								Próximo
								<ArrowRight className="stroke-black size-8" />
							</Button>
						</div>
					</CarouselItem>

					<CarouselItem>
						<div className="flex flex-col items-center justify-center gap-10 py-20">
							<Field data-invalid={!!form.formState.errors.title}>
								<label
									htmlFor="title"
									className="text-4xl tracking-tight text-white font-medium text-center w-full"
								>
									No que você quer se dedicar durante esses {duration} dias?
								</label>
								<input
									{...form.register("title")}
									id="title"
									aria-invalid={!!form.formState.errors.title}
									className="focus:ring-0 focus:outline-none focus:ring-offset-0 text-5xl text-primary text-center border-0 rounded-none border-b-2 border-primary bg-transparent max-w-[75%] mx-auto"
									placeholder="Ex: Estudar React"
								/>
								<FieldError errors={[form.formState.errors.title]} />
							</Field>

							<div className="flex gap-4">
								<Button
									onClick={handlePrevious}
									size="lg"
									variant="outline"
									className="text-lg font-bold"
								>
									<ArrowLeft className="size-8" />
									Voltar
								</Button>
								<Button
									onClick={() => handleNext(["title"])}
									size="lg"
									className="text-lg font-bold"
								>
									Próximo
									<ArrowRight className="stroke-black size-8" />
								</Button>
							</div>
						</div>
					</CarouselItem>

					<CarouselItem>
						<div className="flex flex-col items-center justify-center gap-10 py-20">
							<Field data-invalid={!!form.formState.errors.startDate}>
								<label
									htmlFor="startDate"
									className="text-4xl tracking-tight text-white font-medium text-center w-full"
								>
									Quando você quer começar o desafio?
								</label>
								<input
									{...form.register("startDate")}
									id="startDate"
									type="date"
									aria-invalid={!!form.formState.errors.startDate}
									className="focus:ring-0 focus:outline-none focus:ring-offset-0 text-3xl text-primary text-center border-0 rounded-none border-b-2 border-primary bg-transparent max-w-50 mx-auto"
								/>
								<FieldError errors={[form.formState.errors.startDate]} />
							</Field>

							<div className="flex gap-4">
								<Button
									onClick={handlePrevious}
									size="lg"
									variant="outline"
									className="text-lg font-bold"
								>
									<ArrowLeft className="size-8" />
									Voltar
								</Button>
								<Button
									onClick={form.handleSubmit(handleSubmit)}
									size="lg"
									className="text-lg font-bold"
								>
									Criar Desafio
								</Button>
							</div>
						</div>
					</CarouselItem>
				</CarouselContent>
			</Carousel>
		</div>
	);
}
