import { verifyKingForCheck } from "@/GameRules/isKingInCheck";
export function calculateEnPassantIds(pawn, boardData, currentTurn, moveHistory) {
  const availableMoveId = enPassantCapture(pawn, boardData, currentTurn, moveHistory);
  if (!availableMoveId) {
    return [];
  }
  const fakeBoard = boardData.map((square) => ({ ...square }));
  const pawnToDeleteId = moveHistory[moveHistory.length - 1].toId;
  const pawnToDelete = fakeBoard.find((square) => square.id === pawnToDeleteId);
  const target = fakeBoard.find((square) => square.id === availableMoveId);
  const source = fakeBoard.find((square) => square.id === pawn.id);
  if (!target || !source || !pawnToDelete) return [];
  target.nameFigure = source.nameFigure;
  target.startPosition = false;
  target.colorFigure = source.colorFigure;

  source.nameFigure = null;
  source.startPosition = false;
  source.colorFigure = null;

  pawnToDelete.nameFigure = null;
  pawnToDelete.startPosition = null;
  pawnToDelete.colorFigure = null;
  const kingInCheck = verifyKingForCheck(fakeBoard, currentTurn);
  if (kingInCheck) {
    return [];
  }
  return [availableMoveId];
}

export function executeEnPassant(source, target, boardData, moveHistory) {
  const pawnToDeleteId = moveHistory[moveHistory.length - 1].toId;
  const pawnToDelete = boardData.find((square) => square.id === pawnToDeleteId);

  const move = {
    type: "enPassant",
    figure: "pawn",
    color: source.colorFigure,

    fromId: source.id,
    toId: target.id,

    fromX: source.coordX,
    fromY: source.coordY,
    toX: target.coordX,
    toY: target.coordY,

    capturedFigure: "pawn",
    capturedColor: pawnToDelete.colorFigure,
    capturedId: pawnToDelete.id,
    capturedX: pawnToDelete.coordX,
    capturedY: pawnToDelete.coordY,
  };

  target.nameFigure = source.nameFigure;
  target.startPosition = false;
  target.colorFigure = source.colorFigure;

  source.nameFigure = null;
  source.startPosition = false;
  source.colorFigure = null;
  pawnToDelete.nameFigure = null;
  pawnToDelete.startPosition = null;
  pawnToDelete.colorFigure = null;

  return {
    moveWasDone: true,
    move,
  };
}

function enPassantCapture(pawn, boardData, currentTurn, moveHistory) {
  const lastMove = moveHistory[moveHistory.length - 1];

  if (lastMove.figure === "pawn" && Math.abs(lastMove.fromY - lastMove.toY) === 2) {
    if (currentTurn === "white") {
      if (pawn.coordY === 4) {
        return getAvailableIds(boardData, pawn, lastMove, 1);
      }
    }
    if (currentTurn === "black") {
      if (pawn.coordY === 5) {
        return getAvailableIds(boardData, pawn, lastMove, -1);
      }
    }
  }
  return null;
}
function getAvailableIds(boardData, pawn, lastMove, indx) {
  let availableMoveId = null;
  const leftAttack = boardData.find(
    (square) => square.coordX === pawn.coordX - 1 && square.coordY === pawn.coordY - indx,
  );
  const rightAttack = boardData.find(
    (square) => square.coordX === pawn.coordX + 1 && square.coordY === pawn.coordY - indx,
  );

  if (leftAttack && !leftAttack.nameFigure && lastMove.toX === pawn.coordX - 1) {
    availableMoveId = leftAttack.id;
  }

  if (rightAttack && !rightAttack.nameFigure && lastMove.toX === pawn.coordX + 1) {
    availableMoveId = rightAttack.id;
  }

  return availableMoveId;
}
