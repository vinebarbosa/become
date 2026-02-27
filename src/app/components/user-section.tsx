import { useState, useEffect } from "react";
import { DayCircle } from "./day-circle";
import { Progress } from "./ui/progress";

interface DayData {
  completed: boolean;
  title?: string;
  summary?: string;
}

interface UserData {
  name: string;
  startDate: Date;
  days: DayData[];
}

interface UserSectionProps {
  user: UserData;
  userId: string;
  onDayClick: (userId: string, dayIndex: number) => void;
}

export function UserSection({ user, userId, onDayClick }: UserSectionProps) {
  const [currentDaysPassed, setCurrentDaysPassed] = useState(0);

  // Calcular dias passados desde o início do desafio
  useEffect(() => {
    const calculateDaysPassed = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const start = new Date(user.startDate);
      start.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - start.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // No mínimo 1 dia disponível (o primeiro dia do desafio)
      return Math.min(Math.max(diffDays + 1, 1), 30);
    };

    setCurrentDaysPassed(calculateDaysPassed());

    // Atualizar a cada minuto para verificar mudança de dia
    const interval = setInterval(() => {
      setCurrentDaysPassed(calculateDaysPassed());
    }, 60000);

    return () => clearInterval(interval);
  }, [user.startDate]);

  const completedDays = user.days.filter((day) => day.completed).length;
  const progress = (currentDaysPassed / 30) * 100;

  return (
    <div className="w-full">
      {/* Nome do Usuário */}
      <h2 className="mb-5 flex flex-col items-start justify-between gap-1 text-left text-xl font-bold text-yellow-400 sm:mb-8 sm:flex-row sm:items-baseline sm:text-3xl">
        <span>{user.name}</span>
        <span className="text-sm font-normal text-yellow-400/70 sm:text-lg">
          {completedDays} check-ins
        </span>
      </h2>

      {/* Grid de Círculos */}
      <div className="grid grid-cols-6 justify-items-center gap-x-1 gap-y-2 px-0 sm:gap-4 sm:px-4">
        {user.days.map((day, index) => {
          const isAvailable = index < currentDaysPassed;
          return (
            <DayCircle
              key={index}
              dayNumber={index + 1}
              completed={day.completed}
              title={day.title}
              summary={day.summary}
              isAvailable={isAvailable}
              onClick={() => onDayClick(userId, index)}
            />
          );
        })}
      </div>
    </div>
  );
}