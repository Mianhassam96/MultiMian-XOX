
import Cell from "./Cell";
import { Board, Player } from "@/hooks/useTicTacToe";
import { motion } from "framer-motion";

interface GameBoardProps {
  board: Board;
  onCellClick: (index: number) => void;
  winningLine: number[] | null;
  currentPlayer: Player;
}

const GameBoard = ({ board, onCellClick, winningLine, currentPlayer }: GameBoardProps) => {
  const isWinningCell = (index: number) => {
    return winningLine ? winningLine.includes(index) : false;
  };

  return (
    <motion.div 
      className="relative p-4 md:p-6 bg-game-board rounded-3xl shadow-board"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="game-board-grid">
        {board.map((value, index) => (
          <Cell
            key={index}
            value={value}
            index={index}
            onClick={onCellClick}
            isWinningCell={isWinningCell(index)}
            currentPlayer={currentPlayer}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default GameBoard;
