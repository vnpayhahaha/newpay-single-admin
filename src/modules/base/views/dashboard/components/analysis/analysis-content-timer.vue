<script setup lang="tsx">
import type { CallbackDataParams } from "echarts/types/dist/shared";
import { useColorMode } from "@vueuse/core";
import { useEcharts } from "@/hooks/useEcharts.ts";
import {
  successOrderHourToday,
  successOrderHourWeek,
  successOrderHourYesterday,
} from "~/base/api/analysis.ts";
import { watch } from "vue";

const i18n = useTrans() as TransType;
const t = i18n.globalTrans;

const dater = ref<string>("today");
const xAxis = ref<string[]>([]);
const collectionChartsData = ref<number[]>([]);
const disbursementChartsData = ref<number[]>([]);
const echarts = ref<HTMLDivElement | null>(null);

const isDark = useColorMode();

export interface ToolTipFormatterParams extends CallbackDataParams {
  axisDim: string;
  axisIndex: number;
  axisType: string;
  axisId: string;
  axisValue: string;
  axisValueLabel: string;
}

// 监听日期变化，动态加载数据
watch(
  dater,
  async (newDate) => {
    try {
      let response;
      switch (newDate) {
        case "today":
          response = await successOrderHourToday();
          break;
        case "yesterday":
          response = await successOrderHourYesterday();
          break;
        case "week":
          response = await successOrderHourWeek();
          break;
        default:
          response = await successOrderHourToday();
      }

      // 根据实际API响应结构调整数据处理逻辑
      if (response && response.data) {
        const data = response.data;
        xAxis.value = data.xAxis || [];

        // 查找collection和disbursement数据系列
        if (data.data) {
          data.data.forEach((series: any) => {
            if (series.name === "collection") {
              collectionChartsData.value = series.value || [];
            } else if (series.name === "disbursement") {
              disbursementChartsData.value = series.value || [];
            }
          });
        }
      }
    } catch (error) {
      console.error("Failed to load chart data:", error);
    }
  },
  { immediate: true }
);

function tooltipItemsRender(items: ToolTipFormatterParams[]) {
  return items
    .map(
      (el) =>
        `<div class="content-panel">
      <p>
        <span style="background-color: ${
          el.color
        }" class="tooltip-item-icon"></span>
      <span>
        ${el.seriesName}
      </span>
    </p>
    <span class="tooltip-value">
      ${Number(el.value).toLocaleString()}
    </span>
  </div>`
    )
    .join("");
}

const options = computed(() => {
  return {
    grid: {
      left: "40",
      right: 0,
      top: "20",
      bottom: "100",
    },
    legend: {
      bottom: 0,
      icon: "circle",
      textStyle: {
        color: "#4E5969",
      },
    },
    xAxis: {
      type: "category",
      data: xAxis.value,
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: isDark.value === "dark" ? "#3f3f3f" : "#A9AEB8",
        },
      },
      axisTick: {
        show: true,
        alignWithLabel: true,
        lineStyle: {
          color: "#86909C",
        },
        interval(idx: number) {
          if (idx === 0) {
            return false;
          }
          return idx !== xAxis.value.length - 1;
        },
      },
      axisLabel: {
        color: "#86909C",
        formatter(value: number, idx: number) {
          if (idx === 0) {
            return "";
          }
          if (idx === xAxis.value.length - 1) {
            return "";
          }
          return `${value}`;
        },
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        color: "#86909C",
        formatter: "{value}",
      },
      splitLine: {
        lineStyle: {
          color: isDark.value === "dark" ? "#3F3F3F" : "#E5E6EB",
        },
      },
    },
    tooltip: {
      show: true,
      trigger: "axis",
      formatter(params) {
        const [firstElement] = params as ToolTipFormatterParams[];
        return `<div>
            <p class="tooltip-title">${firstElement.axisValueLabel}</p>
            ${tooltipItemsRender(params as ToolTipFormatterParams[])}
          </div>`;
      },
      className: "echarts-tooltip-diy",
    },
    series: [
      {
        name: t("analysis.collection_order"),
        data: collectionChartsData.value,
        type: "line",
        smooth: true,
        showSymbol: false,
        color: isDark.value === "dark" ? "#3D72F6" : "#246EFF",
        symbol: "circle",
        symbolSize: 10,
        emphasis: {
          focus: "series",
          itemStyle: {
            borderWidth: 2,
            borderColor: "#E0E3FF",
          },
        },
      },
      {
        name: t("analysis.disbursement_order"),
        data: disbursementChartsData.value,
        type: "line",
        smooth: true,
        showSymbol: false,
        color: isDark.value === "dark" ? "#A079DC" : "#00B2FF",
        symbol: "circle",
        symbolSize: 10,
        emphasis: {
          focus: "series",
          itemStyle: {
            borderWidth: 2,
            borderColor: "#E2F2FF",
          },
        },
      },
    ],
    dataZoom: [
      {
        bottom: 40,
        type: "slider",
        left: 40,
        right: 14,
        height: 14,
        borderColor: "transparent",
        handleIcon:
          "image://http://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/1ee5a8c6142b2bcf47d2a9f084096447.svg~tplv-49unhts6dw-image.image",
        handleSize: "20",
        handleStyle: {
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowBlur: 4,
        },
        brushSelect: false,
        backgroundColor: isDark.value === "dark" ? "#313132" : "#F2F3F5",
      },
      {
        type: "inside",
        start: 0,
        end: 100,
        zoomOnMouseWheel: false,
      },
    ],
  };
});

const { setOption } = useEcharts(echarts);

// 监听数据变化并更新图表
watch(
  [xAxis, collectionChartsData, disbursementChartsData],
  () => {
    setOption(options.value);
  },
  { deep: true }
);
</script>

<template>
  <div class="mine-card">
    <div class="flex items-center justify-between text-base">
      <div>{{ t("analysis.success_order_line") }}</div>
      <div class="w-240px">
        <m-tabs
          v-model="dater"
          class="h-7 w-full text-sm"
          :options="[
            { label: t('analysis.one_week'), value: 'week' },
            { label: t('analysis.yesterday'), value: 'yesterday' },
            { label: t('analysis.today'), value: 'today' },
          ]"
        />
      </div>
    </div>
    <div ref="echarts" class="mt-5 h-500px" />
  </div>
</template>

<style scoped lang="scss"></style>
