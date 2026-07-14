<template>
  <button :class="buttonClass" :disabled="disabled">
    <slot></slot>
  </button>
</template>

<script>
export default {
  computed: {},
  props: {
    buttonClass: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.close-window,
.new-game-button,
.choose-white-btn,
.choose-black-btn,
.undo-btn {
  padding: 12px 16px;
  border: none;
  border-radius: 8px;

  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  transition: 0.2s;
}
.choose-white-btn:disabled,
.choose-black-btn:disabled,
.new-game-button:disabled,
.undo-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: gray;
}

/* New game */
.new-game-button {
  background: #d6b16f;
  color: #222;
}

.new-game-button:hover {
  background: #c99f55;
}

/* White */
.choose-white-btn {
  background: #f2f2f2;
  color: #222;
}

.choose-white-btn:hover {
  background: #dddddd;
}

/* Black */
.choose-black-btn {
  background: #1f1f1f;
  color: white;
  border: 1px solid #555;
}

.choose-black-btn:hover {
  background: #333;
}
.close-window {
  background: #1f1f1f;
  color: white;
  border: 1px solid #555;
}
.close-window:hover {
  background: #2c2a2a;
}
/* Undo */
.undo-btn {
  background: #575b2e;
  color: white;
}

.undo-btn:hover {
  background: #b15a5a;
}

/* Reset */
</style>
