<template>
  <div class="game-panel">
    <div class="new-game">
      <game-button :disabled="!chessStore.gameStarted" :buttonClass="'new-game-button'" @click="startNewGame"
        >New game</game-button
      >
    </div>

    <div class="choose-color">
      <h2>Choose color to start game:</h2>
      <game-button :disabled="chessStore.gameStarted" :buttonClass="'choose-white-btn'" @click="setColorPlayer('white')"
        >white</game-button
      >
      <game-button :disabled="chessStore.gameStarted" :buttonClass="'choose-black-btn'" @click="setColorPlayer('black')"
        >black
      </game-button>
    </div>

    <div class="undo-reset">
      <game-button
        :disabled="!chessStore.gameStarted || chessStore.botThinking"
        :buttonClass="'undo-btn'"
        @click="setPenultimateMove"
        >Undo</game-button
      >
    </div>
  </div>
</template>

<script>
import GameButton from "@/components/GameButton.vue";
import { useChessStore } from "@/stores/chessStore";
export default {
  components: { GameButton },
  setup() {
    const chessStore = useChessStore();

    return { chessStore };
  },
  data() {
    return {};
  },
  methods: {
    setColorPlayer(color) {
      this.chessStore.startGame(color);
    },
    startNewGame() {
      this.chessStore.startNewGame();
    },
    setPenultimateMove() {
      this.chessStore.setPenultimateMove();
    },
  },
};
</script>

<style lang="scss" scoped>
.game-panel {
  width: 220px;
  padding: 20px;
  background: #2c2c2c;
  border-radius: 12px;
  color: white;
}

.new-game,
.choose-color,
.undo-reset {
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.choose-color h2 {
  margin: 0 0 8px;
  font-size: 20px;
}
</style>
