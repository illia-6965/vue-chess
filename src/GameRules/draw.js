import { calculateAvailableMoves } from "@/GameLogic/calculateAvailableMoves";
export function checkDraw(boardData, currentTurn, isKingInCheck, moveHistory) {
  const availableFigures = boardData.filter((square) => square.colorFigure === currentTurn);
  const firstPlayerFigures = boardData.filter((square) => square.nameFigure && square.colorFigure !== currentTurn);

  const isDraw = checkInsufficientMaterial(firstPlayerFigures, availableFigures);
  if (isDraw) {
    return "insufficientMaterial";
  }
  if (!isKingInCheck) {
    for (let i = 0; i < availableFigures.length; i++) {
      const availableMoves = calculateAvailableMoves(
        availableFigures[i].id,
        boardData,
        currentTurn,
        isKingInCheck,
        moveHistory,
      );

      if (availableMoves.length > 0) {
        return null;
      }
    }

    return "stalemate";
  }
  return null;
}
function checkInsufficientMaterial(firstPlayerFigures, secondPlayerFigures) {
  const firstCount = countValue(0, firstPlayerFigures);
  const SecondCount = countValue(0, secondPlayerFigures);
  if (firstCount >= 6 || SecondCount >= 6) {
    return false;
  }
  if (firstCount < 6 && SecondCount < 6) {
    return true;
  }
  return false;
}
function countValue(counter, playerFigures) {
  for (let i = 0; i < playerFigures.length; i++) {
    switch (playerFigures[i].nameFigure) {
      case "queen":
        counter += 6;
        break;
      case "pawn":
        counter += 6;
        break;
      case "rook":
        counter += 6;
        break;
      case "knight":
        counter += 3;
        break;
      case "bishop":
        counter += 3;
        break;
    }
  }
  return counter;
}
