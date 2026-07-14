export function getRookMove(rook, boardData) {
  const x = rook.coordX;
  const y = rook.coordY;

  return calculateAvailableMoves(x, y, rook, boardData);
}
export function checkRookAttack(king, boardData) {
  const x = king.coordX;
  const y = king.coordY;
  let isRookCheck = false;
  for (const direction of moveDirections) {
    let counter = 1;
    while (true) {
      const { axisX: newX, axisY: newY } = direction(x, y, counter);
      const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);
      if (!existCoord || existCoord.colorFigure === king.colorFigure) {
        break;
      }
      if (existCoord.colorFigure && existCoord.colorFigure !== king.colorFigure) {
        if (existCoord.nameFigure === "rook") {
          isRookCheck = true;
        }

        break;
      }
      counter++;
    }
  }

  return isRookCheck;
}
const moveDirections = [
  (x, y, counter) => ({ axisX: x - counter, axisY: y }), // Вліво
  (x, y, counter) => ({ axisX: x + counter, axisY: y }), // Вправо
  (x, y, counter) => ({ axisX: x, axisY: y + counter }), // вгору
  (x, y, counter) => ({ axisX: x, axisY: y - counter }), // вниз
];
function calculateAvailableMoves(x, y, rook, boardData) {
  const calculatedMovesId = [];
  moveDirections.forEach((direction) => {
    let counter = 1;

    while (true) {
      const { axisX: newX, axisY: newY } = direction(x, y, counter);

      const existCoord = boardData.find((cell) => cell.coordX === newX && cell.coordY === newY);
      if (existCoord && existCoord.colorFigure !== rook.colorFigure) {
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
