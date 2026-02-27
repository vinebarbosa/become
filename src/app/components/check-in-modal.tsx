import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "./ui/drawer";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { useIsMobile } from "./ui/use-mobile";

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
  const isMobile = useIsMobile();

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

  const content = showCongrats ? (
    <div className="space-y-4 py-8 text-center">
      <div className="text-6xl">🎉</div>
      <DialogTitle className="text-3xl text-yellow-400">Parabéns!</DialogTitle>
      <DialogDescription className="text-lg text-zinc-300">
        Você completou o dia {dayNumber} do seu desafio!
      </DialogDescription>
      <Button
        onClick={handleClose}
        className="mt-4 bg-yellow-400 text-black hover:bg-yellow-300"
      >
        Continuar
      </Button>
    </div>
  ) : (
    <>
      {isMobile ? (
        <DrawerHeader className="px-4 pb-0 text-left">
          <DrawerTitle className="text-2xl text-yellow-400">Dia {dayNumber}</DrawerTitle>
          <DrawerDescription className="text-zinc-400">
            Registre o que você conquistou hoje
          </DrawerDescription>
        </DrawerHeader>
      ) : (
        <DialogHeader>
          <DialogTitle className="text-2xl text-yellow-400">Dia {dayNumber}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Registre o que você conquistou hoje
          </DialogDescription>
        </DialogHeader>
      )}
      <form onSubmit={handleSubmit} className="mt-4 space-y-4 px-4 pb-4 sm:px-0 sm:pb-0">
        <div className="space-y-2">
          <Label htmlFor="title" className="text-yellow-400">
            Título
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e: any) => setTitle(e.target.value)}
            placeholder="Ex: Completei meu primeiro treino"
            className="border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-yellow-400"
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
            onChange={(e: any) => setSummary(e.target.value)}
            placeholder="Descreva como foi seu dia..."
            className="min-h-24 resize-none border-zinc-700 bg-zinc-800 text-white placeholder:text-zinc-500 focus:border-yellow-400"
            rows={4}
          />
        </div>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <Button
            type="button"
            onClick={handleClose}
            variant="outline"
            className="flex-1 border-zinc-700 bg-transparent text-zinc-300 hover:bg-zinc-800 hover:text-white"
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
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={handleClose}>
        <DrawerContent className="border-yellow-400/20 bg-zinc-900 text-white">
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[calc(100%-2rem)] border-yellow-400/20 bg-zinc-900 text-white sm:max-w-md">
        {content}
      </DialogContent>
    </Dialog>
  );
}
