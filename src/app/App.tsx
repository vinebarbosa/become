import { useState, useEffect } from "react";
import { CheckInModal } from "./components/check-in-modal";
import { UserSection } from "./components/user-section";
import { Progress } from "./components/ui/progress";

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

export default function App() {
  const [users, setUsers] = useState<Record<string, UserData>>({
    vini: {
      name: "Vini",
      startDate: new Date(),
      days: Array.from({ length: 30 }, () => ({ completed: false })),
    },
    neto: {
      name: "Neto",
      startDate: new Date(),
      days: Array.from({ length: 30 }, () => ({ completed: false })),
    },
  });
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [challengeDaysPassed, setChallengeDaysPassed] = useState(0);

  // Calcular dias passados do desafio geral
  useEffect(() => {
    const calculateDaysPassed = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Usar a data de início do primeiro usuário como referência do desafio
      const start = new Date(users.vini.startDate);
      start.setHours(0, 0, 0, 0);
      
      const diffTime = today.getTime() - start.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      
      // No mínimo 1 dia disponível (o primeiro dia do desafio)
      return Math.min(Math.max(diffDays + 1, 1), 30);
    };

    setChallengeDaysPassed(calculateDaysPassed());

    // Atualizar a cada minuto para verificar mudança de dia
    const interval = setInterval(() => {
      setChallengeDaysPassed(calculateDaysPassed());
    }, 60000);

    return () => clearInterval(interval);
  }, [users.vini.startDate]);

  const challengeProgress = (challengeDaysPassed / 30) * 100;

  const handleDayClick = (userId: string, dayIndex: number) => {
    setSelectedUser(userId);
    setSelectedDay(dayIndex);
    setShowCongrats(false);
  };

  const handleCheckIn = (title: string, summary: string) => {
    if (selectedDay !== null && selectedUser !== null) {
      setUsers(prev => {
        const newUsers = { ...prev };
        const newDays = [...newUsers[selectedUser].days];
        const wasCompleted = newDays[selectedDay].completed;
        
        newDays[selectedDay] = {
          completed: true,
          title,
          summary,
        };
        
        newUsers[selectedUser] = {
          ...newUsers[selectedUser],
          days: newDays,
        };
        
        return newUsers;
      });
      
      if (selectedUser && !users[selectedUser].days[selectedDay].completed) {
        setShowCongrats(true);
      }
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setSelectedDay(null);
    setShowCongrats(false);
  };

  return (
    <div className="min-h-screen bg-black px-4 py-6 sm:px-8 sm:py-12">
      <div className="w-full max-w-6xl mx-auto">
        {/* Título do Desafio */}
        <h1 className="mb-8 text-center text-4xl font-bold tracking-tight text-yellow-400 sm:mb-12 sm:text-6xl">
          Become
        </h1>

        {/* Barra de Progresso do Desafio */}
        <div className="mx-auto mb-10 w-full max-w-2xl sm:mb-16">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-yellow-400 sm:text-base">Progresso do Desafio</span>
            <span className="text-sm font-medium text-yellow-400 sm:text-base">
              {challengeDaysPassed}/30 dias
            </span>
          </div>
          <Progress value={challengeProgress} className="h-3" />
          <div className="text-center mt-2">
            <span className="text-yellow-400/70 text-sm">
              {Math.round(challengeProgress)}%
            </span>
          </div>
        </div>

        {/* Sessões dos Usuários */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <UserSection
            user={users.vini}
            userId="vini"
            onDayClick={handleDayClick}
          />
          
          <UserSection
            user={users.neto}
            userId="neto"
            onDayClick={handleDayClick}
          />
        </div>

        {/* Modal de Check-in */}
        {selectedUser && selectedDay !== null && (
          <CheckInModal
            open={true}
            onClose={handleCloseModal}
            onCheckIn={handleCheckIn}
            dayNumber={selectedDay + 1}
            showCongrats={showCongrats}
            currentTitle={users[selectedUser].days[selectedDay].title}
            currentSummary={users[selectedUser].days[selectedDay].summary}
          />
        )}
      </div>
    </div>
  );
}