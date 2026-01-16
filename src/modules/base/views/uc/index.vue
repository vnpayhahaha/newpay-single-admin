<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<i18n lang="yaml">
en:
  profile: Profile
  setting: Account setting
  changeAvatar: Change avatar
  removeAvatar: Remove avatar
  changeProfileOrPassword: Modify profile or password
  explain: Explain
  action: Action
  whetherReceiveMsg: Whether receive message
  whetherMultiDeviceLogin: Whether multi-device login
  whetherGoogle2FactorAuth: Whether to enable two-factor authentication
  isTwoTactorAuthenticationBound: Is two-factor authentication bound
  google_bind:
    bind: Bind Google Verification
    unbind: Unbound
    binded: Bound
    reBind: Rebind
  enable: Enable
  disable: Disable
  bind_message:
    bind_success: Binding successful
    bind_fail: Binding failed
    unbind_success: Unbinding successful
    unbind_fail: Unbinding failed
  userinfo:
    nickname: Nick name
    username: Account
    avatar: Avatar
    signed: Signed
    email: Email
    phone: Phone
    loginIp: Login ip
    loginTime: Login Datetime
zh_CN:
  profile: 个人资料
  setting: 账号设置
  changeAvatar: 修改头像
  removeAvatar: 移除头像
  changeProfileOrPassword: 修改个人信息或密码
  explain: 说明
  action: 动作
  whetherReceiveMsg: 是否接收消息
  whetherMultiDeviceLogin: 是否多设备登录
  whetherGoogle2FactorAuth: 是否开启双因素认证
  isTwoTactorAuthenticationBound: 是否绑定Google双因素认证
  google_bind:
    bind: 绑定Google双因素认证
    unbind: 未绑定
    binded: 已绑定
    reBind: 重新绑定
  enable: 开启
  disable: 关闭
  bind_message:
    bind_success: 绑定成功
    bind_fail: 绑定失败
    unbind_success: 解绑成功
    unbind_fail: 解绑失败
  userinfo:
    nickname: 昵称
    username: 账号
    avatar: 头像
    signed: 个人签名
    email: 邮箱
    phone: 手机
    loginIp: 登录IP
    loginTime: 登录时间
zh_TW:
  profile: 個人資料
  setting: 賬號設置
  changeAvatar: 修改頭像
  removeAvatar: 移除頭像
  changeProfileOrPassword: 修改個人資料或密碼
  explain: 説明
  action: 動作
  whetherReceiveMsg: 是否接受消息
  whetherMultiDeviceLogin: 是否多設備登錄
  whetherGoogle2FactorAuth: 是否谷歌兩步認證
  isTwoTactorAuthenticationBound: 是否绑定谷歌兩步認證
  google_bind:
    bind: 绑定 Google 验证
    unbind: 未绑定
    binded: 已绑定
    reBind: 重新绑定
  enable: 开启
  disable: 关闭
  bind_message:
    bind_success: 绑定成功
    bind_fail: 绑定失败
    unbind_success: 解绑成功
    unbind_fail: 解绑失败
  userinfo:
    nickname: 昵稱
    username: 賬號
    avatar: 頭像
    signed: 個人簽名
    email: 郵箱
    phone: 手機
    loginIp: 登錄IP
    loginTime: 登錄時間
</i18n>

<script setup lang="ts">
import { useLocalTrans } from "@/hooks/useLocalTrans";
import UcContainer from "./components/container.vue";
import UcModifyInfo from "./components/modify-info.vue";
import UcTitle from "./components/title.vue";
import { useMessage } from "@/hooks/useMessage.ts";
import Google2fBind from "@/components/google-2f/bind.vue";
import Google2f from "@/components/google-2f/index.vue";
import { google2FaStatus } from "~/base/api/user";

const modalRef = ref();
const selected = ref("profile");
const userStore = useUserStore();
const userInfo = computed(() => userStore.getUserInfo());
const tabOptions = reactive([
  { label: useLocalTrans("profile"), value: "profile" },
  { label: useLocalTrans("setting"), value: "setting" },
]);

const msg = useMessage();
const google2fBindRef = ref<InstanceType<typeof Google2fBind> | null>(null);
// 在 setup 顶层调用 useLocalTrans
const t = useLocalTrans();
// 打开绑定 Google 2FA 弹窗
function openGoogle2fBind() {
  if (
    google2fBindRef.value &&
    typeof google2fBindRef.value.open === "function"
  ) {
    google2fBindRef.value.open();
  } else {
    console.error("Google2fBind component is not properly initialized");
    msg.error("组件初始化失败，请刷新页面重试");
  }
}

// 处理绑定结果
function handleBind(result: boolean) {
  console.log("handleBind", result);
  if (result) {
    msg.success(t("bind_message.bind_success"));
  } else {
    msg.error(t("bind_message.bind_fail"));
  }
}
const form = reactive({
  isReceiveMsg: true,
  multiDeviceLogin: false,
  isGoogle2FactorAuth: userInfo.value.is_enabled_google,
});

const avatar = ref<string>(userStore.getUserInfo().avatar);

const showFields = reactive({
  nickname: useLocalTrans("userinfo.nickname"),
  username: useLocalTrans("userinfo.username"),
  signed: useLocalTrans("userinfo.signed"),
  email: useLocalTrans("userinfo.email"),
  phone: useLocalTrans("userinfo.phone"),
  login_ip: useLocalTrans("userinfo.loginIp"),
  login_time: useLocalTrans("userinfo.loginTime"),
});

watch(avatar, async (val: string | undefined) => {
  const response: any = await useHttp().post("/admin/permission/update", {
    avatar: val ?? "",
  });
  if (response.code === 200) {
    msg.success(t("crud.updateSuccess"));
    userStore.getUserInfo().avatar = val ?? "";
  }
});

function changeGoogle2FaStatus() {
  const cur_status = userInfo.value.is_enabled_google;
  google2FaStatus(!cur_status).then((response) => {
    if (response.code === 200) {
      msg.success(t("crud.updateSuccess"));
      // 更新 store 中的用户信息
      userStore.setUserInfo({
        ...userStore.getUserInfo(),
        is_enabled_google: !cur_status,
      });
    }
  });
}
const showGoogle2FaRef = ref();
function handleBindGoogleTwoFa(newStatus) {
  // 引入 谷歌两步验证组件
  showGoogle2FaRef.value.open();
}

function handleGoogleTwoFaIsPass(isPass: boolean) {
  console.log("handleGoogleTwoFaIsPass", isPass);
  if (!isPass) {
    form.isGoogle2FactorAuth = !form.isGoogle2FactorAuth;
  } else {
    changeGoogle2FaStatus();
  }
}
</script>

<template>
  <UcContainer>
    <UcTitle>
      <template #extra>
        <m-button class="h-8" @click="() => modalRef.openModal()">
          {{ useLocalTrans("changeProfileOrPassword") }}
        </m-button>
      </template>
    </UcTitle>
    <div class="mine-uc-layout-content">
      <div class="w-full">
        <m-tabs
          v-model="selected"
          class="text-sm lg:w-6/12"
          :options="tabOptions"
        />
        <ul v-if="selected === 'profile'" class="info-list">
          <li class="!b-none">
            <div class="desc-item">
              <div class="desc-label">
                {{ useLocalTrans("userinfo.avatar") }}
              </div>
              <div class="desc-value">
                <ma-upload-image v-model="avatar" />
              </div>
            </div>
          </li>
          <template v-for="(value, key) in userStore.getUserInfo()">
            <li v-if="showFields[key]">
              <div class="desc-item">
                <div class="desc-label">
                  {{ showFields[key] }}
                </div>
                <div class="desc-value">
                  {{ value ?? "-" }}
                </div>
              </div>
            </li>
          </template>
        </ul>

        <ul
          v-if="selected === 'setting'"
          class="info-list b-1 b-gray-2 rounded b-solid dark-b-dark-4"
        >
          <li class="bg-gray-1 !b-none dark-bg-dark-5">
            <div class="desc-item">
              <div class="desc-label font-bold">
                {{ useLocalTrans("explain") }}
              </div>
              <div class="desc-value font-bold">
                {{ useLocalTrans("action") }}
              </div>
            </div>
          </li>
          <!-- <li>
            <div class="desc-item">
              <div class="desc-label">
                {{ useLocalTrans("whetherReceiveMsg") }}
              </div>
              <div class="desc-value">
                <m-switch v-model="form.isReceiveMsg" />
              </div>
            </div>
          </li>
          <li>
            <div class="desc-item">
              <div class="desc-label">
                {{ useLocalTrans("whetherMultiDeviceLogin") }}
              </div>
              <div class="desc-value">
                <m-switch v-model="form.multiDeviceLogin" />
              </div>
            </div>
          </li> -->
          <li>
            <div class="desc-item">
              <div class="desc-label">
                {{ useLocalTrans("isTwoTactorAuthenticationBound") }}
              </div>
              <div class="desc-value">
                <el-button
                  type="primary"
                  class="ml-4"
                  :disabled="userInfo.is_bind_google"
                  @click="openGoogle2fBind"
                >
                  {{
                    userInfo.is_bind_google
                      ? t("google_bind.binded")
                      : t("google_bind.bind")
                  }}
                </el-button>
              </div>
            </div>
          </li>
          <li>
            <div class="desc-item">
              <div class="desc-label">
                {{ useLocalTrans("whetherGoogle2FactorAuth") }}
              </div>
              <div class="desc-value">
                <el-switch
                  v-model="form.isGoogle2FactorAuth"
                  :disabled="!userInfo.is_bind_google"
                  :active-text="t('enable')"
                  :inactive-text="t('disable')"
                  @change="handleBindGoogleTwoFa"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>

    <UcModifyInfo ref="modalRef" />
    <!-- Google 2FA 绑定弹窗 -->
    <Google2fBind
      ref="google2fBindRef"
      :is-bind="userInfo.is_bind_google"
      @bind="handleBind"
    />
    <Google2f ref="showGoogle2FaRef" @pass="handleGoogleTwoFaIsPass" />
  </UcContainer>
</template>

<style scoped lang="scss">
.info-list {
  @apply w-full mt-3;

  & li {
    @apply b-t-1 b-t-gray-2 b-t-solid pr-2.5 dark-b-t-dark-4 py-4 text-sm hover-bg-gray-50 dark-hover-bg-dark-5;

    .desc-item {
      @apply w-full lg:w-6/12 flex items-center justify-between text-stone-8 dark-text-stone-3;

      .desc-label {
        @apply w-6/12 lg:w-5/12 pl-2 lg:pl-3 truncate;
      }

      .desc-value {
        @apply w-6/12 lg:w-7/12 text-left truncate;
      }
    }
  }
}
</style>
