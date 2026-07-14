<template>
  <div
    class="cell"
    :style="{ backgroundColor: squareData.colorCell }"
    @click="emitCellAction({ action: 'click', squareId: squareData.id })"
    :class="{
      'active-figure': activeFigureId === squareData.id,
      'king-in-check': currentTurn === squareData.colorFigure && squareData.nameFigure === 'king' && isKingInCheck,
    }"
  >
    <div class="cell-indication" v-show="squareData.indication"></div>

    <div draggable="true" v-if="squareData.nameFigure" @dragstart="startDrag($event, squareData)">
      <font-awesome-icon
        :icon="figureIcon"
        :class="rotateFigure"
        class="custom-icon"
        :style="{ color: squareData.colorFigure }"
      />
    </div>
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
    return {};
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
      if (this.playerColor === "white") {
        return "promotion-white";
      }
      if (this.playerColor === "black") {
        return "promotion-black";
      }
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
    emitCellAction(payload) {
      // console.log(action, squareId, "destruct");
      //     this.$emit('update:indicationMoves', !this.indicationMoves)

      this.$emit("cellAction", payload);
    },
    onDragOver(evt, id) {
      evt.preventDefault();
      // console.log(id, 'id')
    },
    startDrag(evt, figure) {
      if (figure.nameFigure) {
        evt.dataTransfer.dropEffect = "move";
        evt.dataTransfer.effectAllowed = "move";
        evt.dataTransfer.setData("dragId", figure.id);

        //     this.$emit('update:indicationMoves', true)
        this.$emit("dragId", figure.id, "dragEvent");
      }
    },
    onDrop(evt, dropId) {
      const dragId = evt.dataTransfer.getData("dragId");

      this.$emit("dropId", { dragId, dropId });
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
</style>
