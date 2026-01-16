/**
 * MineAdmin is committed to providing solutions for quickly building web applications
 * Please view the LICENSE file that was distributed with this source code,
 * For the full copyright and license information.
 * Thank you very much for using MineAdmin.
 *
 * @Author X.Mo<root@imoi.cn>
 * @Link   https://github.com/mineadmin
 */
import type { RouteRecordRaw } from "vue-router";
import { useNProgress } from "@vueuse/integrations/useNProgress";
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import routes from "./static-routes/rootRoute.ts";
import "@/assets/styles/nprogress.scss";
import hasAuth from "@/utils/permission/hasAuth.ts";
import hasRole from "@/utils/permission/hasRole.ts";
import hasUser from "@/utils/permission/hasUser.ts";
import { isEmpty } from "radash";
import axios from "axios";
import { ElMessage, ElMessageBox } from "element-plus";

const { isLoading } = useNProgress();

const router = createRouter({
  history:
    import.meta.env.VITE_APP_ROUTE_MODE === "history"
      ? createWebHistory()
      : createWebHashHistory(),
  routes: routes as RouteRecordRaw[],
});

router.beforeEach(async (to, from, next) => {
  await versionCheck(to);
  const settingStore = useSettingStore();
  const userStore = useUserStore();
  isLoading.value = true;
  if (userStore.isLogin) {
    if (to.name === "login") {
      next({
        path: settingStore.getSettings("welcomePage").path,
        replace: true,
      });
    }
    if (userStore.getUserInfo() === null) {
      await userStore.requestUserInfo();
      next({ path: to.fullPath, query: to.query });
    } else {
      next();
    }
  } else {
    settingStore.getSettings("app").whiteRoute.includes(to.name as string)
      ? next()
      : next({ name: "login", query: { redirect: to.fullPath } });
  }
});

router.afterEach(async (to) => {
  isLoading.value = false;
  const keepAliveStore = useKeepAliveStore();
  const iframeKeepAliveStore = useIframeKeepAliveStore();

  if (!isEmpty(to.meta.auth) && !hasAuth(to.meta.auth as string[])) {
    await router.push({ path: "/403" });
    return;
  }

  if (!isEmpty(to.meta.role) && !hasRole(to.meta.role as string[])) {
    await router.push({ path: "/403" });
    return;
  }

  if (!isEmpty(to.meta.user) && !hasUser(to.meta.user as string[])) {
    await router.push({ path: "/403" });
    return;
  }

  if (to.meta.cache && to.meta.type !== "I") {
    const componentName = to.matched.at(-1)?.components?.default!.name;
    if (componentName) {
      keepAliveStore.add(componentName);
    } else {
      console.warn(
        `MineAdmin-UI：[${to.meta.title}] 组件页面未设置组件名，将不会被缓存`
      );
    }
  }

  if (to.meta.type === "I") {
    iframeKeepAliveStore.add(to.name);
  }
});

// 版本监控
const versionCheck = async (to) => {
  if (import.meta.env.VITE_APP_ENV === "development") return;
  const response = await axios.get("/version.json");
  console.log("response.data.version==", response.data.version);
  console.log("__APP_VERSION__==", __APP_VERSION__);
  //此处代码自己根据自己业务处理方式 这里使用Element UI控件做出对应选择
  if (__APP_VERSION__ !== response.data.version) {
    ElMessageBox.alert("📢 发现新的版本，请及时更新", "版本更新提示", {
      confirmButtonText: "立即更新",
      type: "info",
      center: true,
    }).then(() => {
      ElMessage({
        message: "版本更新中...",
        type: "info",
        duration: 0,
      });
      location.reload();
    });
  }
};

export default router;
