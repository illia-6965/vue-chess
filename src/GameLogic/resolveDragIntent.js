export function resolveDragIntent(squareId, currentTurn, boardData, activeFigureSquareId) {
  const activeSquare = boardData.find((square) => square.id === activeFigureSquareId);
  const targetSquare = boardData.find((square) => square.id === squareId);

  if (!targetSquare) {
    return "ignore";
  }

  const hasActiveFigure = activeSquare && activeSquare.nameFigure;
  const hasTargetFigure = targetSquare.nameFigure;

  if (!hasActiveFigure) {
    if (hasTargetFigure && targetSquare.colorFigure === currentTurn) {
      return "select";
    }

    return "ignore";
  }

  if (targetSquare.id === activeSquare.id) {
    return "deselect";
  }

  if (hasTargetFigure && targetSquare.colorFigure === activeSquare.colorFigure) {
    return "switch";
  }
}
