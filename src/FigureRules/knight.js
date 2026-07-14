export function getKnightMove(knight, boardData) {
  const x = knight.coordX;
  const y = knight.coordY;

  return calculateAvailableMoves(x, y, knight, boardData);
}
export function checkKnightAttack(king, boardData) {
  const x = king.coordX;
  const y = king.coordY;
  let isKnightCheck = false;
  moveDirections.forEach((direction) => {
    const { axisX: newX, axisY: newY } = direction(x, y);
    const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);

    if (existCoord && existCoord.colorFigure !== king.colorFigure && existCoord.nameFigure === "knight") {
      isKnightCheck = true;
    }
  });
  return isKnightCheck;
}
const moveDirections = [
  (x, y) => ({ axisX: x - 2, axisY: y - 1 }), // Вліво вгору
  (x, y) => ({ axisX: x - 2, axisY: y + 1 }), // Вправо вниз
  (x, y) => ({ axisX: x + 2, axisY: y - 1 }), // Вліво вниз
  (x, y) => ({ axisX: x + 2, axisY: y + 1 }), // Вправо вгору
  (x, y) => ({ axisX: x - 1, axisY: y + 2 }), // Вліво
  (x, y) => ({ axisX: x + 1, axisY: y + 2 }), // Вправо
  (x, y) => ({ axisX: x + 1, axisY: y - 2 }), // вгору
  (x, y) => ({ axisX: x - 1, axisY: y - 2 }), // вниз
];
function calculateAvailableMoves(x, y, knight, boardData) {
  const calculatedMovesId = [];
  moveDirections.forEach((direction) => {
    const { axisX: newX, axisY: newY } = direction(x, y);

    const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);

    if (existCoord && existCoord.colorFigure !== knight.colorFigure) {
      calculatedMovesId.push(existCoord.id); //
    }
  });
  return calculatedMovesId;
}
