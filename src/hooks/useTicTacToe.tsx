
import { useState, useEffect, useCallback } from 'react';

export type Player = 'X' | 'O';
export type CellValue = Player | null;
export type Board = CellValue[];
export type GameMode = 'player-vs-player' | 'player-vs-ai';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type GameStatus = 'playing' | 'won' | 'draw';
export type GameHistory = {
  winner: Player | 'Draw' | null;
  date: Date;
  moves: number;
};

interface GameState {
  board: Board;
  currentPlayer: Player;
  winner: Player | null;
  winningLine: number[] | null;
  gameStatus: GameStatus;
  movesCount: number;
  gameMode: GameMode;
  difficulty: Difficulty;
  playerNames: {
    X: string;
    O: string;
  };
  history: GameHistory[];
  stats: {
    X: number;
    O: number;
    draws: number;
  };
}

const initialState: GameState = {
  board: Array(9).fill(null),
  currentPlayer: 'X',
  winner: null,
  winningLine: null,
  gameStatus: 'playing',
  movesCount: 0,
  gameMode: 'player-vs-player',
  difficulty: 'medium',
  playerNames: {
    X: 'Player X',
    O: 'Player O',
  },
  history: [],
  stats: {
    X: 0,
    O: 0,
    draws: 0,
  },
};

// All possible winning combinations
const winningCombinations = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

export function useTicTacToe() {
  const [game, setGame] = useState<GameState>(() => {
    // Try to load game from localStorage
    const savedGame = localStorage.getItem('ticTacToeGame');
    return savedGame ? JSON.parse(savedGame) : { ...initialState };
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('ticTacToeGame', JSON.stringify(game));
  }, [game]);

  // Check if there's a winner
  const checkWinner = useCallback((board: Board): { winner: Player | null; line: number[] | null } => {
    for (const combo of winningCombinations) {
      const [a, b, c] = combo;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return { winner: board[a] as Player, line: combo };
      }
    }
    return { winner: null, line: null };
  }, []);

  // Check if the game is a draw
  const checkDraw = useCallback((board: Board): boolean => {
    return board.every((cell) => cell !== null);
  }, []);

  // Make a move
  const makeMove = useCallback((index: number) => {
    if (game.board[index] !== null || game.gameStatus !== 'playing') {
      return false;
    }

    setGame((prevGame) => {
      const newBoard = [...prevGame.board];
      newBoard[index] = prevGame.currentPlayer;

      const movesCount = prevGame.movesCount + 1;
      const { winner, line } = checkWinner(newBoard);
      const isDraw = !winner && checkDraw(newBoard);

      let gameStatus = prevGame.gameStatus;
      let stats = { ...prevGame.stats };
      let history = [...prevGame.history];

      if (winner) {
        gameStatus = 'won';
        stats[winner] += 1;
        history.push({
          winner,
          date: new Date(),
          moves: movesCount,
        });
      } else if (isDraw) {
        gameStatus = 'draw';
        stats.draws += 1;
        history.push({
          winner: 'Draw',
          date: new Date(),
          moves: movesCount,
        });
      }

      return {
        ...prevGame,
        board: newBoard,
        currentPlayer: prevGame.currentPlayer === 'X' ? 'O' : 'X',
        winner,
        winningLine: line,
        gameStatus,
        movesCount,
        stats,
        history,
      };
    });

    return true;
  }, [game, checkWinner, checkDraw]);

  // AI move
  useEffect(() => {
    if (
      game.gameMode === 'player-vs-ai' &&
      game.currentPlayer === 'O' &&
      game.gameStatus === 'playing'
    ) {
      const timer = setTimeout(() => {
        let aiMove: number;

        // AI logic based on difficulty
        if (game.difficulty === 'easy') {
          // Random empty cell
          aiMove = getRandomEmptyCell(game.board);
        } else if (game.difficulty === 'medium') {
          // 50% chance of optimal move, 50% chance of random move
          aiMove = Math.random() < 0.5
            ? findBestMove(game.board, 'O')
            : getRandomEmptyCell(game.board);
        } else {
          // Hard: Optimal move
          aiMove = findBestMove(game.board, 'O');
        }

        makeMove(aiMove);
      }, 700); // Delay to make AI move feel more natural

      return () => clearTimeout(timer);
    }
  }, [game.currentPlayer, game.gameMode, game.gameStatus, game.difficulty, game.board, makeMove]);

  // Get random empty cell
  const getRandomEmptyCell = (board: Board): number => {
    const emptyCells = board
      .map((cell, index) => (cell === null ? index : -1))
      .filter((index) => index !== -1);
    
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  };

  // Minimax algorithm for optimal AI move
  const findBestMove = (board: Board, player: Player): number => {
    // Simple implementation for medium difficulty
    // Check for winning move
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = player;
        if (checkWinner(testBoard).winner === player) {
          return i;
        }
      }
    }

    // Block opponent's winning move
    const opponent = player === 'X' ? 'O' : 'X';
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        const testBoard = [...board];
        testBoard[i] = opponent;
        if (checkWinner(testBoard).winner === opponent) {
          return i;
        }
      }
    }

    // Take center if available
    if (board[4] === null) {
      return 4;
    }

    // Take a corner
    const corners = [0, 2, 6, 8];
    const availableCorners = corners.filter(i => board[i] === null);
    if (availableCorners.length > 0) {
      return availableCorners[Math.floor(Math.random() * availableCorners.length)];
    }

    // Take any available side
    const sides = [1, 3, 5, 7];
    const availableSides = sides.filter(i => board[i] === null);
    if (availableSides.length > 0) {
      return availableSides[Math.floor(Math.random() * availableSides.length)];
    }

    // Fallback to random empty cell (shouldn't reach here)
    return getRandomEmptyCell(board);
  };

  // Reset game
  const resetGame = useCallback(() => {
    setGame((prevGame) => ({
      ...prevGame,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
      gameStatus: 'playing',
      movesCount: 0,
    }));
  }, []);

  // Reset game stats
  const resetStats = useCallback(() => {
    setGame((prevGame) => ({
      ...prevGame,
      stats: {
        X: 0,
        O: 0,
        draws: 0,
      },
      history: [],
    }));
  }, []);

  // Set game mode
  const setGameMode = useCallback((mode: GameMode) => {
    setGame((prevGame) => ({
      ...prevGame,
      gameMode: mode,
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningLine: null,
      gameStatus: 'playing',
      movesCount: 0,
      playerNames: {
        ...prevGame.playerNames,
        O: mode === 'player-vs-ai' ? 'AI' : 'Player O',
      },
    }));
  }, []);

  // Set difficulty
  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setGame((prevGame) => ({
      ...prevGame,
      difficulty,
    }));
  }, []);

  // Set player name
  const setPlayerName = useCallback((player: Player, name: string) => {
    setGame((prevGame) => ({
      ...prevGame,
      playerNames: {
        ...prevGame.playerNames,
        [player]: name,
      },
    }));
  }, []);

  return {
    board: game.board,
    currentPlayer: game.currentPlayer,
    winner: game.winner,
    winningLine: game.winningLine,
    gameStatus: game.gameStatus,
    movesCount: game.movesCount,
    gameMode: game.gameMode,
    difficulty: game.difficulty,
    playerNames: game.playerNames,
    history: game.history,
    stats: game.stats,
    makeMove,
    resetGame,
    resetStats,
    setGameMode,
    setDifficulty,
    setPlayerName,
  };
}
