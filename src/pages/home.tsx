import { ChallengeList } from "@/components/challenge-list";
import { CreateChallenge } from "@/components/create-challenge";
import { useChallenges } from "@/resources/challenge/queries/use-challenges";

export function Home() {
	const { data, isLoading } = useChallenges();

	if (isLoading) {
		return null
	}

	if (!data || data.length === 0) {
		return <CreateChallenge />;
	}

	return <ChallengeList data={data} />;
}
