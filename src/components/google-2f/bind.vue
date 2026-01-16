<!-- src/components/google-2f/bind.vue -->
<i18n lang="yaml">
en:
  title: Bind Google Authenticator
  secretKey: Google Secret Key
  copy: Click to copy
  copySuccess: Key copied to clipboard
  copyFailed: Copy failed, please copy manually
  code: Google Verification Code
  codePlaceholder: Please enter Google verification code
  submit: Bind
  cancel: Cancel
  getSuccess: Get success
  getFailed: Failed to get secret key
  getQrFailed: Failed to get QR code
  bindSuccess: Binding successful
  bindFailed: Binding failed
  requestError: Request error, please try again!
zh_CN:
  title: 绑定双因素认证
  secretKey: 双因素认证密钥
  copy: 点击复制
  copySuccess: 密钥已复制到剪贴板
  copyFailed: 复制失败，请手动复制
  code: 双因素认证验证码
  codePlaceholder: 请输入双因素认证验证码
  submit: 去绑定
  cancel: 取消
  getSuccess: 获取成功
  getFailed: 获取密钥失败
  getQrFailed: 获取二维码失败
  bindSuccess: 绑定成功
  bindFailed: 绑定失败
  requestError: 请求异常，请重试！
zh_TW:
  title: 綁定Google驗證碼
  secretKey: Google金鑰
  copy: 點擊複製
  copySuccess: 金鑰已複製到剪貼簿
  copyFailed: 複製失敗，請手動複製
  code: Google驗證碼
  codePlaceholder: 請輸入Google驗證碼
  submit: 去綁定
  cancel: 取消
  getSuccess: 獲取成功
  getFailed: 獲取金鑰失敗
  getQrFailed: 獲取二維碼失敗
  bindSuccess: 綁定成功
  bindFailed: 綁定失敗
  requestError: 請求異常，請重試！
</i18n>

<script setup lang="ts">
import { defineEmits, defineProps, onMounted, reactive, ref } from "vue";
import { generate, getQRCode } from "~/base/api/google2f";
import { useMessage } from "@/hooks/useMessage";
import { bindGoogleSecretKey } from "~/base/api/user";
import { useLocalTrans } from "@/hooks/useLocalTrans";

const props = defineProps({
  isBind: Boolean,
});

const emit = defineEmits(["bind"]);

// 引入 useLocalTrans
const t = useLocalTrans();
const userStore = useUserStore();
const google_secret_key = ref("");
const google_code = ref("");
const googleQrCodeBase64 = ref("");
const visible = ref(false);
const isVerifying = ref(false);
const msg = useMessage();

// 使用响应式用户信息
const userInfo = ref({ ...userStore.getUserInfo() });

async function getGoogleSecretKey() {
  try {
    const response = await generate();
    if (response.success && response.data) {
      google_secret_key.value = response.data.secret;
      msg.success(t("getSuccess"));
      await getGoogleQRCode();
    } else {
      msg.error(response.message || t("getFailed"));
    }
  } catch (error) {
    msg.error(t("requestError"));
  }
}

async function getGoogleQRCode() {
  if (!google_secret_key.value) {
    return;
  }

  try {
    const response = await getQRCode(google_secret_key.value);
    if (response.success && response.data) {
      googleQrCodeBase64.value = response.data.qr_code;
    } else {
      msg.error(response.message || t("getQrFailed"));
    }
  } catch (error) {
    msg.error(t("requestError"));
  }
}

async function handleBeforeOk() {
  isVerifying.value = true;
  try {
    const result = await handleBindGoogleTwoFa();
    emit("bind", result);
    visible.value = false;
    return result;
  } finally {
    isVerifying.value = false;
  }
}

async function handleBindGoogleTwoFa() {
  // 修复：创建普通对象而不是直接使用响应式对象
  const userInfoData = {
    google_secret: google_secret_key.value,
    is_bind_google: 1,
    code: google_code.value,
  };

  try {
    const response = await bindGoogleSecretKey(userInfoData); // 传递普通对象
    if (response.success) {
      msg.success(response.message || t("bindSuccess"));
      // 更新 store 中的用户信息
      userStore.setUserInfo({
        ...userStore.getUserInfo(),
        google_secret: google_secret_key.value,
        is_bind_google: true,
      });
      return true;
    }

    msg.error(response.message || t("bindFailed"));
    return false;
  } catch (error) {
    console.error(error);
    msg.error(t("requestError"));
    return false;
  }
}

function handleCancel() {
  visible.value = false;
}

function open() {
  getGoogleSecretKey();
  visible.value = true;
}

onMounted(() => {
  // getGoogleSecretKey()
});

// 确保正确暴露方法
defineExpose({
  open,
  close: handleCancel,
});

const isCopying = ref(false);

async function copySecretKey() {
  isCopying.value = true;
  try {
    // 使用 Clipboard API 复制文本
    await navigator.clipboard.writeText(google_secret_key.value);
    msg.success(t("copySuccess"));
  } catch (err) {
    // Fallback 方案：创建临时 input 元素
    const textarea = document.createElement("textarea");
    textarea.value = google_secret_key.value;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      msg.success(t("copySuccess"));
    } catch (e) {
      msg.error(t("copyFailed"));
    }
    document.body.removeChild(textarea);
  } finally {
    isCopying.value = false;
  }
}
</script>

<!-- 模板部分保持不变 -->
<template>
  <el-dialog
    :model-value="visible"
    :title="t('title')"
    :close-on-click-modal="false"
    :before-close="handleCancel"
  >
    <el-form class="mt-3 w-full" :model="userInfo">
      <el-form-item :label="t('secretKey')" label-width="180px">
        <el-tooltip :content="t('copy')">
          <el-tag type="primary" class="cursor-pointer" @click="copySecretKey">
            {{ google_secret_key }}
          </el-tag>
        </el-tooltip>
      </el-form-item>
      <el-form-item>
        <div class="box">
          <div class="box-bg">
            <el-image
              :src="googleQrCodeBase64"
              style="width: 200px; height: 200px"
            />
          </div>
        </div>
      </el-form-item>
      <el-form-item :label="t('code')" prop="code" label-width="180px">
        <el-input
          v-model="google_code"
          :placeholder="t('codePlaceholder')"
          maxlength="6"
          :clearable="true"
          @keyup.enter="handleBeforeOk"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleCancel">
        {{ t("cancel") }}
      </el-button>
      <el-button type="primary" :loading="isVerifying" @click="handleBeforeOk">
        {{ t("submit") }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped>
/* 确保父容器有足够空间 */
.el-form-item .box-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 220px; /* 给一个最小高度确保居中 */
}

.box {
  position: relative;
  width: 200px;
  height: 200px;
  border: 1px solid #1f87b5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  margin: 0 auto; /* 水平居中 */
}

.box-bg {
  width: 100%;
  height: 100%;
  background-image: linear-gradient(to right, #e3e3e3 1px, transparent 1px),
    linear-gradient(to bottom, #ededed 1px, transparent 1px);
  background-size: 10px 10px;
}

.box::after {
  content: "";
  position: absolute;
  top: 0;
  width: 100%;
  height: 3px;
  background-color: #0443e3;
  margin-top: 0px;
  animation: bganimation 2s infinite;
  box-shadow: -21px 0px 26px 5px #0f40ba;
}

@keyframes bganimation {
  0% {
    margin-top: 0;
  }
  100% {
    margin-top: 100%;
  }
}
</style>
