export function getPawnMoves(pawn, boardData) {
  const x = pawn.coordX;
  const y = pawn.coordY;
  const calculatedMoves = [];
  let onesStep = y - 1;
  let twoStep = y - 2;

  let attackLeft = x - 1;
  let attackRight = x + 1;
  if (pawn.colorFigure === "black") {
    onesStep = y + 1;
    twoStep = y + 2;

    attackLeft = x + 1;
    attackRight = x - 1;
  }

  boardData.forEach((cell) => {
    if (cell.coordX === pawn.coordX) {
      //move

      if (cell.coordY === onesStep && !cell.nameFigure) {
        //try one step
        calculatedMoves.push(cell.id);
      }

      if (cell.coordY === twoStep && pawn.startPosition && !cell.nameFigure) {
        //try two step
        const oneStepMove = boardData.find((item) => item.coordX === pawn.coordX && item.coordY === onesStep);

        if (!oneStepMove.nameFigure) {
          calculatedMoves.push(cell.id);
        }
      }
    }
    if (cell.coordY === onesStep && cell.nameFigure) {
      // attack

      if ((cell.coordX === attackLeft || cell.coordX === attackRight) && cell.colorFigure !== pawn.colorFigure) {
        calculatedMoves.push(cell.id);
      }
    }
  });
  return calculatedMoves;
}
export function checkPawnAttack(king, boardData) {
  const x = king.coordX;
  const y = king.coordY;
  let onesStep = y - 1;

  let attackLeft = x - 1;
  let attackRight = x + 1;
  if (king.colorFigure === "black") {
    onesStep = y + 1;

    attackLeft = x + 1;
    attackRight = x - 1;
  }
  let isPawnCheck = false;
  boardData.forEach((cell) => {
    if (cell.coordY === onesStep && cell.nameFigure) {
      // attack

      if ((cell.coordX === attackLeft || cell.coordX === attackRight) && cell.colorFigure !== king.colorFigure) {
        if (cell.nameFigure === "pawn") {
          isPawnCheck = true;
          return;
        }
      }
    }
  });
  return isPawnCheck;
}
