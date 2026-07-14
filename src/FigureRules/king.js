export function getKingMove(king, boardData) {
  const x = king.coordX;
  const y = king.coordY;
  return calculateAvailableMoves(x, y, king, boardData);
}

export function checkKingAttack(king, boardData) {
  const x = king.coordX;
  const y = king.coordY;
  let isKingCheck = false;
  moveDirections.forEach((direction) => {
    const { axisX: newX, axisY: newY } = direction(x, y);

    const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);

    if (existCoord && existCoord.nameFigure === "king" && king.colorFigure !== existCoord.colorFigure) {
      isKingCheck = true; //
    }
  });
  return isKingCheck;
}
function calculateAvailableMoves(x, y, king, boardData, castleData) {
  const calculatedMovesId = [];
  moveDirections.forEach((direction) => {
    const { axisX: newX, axisY: newY } = direction(x, y);

    const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);

    if (existCoord && existCoord.colorFigure !== king.colorFigure) {
      calculatedMovesId.push(existCoord.id); //
    }
  });

  //check castle squares

  return calculatedMovesId;
}

const moveDirections = [
  (x, y) => ({ axisX: x - 1, axisY: y - 1 }), // Вліво вгору
  (x, y) => ({ axisX: x - 1, axisY: y + 1 }), // Вправо вниз
  (x, y) => ({ axisX: x + 1, axisY: y - 1 }), // Вліво вниз
  (x, y) => ({ axisX: x + 1, axisY: y + 1 }), // Вправо вгору
  (x, y) => ({ axisX: x - 1, axisY: y }), // Вліво
  (x, y) => ({ axisX: x + 1, axisY: y }), // Вправо
  (x, y) => ({ axisX: x, axisY: y - 1 }), // вгору
  (x, y) => ({ axisX: x, axisY: y + 1 }), // вниз
];
