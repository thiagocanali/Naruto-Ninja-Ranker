import { createRouter, createWebHistory } from "vue-router";

import Home from "@/views/Home.vue";
import Ranking from "@/views/Ranking.vue";
import Missions from "@/views/Missions.vue";
import Battle from "@/views/Battle.vue";
import World from "@/views/World.vue";
import Boss from "@/views/Boss.vue";
import TeamBuilder from "@/views/TeamBuilder.vue";
import Skills from "@/views/Skills.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: Home },
    { path: "/ranking", component: Ranking },
    { path: "/missions", component: Missions },
    { path: "/battle", component: Battle },
    { path: "/world", component: World },
    { path: "/boss", component: Boss },
    { path: "/team", component: TeamBuilder },
    { path: "/skills", component: Skills },
  ],
});

export default router;
