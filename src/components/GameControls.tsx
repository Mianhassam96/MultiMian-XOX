
import { Button } from "@/components/ui/button";
import { Difficulty, GameMode } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";
import { RotateCcw, RefreshCw, UserCircle2, Bot } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface GameControlsProps {
  onResetGame: () => void;
  onResetStats: () => void;
  gameMode: GameMode;
  onGameModeChange: (mode: GameMode) => void;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
}

const GameControls = ({
  onResetGame,
  onResetStats,
  gameMode,
  onGameModeChange,
  difficulty,
  onDifficultyChange,
}: GameControlsProps) => {
  return (
    <motion.div
      className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="flex flex-col gap-2">
        <div className="font-medium text-sm text-muted-foreground">Game Mode</div>
        <div className="flex gap-2">
          <Button
            variant={gameMode === "player-vs-player" ? "default" : "outline"}
            size="sm"
            onClick={() => onGameModeChange("player-vs-player")}
            className="flex items-center gap-2 flex-1"
          >
            <UserCircle2 size={16} />
            <span>vs Player</span>
          </Button>
          <Button
            variant={gameMode === "player-vs-ai" ? "default" : "outline"}
            size="sm"
            onClick={() => onGameModeChange("player-vs-ai")}
            className="flex items-center gap-2 flex-1"
          >
            <Bot size={16} />
            <span>vs AI</span>
          </Button>
        </div>
        
        {gameMode === "player-vs-ai" && (
          <div className="mt-2">
            <div className="font-medium text-sm text-muted-foreground mb-2">
              Difficulty
            </div>
            <Select
              value={difficulty}
              onValueChange={(value) => onDifficultyChange(value as Difficulty)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="easy">Easy</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="hard">Hard</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <div className="font-medium text-sm text-muted-foreground">Actions</div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onResetGame}
            className="flex items-center gap-2 flex-1"
          >
            <RotateCcw size={16} />
            <span>New Game</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onResetStats}
            className="flex items-center gap-2 flex-1"
          >
            <RefreshCw size={16} />
            <span>Reset Stats</span>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default GameControls;
