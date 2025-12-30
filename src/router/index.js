import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Ranking from "../views/Ranking.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: Home },
    { path: "/ranking", component: Ranking }
  ]
});
