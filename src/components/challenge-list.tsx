import type { Challenge } from "@/resources/challenge/types";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

interface ChallengeListProps {
	data: Challenge[];
}

export function ChallengeList({ data }: ChallengeListProps) {
	return (
		<div className="flex flex-col items-center justify-center py-10 w-screen">
			<h1 className="col-span-full text-2xl font-bold text-center mb-6">Desafios</h1>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				{data.map((challenge) => (
					<Card key={challenge.id} className="border w-full">
						<CardHeader>
							<CardTitle>{challenge.title}</CardTitle>
							<CardDescription>
								Duração: {challenge.duration} dias
							</CardDescription>
						</CardHeader>
						<CardContent className="min-w-50">
							<p>
								Início: {new Date(challenge.start_date).toLocaleDateString()}
							</p>
						</CardContent>
						<CardFooter>
							<CardAction
								href={`/challenge/${challenge.id}`}
								className="text-blue-500 hover:underline"
							>
								Ver detalhes
							</CardAction>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}
