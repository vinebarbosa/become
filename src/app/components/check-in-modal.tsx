import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";

interface CheckInModalProps {
  open: boolean;
  onClose: () => void;
  onCheckIn: (title: string, summary: string) => void;
  dayNumber: number;
  showCongrats: boolean;
  currentTitle?: string;
  currentSummary?: string;
}

export function CheckInModal({
  open,
  onClose,
  onCheckIn,
  dayNumber,
  showCongrats,
  currentTitle,
  currentSummary,
}: CheckInModalProps) {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (open) {
      setTitle(currentTitle || "");
      setSummary(currentSummary || "");
    }
  }, [open, currentTitle, currentSummary]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onCheckIn(title, summary);
    }
  };

  const handleClose = () => {
    setTitle("");
    setSummary("");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 border-yellow-400/20 text-white sm:max-w-md">
        {showCongrats ? (
          <div className="py-8 text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <DialogTitle className="text-3xl text-yellow-400">
              Parabéns!
            </DialogTitle>
            <DialogDescription className="text-zinc-300 text-lg">
              Você completou o dia {dayNumber} do seu desafio!
            </DialogDescription>
            <Button
              onClick={handleClose}
              className="bg-yellow-400 text-black hover:bg-yellow-300 mt-4"
            >
              Continuar
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl text-yellow-400">
                Dia {dayNumber}
              </DialogTitle>
              <DialogDescription className="text-zinc-400">
                Registre o que você conquistou hoje
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="title" className="text-yellow-400">
                  Título
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ex: Completei meu primeiro treino"
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-400"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary" className="text-yellow-400">
                  Resumo (opcional)
                </Label>
                <Textarea
                  id="summary"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Descreva como foi seu dia..."
                  className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-yellow-400 min-h-24 resize-none"
                  rows={4}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  onClick={handleClose}
                  variant="outline"
                  className="flex-1 bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-yellow-400 text-black hover:bg-yellow-300"
                >
                  Confirmar Check-in
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
