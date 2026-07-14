<template>
  <div class="pawn-promotion">
    <div
      class="promotion-cell"
      v-for="figure in figures"
      :key="figure.id"
      @click.stop="selectFigure(figure.nameFigure)"
    >
      <font-awesome-icon :icon="figure.icon" class="promotion-icon" :style="{ color: colorFigure }" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      figures: [
        {
          nameFigure: "queen",
          icon: "fa-solid fa-chess-queen",
          id: 1,
        },
        {
          nameFigure: "bishop",
          icon: "fa-solid fa-chess-bishop",
          id: 2,
        },
        {
          nameFigure: "knight",
          icon: "fa-solid fa-chess-knight",
          id: 3,
        },
        {
          nameFigure: "rook",
          icon: "fa-chess-rook",
          id: 4,
        },
      ],
    };
  },
  props: {
    colorFigure: {
      type: String,
    },
  },

  methods: {
    selectFigure(nameFigure) {
      this.$emit("pawnPromotionFigure", nameFigure);
    },
  },
};
</script>
<style scoped lang="scss">
.pawn-promotion {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.promotion-cell {
  background-color: #bbb2b2;
  border: 1px solid black;
  position: relative;
  border-radius: 50%;
  width: var(--cell-size);
  height: var(--cell-size);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: background-color 1s ease;
}
.promotion-icon {
  font-size: 50px; /* Set your desired font size */
  stroke: black;
  stroke-width: 20px;
  paint-order: stroke;
  transition: transform 0.2s ease;
}

.promotion-cell:hover {
  background-color: #f22d2d;
}
.promotion-cell:hover .promotion-icon {
  transform: scale(1.2);
}
</style>
