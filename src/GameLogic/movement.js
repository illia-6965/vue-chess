import { executeCastle } from "@/GameRules/castle";
import { executeEnPassant } from "@/GameRules/enPassantCapture";

export function tryExecuteMove(availableMovesId, boardData, activeFigureSquareId, targetId, moveHistory) {
  //
  const source = boardData.find((square) => square.id === activeFigureSquareId);
  const target = boardData.find((square) => square.id === targetId);
  const permissionToMove = availableMovesId.includes(targetId);
  if (!source || !target) return false;
  if (!permissionToMove) {
    return false;
  }

  const isCastleMove = source.nameFigure === "king" && Math.abs(target.coordX - source.coordX) === 2;
  const isEnPassant =
    source.nameFigure === "pawn" &&
    !target.nameFigure &&
    (source.coordX - 1 === target.coordX || source.coordX + 1 === target.coordX);

  if (isCastleMove) {
    return executeCastle(source, target, boardData);
  }
  if (isEnPassant) {
    return executeEnPassant(source, target, boardData, moveHistory);
  }
  const move = saveMove(source, target);

  target.nameFigure = source.nameFigure;
  target.startPosition = false;
  target.colorFigure = source.colorFigure;

  source.nameFigure = null;
  source.startPosition = false;
  source.colorFigure = null;

  const isPawnPromotion = target.nameFigure === "pawn" && (target.coordY === 1 || target.coordY === 8);
  return {
    moveWasDone: true,
    move,
    promotion: isPawnPromotion
      ? {
          permission: true,
          targetId: target.id,
          colorFigure: target.colorFigure,
          nameFigure: null,
        }
      : null,
  };
}
function saveMove(source, target) {
  return {
    type: "move",
    figure: source.nameFigure,
    color: source.colorFigure,
    fromId: source.id,
    toId: target.id,
    fromX: source.coordX,
    fromY: source.coordY,
    target: target.nameFigure,
    toX: target.coordX,
    toY: target.coordY,
  };
}
