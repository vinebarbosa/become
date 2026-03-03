import { Progress } from "../components/ui/progress";
import { UserSection } from "../components/user-section";

export function Home() {
	return (
		<div className="container mx-auto p-8">
			<h1 className="text-center text-4xl font-semibold tracking-tight sm:mb-12 sm:text-6xl m-0">
				Estudar 1h por dia durante 30 dias
			</h1>

			<div className="max-w-3xl mx-auto">
				<div className="flex justify-between">
          <h3 className="text-xl mb-2">Progresso do desafio</h3>
          <span>50%</span>
        </div>
				<Progress value={50} className="mb-8" />
			</div>

			<div className="flex flex-wrap gap-8 justify-center">
				<UserSection title="Vine" />
				<UserSection title="Neto" />
			</div>
		</div>
	);
}
