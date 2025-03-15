
import { GameHistory as GameHistoryType } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";
import { HistoryIcon, X, Circle, Minus } from "lucide-react";
import { format } from "date-fns";

interface GameHistoryProps {
  history: GameHistoryType[];
  xName: string;
  oName: string;
}

const GameHistory = ({ history, xName, oName }: GameHistoryProps) => {
  if (history.length === 0) {
    return null;
  }

  // Get only the last 5 games
  const recentGames = [...history].reverse().slice(0, 5);

  return (
    <motion.div 
      className="mt-4 p-4 rounded-xl bg-card/70 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <HistoryIcon size={18} className="mr-2 text-primary" />
        Recent Games
      </h3>
      
      <div className="space-y-2 max-h-[200px] overflow-auto pr-1">
        {recentGames.map((game, index) => (
          <div 
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-background/50"
          >
            <div className="flex items-center">
              {game.winner === "X" && <X size={16} className="text-game-x mr-2" />}
              {game.winner === "O" && <Circle size={16} className="text-game-o mr-2" />}
              {game.winner === "Draw" && <Minus size={16} className="text-muted-foreground mr-2" />}
              
              <span className="text-sm">
                {game.winner === "X" 
                  ? `${xName} won` 
                  : game.winner === "O" 
                    ? `${oName} won` 
                    : "Draw"}
              </span>
            </div>
            
            <div className="flex items-center text-xs text-muted-foreground">
              <span className="mr-3">{game.moves} moves</span>
              <span>{format(new Date(game.date), "MMM d, h:mm a")}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default GameHistory;
