<template>
  <div class="board" :class="rotateBoard">
    <cell
      v-for="square in chessStore.boardData"
      :key="square.id"
      :squareData="square"
      :activeFigureId="chessStore.activeFigureSquareId"
      :pawnPromotion="chessStore.pawnPromotion"
      @cellAction="handleCellAction"
      @pawnPromotionFigure="setNewFigure"
      :currentTurn="chessStore.currentTurn"
      :isKingInCheck="chessStore.isKingInCheck"
      :playerColor="chessStore.playerColor"
    />
  </div>
</template>

<script>
import { useChessStore } from "@/stores/chessStore";

import Cell from "@/components/Cell";

export default {
  setup() {
    const chessStore = useChessStore();
    return { chessStore };
  },
  components: {
    Cell,
  },
  data() {
    return {};
  },
  computed: {
    rotateBoard() {
      return this.chessStore.playerColor === "black" ? "board-player-black" : "";
    },
  },

  methods: {
    handleCellAction(payload) {
      this.chessStore.processPlayerAction(payload);
    },
    setNewFigure(nameFigure) {
      this.chessStore.completePawnPromotion(nameFigure);
    },
  },
};
</script>

<style lang="scss" scoped>
.board {
  --board-size: min(80vmin, 720px);
  --cell-size: calc(var(--board-size) / 8);
  width: var(--board-size);
  height: var(--board-size);

  display: grid;
  grid-template-columns: repeat(8, 1fr);
  grid-template-rows: repeat(8, 1fr);
  box-sizing: content-box;
  border: 2px solid black;
}
.board-player-black {
  transform: rotate(180deg);
}
</style>
