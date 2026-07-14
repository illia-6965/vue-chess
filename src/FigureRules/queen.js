export function getQueenMove(queen, boardData) {
  const x = queen.coordX;
  const y = queen.coordY;

  return calculateAvailableMoves(x, y, queen, boardData);
}
export function checkQueenAttack(king, boardData) {
  const x = king.coordX;
  const y = king.coordY;
  let isQueenCheck = false;
  for (const direction of moveDirections) {
    let counter = 1;
    while (true) {
      const { axisX: newX, axisY: newY } = direction(x, y, counter);
      const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);
      if (!existCoord || existCoord.colorFigure === king.colorFigure) {
        break;
      }
      if (existCoord.colorFigure && existCoord.colorFigure !== king.colorFigure) {
        if (existCoord.nameFigure === "queen") {
          isQueenCheck = true;
        }

        break;
      }
      counter++;
    }
  }

  return isQueenCheck;
}
const moveDirections = [
  (x, y, counter) => ({ axisX: x - counter, axisY: y - counter }), // Вліво вгору
  (x, y, counter) => ({ axisX: x + counter, axisY: y + counter }), // Вправо вниз
  (x, y, counter) => ({ axisX: x - counter, axisY: y + counter }), // Вліво вниз
  (x, y, counter) => ({ axisX: x + counter, axisY: y - counter }), // Вправо вгору
  (x, y, counter) => ({ axisX: x - counter, axisY: y }), // Вліво
  (x, y, counter) => ({ axisX: x + counter, axisY: y }), // Вправо
  (x, y, counter) => ({ axisX: x, axisY: y + counter }), // вгору
  (x, y, counter) => ({ axisX: x, axisY: y - counter }), // вниз
];
function calculateAvailableMoves(x, y, queen, boardData) {
  const calculatedMovesId = [];
  moveDirections.forEach((direction) => {
    let counter = 1;

    while (true) {
      const { axisX: newX, axisY: newY } = direction(x, y, counter);

      const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);
      if (existCoord && existCoord.colorFigure !== queen.colorFigure) {
        calculatedMovesId.push(existCoord.id);
        if (existCoord.nameFigure) {
          break;
        }
        counter++;
      } else {
        break;
      }
    }
  });
  return calculatedMovesId;
}
