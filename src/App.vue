<template>
  <div class="app-wrapper">
    <board />
    <game-panel />
    <result-game
      v-if="chessStore.modalWindGameOver"
      :resultGame="getResultGame"
      class="result-game"
      @closeResultWindow="closeResultWindow"
    />
  </div>
</template>

<script>
import ResultGame from "@/components/ResultGame";
import Board from "@/components/Board";
import GamePanel from "./components/GamePanel.vue";
import { useChessStore } from "@/stores/chessStore";
export default {
  components: {
    Board,
    GamePanel,
    ResultGame,
  },
  setup() {
    const chessStore = useChessStore();
    return { chessStore };
  },

  computed: {
    getResultGame() {
      if (this.chessStore.winner) {
        return `${this.chessStore.winner} is won`;
      }
      if (this.chessStore.isDraw) {
        return `draw - ${this.chessStore.isDraw}`;
      }
    },
  },
  methods: {
    closeResultWindow(resetValue) {
      this.chessStore.modalWindGameOver = resetValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  position: relative;
}
.result-game {
  position: absolute;
  left: 0;
  top: 0;
}
</style>
