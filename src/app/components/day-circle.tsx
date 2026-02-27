import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface DayCircleProps {
  dayNumber: number;
  completed: boolean;
  title?: string;
  summary?: string;
  isAvailable: boolean;
  onClick: () => void;
}

export function DayCircle({
  dayNumber,
  completed,
  title,
  summary,
  isAvailable,
  onClick,
}: DayCircleProps) {
  const circleContent = (
    <button
      onClick={onClick}
      disabled={!isAvailable}
      className={`
        w-14 h-14 rounded-full flex items-center justify-center
        font-semibold text-sm transition-all duration-300
        ${
          completed
            ? "bg-yellow-400 text-black hover:bg-yellow-300 hover:scale-110 active:scale-95"
            : isAvailable
            ? "bg-zinc-800 text-zinc-500 hover:bg-zinc-700 hover:scale-110 active:scale-95"
            : "bg-zinc-900 text-zinc-700 cursor-not-allowed opacity-40"
        }
      `}
    >
      {dayNumber}
    </button>
  );

  if (completed && title) {
    return (
      <TooltipProvider delayDuration={200}>
        <Tooltip>
          <TooltipTrigger asChild>{circleContent}</TooltipTrigger>
          <TooltipContent className="bg-zinc-900 border-yellow-400/20 max-w-xs">
            <div className="space-y-1">
              <p className="font-semibold text-yellow-400">{title}</p>
              {summary && (
                <p className="text-sm text-zinc-300">{summary}</p>
              )}
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return circleContent;
}