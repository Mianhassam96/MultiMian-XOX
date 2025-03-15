
import { toast } from "sonner";
import { GameStatus, Player } from "@/hooks/useTicTacToe";

export const showGameStatusToast = (
  status: GameStatus,
  winner: Player | null,
  playerNames: { X: string; O: string }
) => {
  if (status === "won" && winner) {
    toast.success(
      `${winner === "X" ? playerNames.X : playerNames.O} wins!`,
      { duration: 4000 }
    );
  } else if (status === "draw") {
    toast.info("It's a draw!", { duration: 3000 });
  }
};

export const getStatusMessage = (
  status: GameStatus,
  winner: Player | null,
  playerNames: { X: string; O: string },
  currentPlayer: Player
) => {
  if (status === "won" && winner) {
    return `${winner === "X" ? playerNames.X : playerNames.O} wins!`;
  } else if (status === "draw") {
    return "It's a draw!";
  } else {
    return `${currentPlayer === "X" ? playerNames.X : playerNames.O}'s turn`;
  }
};
