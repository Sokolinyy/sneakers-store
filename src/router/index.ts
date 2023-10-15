import {
  createRouter,
  createWebHashHistory,
  type RouteRecordRaw,
} from "vue-router";
import HomeView from "../views/HomeView.vue";
import SneakerDetailsView from "../views/SneakerDetailsView.vue";
import CartView from "@/views/CartView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/sneaker/:id",
    name: "sneaker",
    component: SneakerDetailsView,
  },
  {
    path: "/cart",
    name: "cart",
    component: CartView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
