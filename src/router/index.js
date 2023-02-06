import Vue from "vue";
import store from "@/store";
import VueRouter from "vue-router";
import Client from "../views/Client.vue";
import Admin from "../views/Admin.vue";
import AdminLogin from "../components/admin/AdminLogin.vue";
import ControlPanel from "../components/admin/ControlPanel.vue";
import Dashboard from "../components/admin/Dashboard.vue";
import IngredientCategories from "../components/admin/IngredientCategories.vue";
import Ingredients from "../components/admin/Ingredients.vue";
import Recipes from "../components/admin/Recipes.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Client,
  },
  {
    path: "/admin/",
    component: Admin,
    children: [
      {
        path: "login",
        component: AdminLogin,
      },
      {
        path: "",
        component: ControlPanel,
        children: [
          {
            path: "",
            component: IngredientCategories,
          },
          {
            path: "ingredients",
            component: Ingredients,
          },
          {
            path: "recipes",
            component: Recipes,
          },
        ],
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.state.adminGlobal.token;

  if (
    to.path.includes("/admin") &&
    isAuthenticated == null &&
    to.path !== "/admin/login"
  ) {
    next({ path: "/admin/login" });
  } else next();

  if (to.path.includes("/admin/login") && isAuthenticated != null) {
    next({ path: "/admin" });
  } else next();
});

export default router;
