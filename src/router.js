import { createRouter, createWebHistory } from "vue-router";
import axios from "axios"
import HomePage from "./pages/HomePage.vue";
// import NotFound from "./pages/NotFound.vue";
// import AxiosPage from "./pages/AxiosPage.vue";
// import LoginPage from "./pages/LoginPage.vue";
// import CityPage from "./pages/CityPage.vue";
// import CountryPage from "./pages/CountryPage.vue";
// import CountryNamePage from "./pages/CountryNamePage.vue";
// import LogoutPage from "./pages/LogoutPage.vue";
// import WritePage from "./pages/WritePage.vue";
// import ShowPage from "./pages/ShowPage.vue";
import ZLogin from "./pages/ZLoginPage.vue";
// import Signup from "./pages/SignupPage.vue";
import ZTextPost from "./pages/ZTextPage.vue";
import ZAllText from "./pages/ZAllTextPage.vue";
import ZTextDetail from "./pages/ZTextDetailPage.vue";
import ZTextEdit from "./pages/ZTextEditPage.vue";
import ZUser from "./pages/ZUserPage.vue";

const routes = [
  { path: "/", name: "home", component: HomePage, meta: { isPublic: true } },
  { path: "/zlogin", name: "zlogin", component: ZLogin, meta: { isPublic: true } },
  { path: "/ZText/post", name: "ztextPost", component: ZTextPost},
  { path: "/ZAllText", name: "zalltext", component: ZAllText, meta: { isPublic: true } },
  { path: "/ztext/edit/:id", name: "ztextEdit", component: ZTextEdit},
  { path: "/ztext/:id", name: "ztext", component: ZTextDetail, meta: { isPublic: true } },
  { path: "/ZUser/:id", name: "zuser", component: ZUser},
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to) => {
  if (localStorage.getItem("user_id") === null) {
    if (to.meta.isPublic) {
      return true;
    }
    return "/Zlogin";
  }
  return true;
});

export default router;
