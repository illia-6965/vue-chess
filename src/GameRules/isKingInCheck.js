import { kingCheckRules } from "@/GameRules/kingCheckRules";

export function verifyKingForCheck(boardData, currentTurn) {
  const king = boardData.find((square) => square.nameFigure === "king" && square.colorFigure === currentTurn);

  let isKingInCheck = false;

  for (let i = 0; i < kingCheckRules.length; i++) {
    isKingInCheck = kingCheckRules[i](king, boardData);
    if (isKingInCheck) {
      return true;
    }
  }

  return false;
}
