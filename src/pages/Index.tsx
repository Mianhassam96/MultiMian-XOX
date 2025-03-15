
import { useState, useEffect } from "react";
import { useTicTacToe } from "@/hooks/useTicTacToe";
import GameBoard from "@/components/GameBoard";
import PlayerInfo from "@/components/PlayerInfo";
import GameControls from "@/components/GameControls";
import GameStats from "@/components/GameStats";
import GameHistory from "@/components/GameHistory";
import ConfettiEffect from "@/components/ConfettiEffect";
import Footer from "@/components/Footer";
import { showGameStatusToast, getStatusMessage } from "@/utils/gameUtils";
import { motion } from "framer-motion";

const Index = () => {
  const {
    board,
    currentPlayer,
    winner,
    winningLine,
    gameStatus,
    gameMode,
    difficulty,
    playerNames,
    history,
    stats,
    makeMove,
    resetGame,
    resetStats,
    setGameMode,
    setDifficulty,
    setPlayerName,
  } = useTicTacToe();

  const [prevGameStatus, setPrevGameStatus] = useState(gameStatus);
  const [showConfetti, setShowConfetti] = useState(false);

  // Handle game status changes and show toast
  useEffect(() => {
    if (gameStatus !== prevGameStatus) {
      showGameStatusToast(gameStatus, winner, playerNames);
      
      if (gameStatus === "won") {
        setShowConfetti(true);
        const timer = setTimeout(() => setShowConfetti(false), 4000);
        return () => clearTimeout(timer);
      }
      
      setPrevGameStatus(gameStatus);
    }
  }, [gameStatus, prevGameStatus, winner, playerNames]);

  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center justify-start py-8 px-4 overflow-hidden">
      <ConfettiEffect active={showConfetti} />
      
      <motion.h1 
        className="text-3xl md:text-4xl font-bold mb-2 tracking-tight"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        MultiMian XOX
      </motion.h1>
      
      <motion.div
        className="text-muted-foreground mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {getStatusMessage(gameStatus, winner, playerNames, currentPlayer)}
      </motion.div>
      
      <div className="w-full max-w-3xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="md:col-span-1 flex justify-center md:justify-end">
            <PlayerInfo
              player="X"
              name={playerNames.X}
              isActive={currentPlayer === "X" && gameStatus === "playing"}
              score={stats.X}
              isWinner={winner === "X"}
              onNameChange={setPlayerName}
            />
          </div>
          
          <div className="md:col-span-1 flex justify-center text-sm text-muted-foreground items-center">
            vs
          </div>
          
          <div className="md:col-span-1 flex justify-center md:justify-start">
            <PlayerInfo
              player="O"
              name={playerNames.O}
              isActive={currentPlayer === "O" && gameStatus === "playing"}
              score={stats.O}
              isWinner={winner === "O"}
              onNameChange={setPlayerName}
            />
          </div>
        </div>
        
        <GameBoard
          board={board}
          onCellClick={makeMove}
          winningLine={winningLine}
          currentPlayer={currentPlayer}
        />
        
        <GameControls
          onResetGame={resetGame}
          onResetStats={resetStats}
          gameMode={gameMode}
          onGameModeChange={setGameMode}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
        
        <GameStats
          history={history}
          xWins={stats.X}
          oWins={stats.O}
          draws={stats.draws}
          xName={playerNames.X}
          oName={playerNames.O}
        />
        
        <GameHistory
          history={history}
          xName={playerNames.X}
          oName={playerNames.O}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
