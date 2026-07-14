import { calculateAvailableMoves } from "@/GameLogic/calculateAvailableMoves";
export function checkingCheckMate(boardData, currentTurn, isKingInCheck, moveHistory) {
  const availableFigures = boardData.filter((square) => square.colorFigure === currentTurn);

  for (let i = 0; i < availableFigures.length; i++) {
    const availableMoves = calculateAvailableMoves(
      availableFigures[i].id,
      boardData,
      currentTurn,
      isKingInCheck,
      moveHistory,
    );

    if (availableMoves.length > 0) {
      return false;
    }
  }

  return true;
}
