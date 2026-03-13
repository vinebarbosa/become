import { useMutation } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { CreateChallengeDto } from "../types";

export function useCreateChallenge() {
	async function createChallenge(dto: CreateChallengeDto) {
		await api.post("/challenge", dto);
	}

	const { mutate } = useMutation({
		mutationKey: ["create-challenge"],
		mutationFn: createChallenge,
	});

	return mutate;

}
