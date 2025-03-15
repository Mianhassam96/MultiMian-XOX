
import { GameHistory } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";
import { Trophy, Medal, Timer, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface GameStatsProps {
  history: GameHistory[];
  xWins: number;
  oWins: number;
  draws: number;
  xName: string;
  oName: string;
}

const GameStats = ({ history, xWins, oWins, draws, xName, oName }: GameStatsProps) => {
  // Skip rendering if no games have been played
  if (xWins === 0 && oWins === 0 && draws === 0) {
    return null;
  }

  const totalGames = xWins + oWins + draws;
  
  // Calculate average moves per game
  const totalMoves = history.reduce((acc, game) => acc + game.moves, 0);
  const averageMoves = totalGames > 0 ? (totalMoves / totalGames).toFixed(1) : "0";
  
  // Get the last winner
  const lastGame = history.length > 0 ? history[history.length - 1] : null;
  
  // Get the player with the winning streak
  let currentStreak = 0;
  let streakHolder = "";
  
  if (history.length > 0) {
    const lastWinner = history[history.length - 1].winner;
    if (lastWinner !== "Draw") {
      streakHolder = lastWinner === "X" ? xName : oName;
      
      // Count streak
      for (let i = history.length - 1; i >= 0; i--) {
        if (history[i].winner === lastWinner) {
          currentStreak++;
        } else {
          break;
        }
      }
    }
  }

  return (
    <motion.div 
      className="mt-8 p-4 rounded-xl bg-card/70 backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h3 className="text-lg font-medium mb-3 flex items-center">
        <Trophy size={18} className="mr-2 text-primary" />
        Game Statistics
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-2 rounded-lg bg-background/50">
          <div className="text-sm text-muted-foreground mb-1">Total Games</div>
          <div className="text-xl font-bold">{totalGames}</div>
        </div>
        
        <div className="text-center p-2 rounded-lg bg-background/50">
          <div className="text-sm text-muted-foreground mb-1">Avg. Moves</div>
          <div className="text-xl font-bold">{averageMoves}</div>
        </div>
        
        {currentStreak > 1 && (
          <div className="text-center p-2 rounded-lg bg-background/50 col-span-2">
            <div className="text-sm text-muted-foreground mb-1 flex items-center justify-center">
              <Medal size={14} className="mr-1 text-game-win" />
              Current Streak
            </div>
            <div className="text-xl font-bold">
              {streakHolder} ({currentStreak})
            </div>
          </div>
        )}
        
        {currentStreak <= 1 && lastGame && (
          <div className="text-center p-2 rounded-lg bg-background/50 col-span-2">
            <div className="text-sm text-muted-foreground mb-1">Last Winner</div>
            <div className="text-xl font-bold">
              {lastGame.winner === "Draw" 
                ? "Draw" 
                : (lastGame.winner === "X" ? xName : oName)}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center text-sm text-muted-foreground">
                <Info size={14} className="mr-1" />
                <span>Win Rate</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Victory percentage for each player</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      <div className="mt-2 w-full h-4 bg-secondary rounded-full overflow-hidden">
        <div className="h-full flex">
          <div 
            className="bg-game-x transition-all duration-500 ease-out"
            style={{ width: `${(xWins / totalGames) * 100}%` }}
          />
          <div 
            className="bg-game-o transition-all duration-500 ease-out"
            style={{ width: `${(oWins / totalGames) * 100}%` }}
          />
          <div 
            className="bg-muted transition-all duration-500 ease-out"
            style={{ width: `${(draws / totalGames) * 100}%` }}
          />
        </div>
      </div>
      
      <div className="mt-1 flex justify-between text-xs">
        <div>{xName}: {totalGames > 0 ? Math.round((xWins / totalGames) * 100) : 0}%</div>
        <div>{oName}: {totalGames > 0 ? Math.round((oWins / totalGames) * 100) : 0}%</div>
        <div>Draws: {totalGames > 0 ? Math.round((draws / totalGames) * 100) : 0}%</div>
      </div>
    </motion.div>
  );
};

export default GameStats;
