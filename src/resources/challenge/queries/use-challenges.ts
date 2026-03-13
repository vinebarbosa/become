import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";
import type { Challenge } from "../types";

export function useChallenges() {
	async function getChallenges() {
		const response = await api.get<Challenge[]>("/challenges");
		return response.data;
	}

	return useQuery({
		queryKey: ["challenges"],
		queryFn: getChallenges,
	});
}
