import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import router from "./router";

import "./assets/reset.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import {
  faChessRook,
  faChessPawn,
  faChessKnight,
  faChessBishop,
  faChessQueen,
  faChessKing,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faChessRook,
  faChessPawn,
  faChessKnight,
  faChessBishop,
  faChessQueen,
  faChessKing,
);

createApp(App)
  .use(createPinia())
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)

  .mount("#app");
