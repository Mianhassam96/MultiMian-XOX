
import { Player } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";
import { X, Circle, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

interface PlayerInfoProps {
  player: Player;
  name: string;
  isActive: boolean;
  score: number;
  isWinner: boolean;
  onNameChange: (player: Player, name: string) => void;
}

const PlayerInfo = ({ 
  player, 
  name, 
  isActive, 
  score, 
  isWinner,
  onNameChange
}: PlayerInfoProps) => {
  return (
    <motion.div
      className={cn(
        "player-card w-full",
        isActive && "active",
        isWinner && "ring-2 ring-game-win"
      )}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: player === 'X' ? 0.1 : 0.2 }}
    >
      <div className="flex items-center mb-2">
        {player === 'X' ? (
          <X size={24} className="text-game-x mr-2" />
        ) : (
          <Circle size={24} className="text-game-o mr-2" />
        )}
        <input
          type="text"
          value={name}
          onChange={(e) => onNameChange(player, e.target.value)}
          className="bg-transparent border-b border-border focus:border-primary outline-none text-center font-medium"
          maxLength={15}
        />
      </div>
      
      <div className="flex items-center justify-center mt-1">
        <div className="text-lg font-bold">{score}</div>
        {isWinner && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            <Trophy size={20} className="ml-2 text-game-win" />
          </motion.div>
        )}
      </div>
      
      {isActive && (
        <motion.div 
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
          layoutId="activePlayerIndicator"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </motion.div>
  );
};

export default PlayerInfo;
