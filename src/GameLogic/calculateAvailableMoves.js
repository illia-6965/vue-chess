import { rawMoves } from "@/FigureRules/figureRules";
import { verifyKingForCheck } from "@/GameRules/isKingInCheck";
import { calculateCastleMoves } from "@/GameRules/castle";
import { calculateEnPassantIds } from "@/GameRules/enPassantCapture";

export function calculateAvailableMoves(activeFigureSquareId, boardData, currentTurn, isKingInCheck, moveHistory) {
  const figure = boardData.find((square) => square.id === activeFigureSquareId);

  const rawMovesId = rawMoves[figure.nameFigure](figure, boardData);

  if (figure.nameFigure === "pawn" && moveHistory.length > 0) {
    const enPassantIds = calculateEnPassantIds(figure, boardData, currentTurn, moveHistory);
    rawMovesId.push(...enPassantIds);
  }

  const legalMovesId = getLegalMove(rawMovesId, boardData, activeFigureSquareId, currentTurn);

  if (figure.nameFigure === "king" && !isKingInCheck) {
    const castleMovesId = calculateCastleMoves(boardData, figure);
    legalMovesId.push(...castleMovesId);
  }

  return legalMovesId;
}
//
//
//
//
function getLegalMove(availableMovesId, boardData, activeFigureSquareId, currentTurn) {
  const legalMoves = [];
  availableMovesId.forEach((moveId) => {
    const fakeBoard = boardData.map((square) => ({ ...square }));
    const source = fakeBoard.find((square) => square.id === activeFigureSquareId);
    const target = fakeBoard.find((square) => square.id === moveId);

    target.nameFigure = source.nameFigure;
    target.colorFigure = source.colorFigure;
    target.startPosition = false;

    source.nameFigure = null;
    source.colorFigure = null;
    source.startPosition = false;
    const kingIsInCheck = verifyKingForCheck(fakeBoard, currentTurn);

    if (!kingIsInCheck) {
      legalMoves.push(moveId);
    }
  });
  return legalMoves;
}
