
import { CellValue, Player } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";
import { X, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CellProps {
  value: CellValue;
  index: number;
  onClick: (index: number) => void;
  isWinningCell: boolean;
  currentPlayer: Player;
}

const Cell = ({ value, index, onClick, isWinningCell, currentPlayer }: CellProps) => {
  const handleClick = () => {
    if (!value) {
      onClick(index);
    }
  };

  return (
    <motion.div
      className={cn(
        "game-cell aspect-square",
        isWinningCell && "winning-cell"
      )}
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ scale: value ? 1 : 1.05 }}
      whileTap={{ scale: value ? 1 : 0.95 }}
    >
      {value === null && (
        <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-20 transition-opacity duration-300">
          {currentPlayer === 'X' ? (
            <X size={36} className="text-game-x/50" />
          ) : (
            <Circle size={36} className="text-game-o/50" />
          )}
        </div>
      )}
      
      {value && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="game-mark"
        >
          {value === 'X' ? (
            <X size={48} className="text-game-x" strokeWidth={2.5} />
          ) : (
            <Circle size={48} className="text-game-o" strokeWidth={2.5} />
          )}
        </motion.div>
      )}
    </motion.div>
  );
};

export default Cell;
