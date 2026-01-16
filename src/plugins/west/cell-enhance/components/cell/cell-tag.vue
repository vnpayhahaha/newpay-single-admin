<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import type { MaProTableExpose } from "@mineadmin/pro-table";
import type { TableColumnRenderer } from "@mineadmin/table";
import { getDictionaryItem } from "../../utils/tools";
import type { Tag } from "../../types";

export interface dataItems {
  label: string;
  value: string | number;
  color?: string;
  code?: string;
  i18n?: string;
  i18n_scope?: string;
}

const { data, proxy, props } = defineProps<{
  data: TableColumnRenderer;
  proxy: MaProTableExpose;
  props?: {
    type?: string;
    props?: Tag;
    prop?: string | null;
    propItem?: string | null;
    dictName?: string | "";
    data?: Array<dataItems>;
    api?: () => Promise<any>;
    dataHandle?: (response: any) => Array<dataItems>;
  };
}>();

// 扩展颜色列表，包含更多Element UI颜色变种，主色放在最后
// 打乱顺序确保相邻颜色不同
const DEFAULT_COLORS = [
  { name: "navy-blue", value: "#337ecc" },
  { name: "forest-green", value: "#529b2d" },
  { name: "amber", value: "#b88230" },
  { name: "burgundy", value: "#c45656" },
  { name: "royal-purple", value: "#7d3c98" },
  { name: "deep-cyan", value: "#2e8f8a" },
  { name: "rust", value: "#d98b36" },
  { name: "raspberry", value: "#d87093" },
  { name: "charcoal", value: "#606266" },
  { name: "light-blue", value: "#79bbff" },
  { name: "mint-green", value: "#b3e19d" },
  { name: "golden-yellow", value: "#f0c78a" },
  { name: "coral", value: "#f9c7c7" },
  { name: "orchid", value: "#d3adf7" },
  { name: "aqua", value: "#70cbc4" },
  { name: "apricot", value: "#f8cda0" },
  { name: "rose", value: "#f7c6d7" },
  { name: "slate", value: "#c0c4cc" },
  { name: "sky-blue", value: "#a0cfff" },
  { name: "light-green", value: "#95d475" },
  { name: "light-yellow", value: "#eebe77" },
  { name: "light-red", value: "#f89898" },
  { name: "lavender", value: "#b27cc5" },
  { name: "teal", value: "#58d7d7" },
  { name: "peach", value: "#f5b171" },
  { name: "blush", value: "#f194b8" },
  { name: "silver", value: "#a6a9ad" },
  { name: "primary", value: "#409EFF" },
  { name: "success", value: "#67C23A" },
  { name: "warning", value: "#E6A23C" },
  { name: "danger", value: "#F56C6C" },
  { name: "info", value: "#909399" },
];

// 创建颜色别名映射
const COLOR_ALIAS_MAP: Record<string, string> = {};
DEFAULT_COLORS.forEach((color) => {
  COLOR_ALIAS_MAP[color.name] = color.value;
});

// 颜色计数器（用于顺序分配颜色）
let colorCounter = 0;

// 按顺序获取下一个颜色别名
function getNextColorAlias() {
  const alias = DEFAULT_COLORS[colorCounter % DEFAULT_COLORS.length].name;
  colorCounter++;
  return alias;
}

// 将颜色别名转换为实际颜色值
function resolveColor(color: string | undefined): string | undefined {
  if (!color) {
    return undefined;
  }
  return COLOR_ALIAS_MAP[color] || color;
}

// 计算颜色的亮度（0-1）
function calculateLuminance(color: string): number {
  // 如果是别名，先解析为实际颜色值
  const hex = resolveColor(color) || color;

  // 提取RGB分量
  let r = 0;
  let g = 0;
  let b = 0;
  if (hex.length === 4) {
    r = Number.parseInt(hex[1] + hex[1], 16);
    g = Number.parseInt(hex[2] + hex[2], 16);
    b = Number.parseInt(hex[3] + hex[3], 16);
  } else if (hex.length === 7) {
    r = Number.parseInt(hex.slice(1, 3), 16);
    g = Number.parseInt(hex.slice(3, 5), 16);
    b = Number.parseInt(hex.slice(5, 7), 16);
  }

  // 计算相对亮度（W3C标准）
  return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
}

const internalData = ref<Array<dataItems>>([]);
const isLoading = ref(false);

// 获取数据
async function fetchData() {
  if (!props?.api) {
    return;
  }

  try {
    isLoading.value = true;
    const response = await props.api();
    const handledData = props.dataHandle?.(response) || [];

    // 为API数据按顺序分配默认颜色别名
    internalData.value = handledData.map((item) => ({
      ...item,
      color: item.color || getNextColorAlias(),
    }));
  } catch (e) {
    console.error("Failed to fetch tag data:", e);
    internalData.value = [];
  } finally {
    isLoading.value = false;
  }
}

// 重置数据并重新获取
async function resetAndFetchData() {
  // 重置颜色计数器
  colorCounter = 0;

  if (props?.api) {
    fetchData();
  } else if (props?.data) {
    // 为静态数据按顺序分配默认颜色别名
    internalData.value = props.data.map((item) => ({
      ...item,
      color: item.color || getNextColorAlias(),
    }));
  }
}

onMounted(() => {
  resetAndFetchData(); // 初始化时获取数据
});

// 监听语言变化
watch(
  () => useUserStore().getLanguage(),
  () => {
    resetAndFetchData(); // 语言变化时重新获取数据
  }
);

const modelValue = computed(() => {
  return props?.prop 
    ? (props.propItem 
        ? data.row[props.prop]?.[props.propItem] ?? data.row[props.prop] 
        : data.row[props.prop]) 
    : null;
});

const isArrayField = computed(() => Array.isArray(modelValue.value));

// 合并数据源：API 数据 > 静态数据 > 字典
function getDataSource() {
  if (internalData.value.length > 0) {
    return internalData.value;
  }
  if (props?.data) {
    return props.data;
  }
  return [];
}

// 安全的字典标签获取
function safeGetLabel(key: string | number) {
  const dataSource = getDataSource();

  // 1. 优先从数据源查找
  if (dataSource.length > 0) {
    const item = dataSource.find((i) => String(i.value) === String(key));
    if (item) {
      return {
        ...item,
        color: resolveColor(item.color),
      };
    }
  }

  // 2. 从字典获取
  const dictItem = getDictionaryItem(props?.dictName || "", key);

  // 3. 构造默认项（使用字典颜色或默认颜色）
  return {
    label: dictItem?.label || String(key),
    value: key,
    color: resolveColor(dictItem?.color) || getNextColorAlias(),
  };
}

// 统一事件处理
function handleEvent(
  eventHandlers: Record<string, (...args: any[]) => void> = {}
) {
  const handlerMap = {};
  Object.keys(eventHandlers).forEach((event) => {
    handlerMap[event] = (...args: any[]) => {
      const rowData = data.row;
      eventHandlers[event](...args, rowData, proxy);
    };
  });
  return handlerMap;
}
</script>

<template>
  <!-- 加载状态 -->
  <div v-if="isLoading" class="py-2 text-center">
    <i class="el-icon-loading" />
  </div>

  <!-- 渲染数组类型 -->
  <div v-else-if="isArrayField" class="flex flex-wrap justify-center gap-10px">
    <el-tag
      v-for="(item, index) in modelValue"
      :key="index"
      :color="safeGetLabel(item).color"
      v-bind="props?.props || {}"
      :class="{
        'light-tag':
          calculateLuminance(safeGetLabel(item).color ?? 'primary') > 0.6,
      }"
      v-on="handleEvent(props?.props?.on)"
    >
      {{ safeGetLabel(item).label }}
    </el-tag>
  </div>

  <!-- 渲染非数组类型 -->
  <div v-else>
    <el-tag
      :color="safeGetLabel(modelValue).color"
      v-bind="props?.props"
      :class="{
        'light-tag':
          calculateLuminance(safeGetLabel(modelValue).color ?? 'primary') > 0.6,
      }"
      v-on="handleEvent(props?.props?.on)"
    >
      {{ safeGetLabel(modelValue).label }}
    </el-tag>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-tag) {
  border: none;
  margin: 2px;
  font-weight: bold;
  color: white; // 默认白色文字

  // 深色背景标签 - 白色文字带阴影
  &:not(.light-tag) {
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.3);
  }

  // 亮色背景标签 - 深色文字带浅色阴影
  &.light-tag {
    color: #333;
    text-shadow: 0 1px 1px rgba(255, 255, 255, 0.5);
    border: 1px solid rgba(0, 0, 0, 0.1); // 添加边框增加对比度
  }
}
</style>
