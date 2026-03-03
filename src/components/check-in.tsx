import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";

interface CheckInProps {
	checked?: boolean;
	disabled?: boolean;
  isAvailable?: boolean
}

export function CheckIn({ checked = false, disabled, isAvailable }: CheckInProps) {
	return (
		<Button
      data-checked={checked}
      data-available={isAvailable}
			className="size-10 rounded-full bg-neutral-700 hover:scale-110 active:scale-95 data-[checked='true']:bg-primary"
      disabled={disabled}
		>

    </Button>
	);
}
