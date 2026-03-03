import { CheckIn } from "./check-in";

export function UserSection({ title }: { title: string }) {
	return (
		<div className="space-y-4">
			<h2 className="text-3xl font-medium">{title}</h2>
			<div className="grid grid-cols-7 md:grid-cols-10 gap-2">
				{[...Array(30)].map((_, i) => (
					<CheckIn key={i} isAvailable={i<25} checked={i<22}  disabled={i>=25} />
				))}
			</div>
		</div>
	);
}
