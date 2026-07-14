<template>
  <div class="result-game" @click="closeWindow">
    <div class="result-game__info">
      <h1>{{ resultGame }}</h1>
      <game-button :buttonClass="'close-window'" @click.stop="closeWindow">Close</game-button>
    </div>
  </div>
</template>

<script>
import GameButton from "@/components/GameButton.vue";

export default {
  components: { GameButton },

  props: {
    resultGame: {
      type: String,
    },
  },
  computed: {},
  methods: {
    closeWindow() {
      this.$emit("closeResultWindow", false);
    },
  },
};
</script>

<style scoped lang="scss">
.result-game {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 61px;
  font-weight: 600;

  &__info {
    padding: 50px 50px;

    background-color: rgba(104, 96, 96, 0.803);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
  }
}
</style>
