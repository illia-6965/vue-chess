<template>
  <div
    class="cell"
    :style="{ backgroundColor: squareData.colorCell }"
    @click="emitCellAction(squareData.id)"
    :class="{
      'active-figure': activeFigureId === squareData.id,
      'king-in-check': currentTurn === squareData.colorFigure && squareData.nameFigure === 'king' && isKingInCheck,
    }"
    :data-square-id="squareData.id"
  >
    <div class="cell-indication" v-show="squareData.indication"></div>

    <div
      v-if="squareData.nameFigure"
      class="wrapper-icon"
      @pointerdown="startDrag($event, squareData.id)"
      @pointermove="moveDrag"
      @pointerup="stopDrag"
      @pointercancel="stopDrag"
    >
      <font-awesome-icon
        :icon="figureIcon"
        :class="rotateFigure"
        class="custom-icon"
        :style="{ color: squareData.colorFigure }"
      />
    </div>

    <font-awesome-icon
      v-if="drag.active"
      :icon="figureIcon"
      :class="rotateFigure"
      :style="{
        color: squareData.colorFigure,
        left: `${drag.x}px`,
        top: `${drag.y}px`,
        transform: 'translate(-50%, -50%)',
      }"
      class="dragged-icon"
    />

    <pawn-promotion
      v-if="pawnPromotion.permission && pawnPromotion.targetId === squareData.id"
      :colorFigure="pawnPromotion.colorFigure"
      :class="rotatePromotion"
      @pawnPromotionFigure="emitPawnPromotionFigure"
    />
  </div>
</template>
@drop="onDrop($event, squareData.id)" @dragover.prevent="onDragOver($event, squareData.id)" @dragenter.prevent
<script>
import PawnPromotion from "@/components/PawnPromotion";
export default {
  components: { PawnPromotion },
  data() {
    return {
      drag: {
        active: false,
        moved: false,
        startX: 0,
        startY: 0,
        x: 0,
        y: 0,
      },
    };
  },

  computed: {
    figureIcon() {
      const figuresIcon = {
        king: "fa-solid fa-chess-king",
        queen: "fa-solid fa-chess-queen",
        bishop: "fa-solid fa-chess-bishop",
        knight: "fa-solid fa-chess-knight",
        rook: "fa-chess-rook",
        pawn: "fa-chess-pawn",
      };
      return figuresIcon[this.squareData.nameFigure];
    },
    rotateFigure() {
      return this.playerColor === "black" ? "custom-icon-black" : "";
    },
    rotatePromotion() {
      return this.playerColor === "white" ? "promotion-white" : "promotion-black";
    },
  },
  props: {
    squareData: {
      type: Object,
    },
    activeFigureId: {
      type: String,
    },
    pawnPromotion: {
      type: Object,
    },
    currentTurn: {
      type: String,
    },
    isKingInCheck: {
      type: Boolean,
    },
    playerColor: {
      type: String,
    },
  },

  methods: {
    emitPawnPromotionFigure(nameFigure) {
      this.$emit("pawnPromotionFigure", nameFigure);
    },
    emitCellAction(id) {
      if (this.ignoreNextClick) {
        this.ignoreNextClick = false;
        return;
      }
      const payload = {
        action: "click",
        squareId: id,
      };
      this.$emit("cellAction", payload);
    },
    startDrag(event, id) {
      this.drag.active = true;
      const payload = {
        action: "start-drag",
        squareId: id,
      };
      this.$emit("cellAction", payload);
      this.drag.x = event.clientX;
      this.drag.y = event.clientY;

      event.currentTarget.setPointerCapture(event.pointerId);
    },

    moveDrag(event) {
      if (!this.drag.active) return;
      if (Math.abs(event.clientX - this.drag.startX) > 5 || Math.abs(event.clientY - this.drag.startY) > 5) {
        this.drag.moved = true;
      }
      this.drag.x = event.clientX;
      this.drag.y = event.clientY;
    },

    stopDrag(event) {
      if (this.drag.moved) {
        this.ignoreNextClick = true;
        const elementUnderMouse = document.elementFromPoint(event.clientX, event.clientY);

        const targetSquare = elementUnderMouse?.closest("[data-square-id]");

        const payload = {
          action: "drop",
          squareId: targetSquare.dataset.squareId,
        };
        this.$emit("cellAction", payload);
        this.drag.active = false;

        if (event.currentTarget.hasPointerCapture(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
        // тут emit drop
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.cell {
  position: relative;

  //   width: calc(100% / 8%)
  //   height: calc(100% / 8%);
  display: flex;
  justify-content: center;
  align-items: center;
  //   background-color: red;
  &.active-figure {
    background-color: rgba(64, 255, 0, 0.732) !important;
  }
  &.king-in-check {
    background-color: rgba(255, 0, 0, 0.732) !important;
  }
}
.custom-icon {
  /////////////////////
  font-size: 50px; /* Set your desired font size */
  stroke: black;
  stroke-width: 20px;
  paint-order: stroke;
}
.custom-icon-black {
  transform: rotate(180deg);
}
.promotion-black {
  transform: rotate(180deg);
  bottom: 0;
  position: absolute;
  left: 0;
  z-index: 10;
}
.promotion-white {
  //   transform: rotate(180deg);
  position: absolute;
  left: 0;
  top: 0;
  z-index: 10;
}

.cell-indication {
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 255, 68, 0.336);
}
.dragged-icon {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  pointer-events: none;
  background: transparent;
  font-size: 50px; /* Set your desired font size */
  stroke: black;
  stroke-width: 20px;
  paint-order: stroke;
}
.wrapper-icon {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
