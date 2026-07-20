import { resolveDragIntent } from "@/GameLogic/resolveDragIntent";
export function processDragAction({
  squareId,
  currentTurn,
  boardData,
  activeFigureSquareId,
  availableMovesId,
  isKingInCheck,
  moveHistory,
}) {
  const dragIntent = resolveDragIntent(squareId, currentTurn.value, boardData.value, activeFigureSquareId.value);
  console.log(dragIntent, "drag intent");
}
