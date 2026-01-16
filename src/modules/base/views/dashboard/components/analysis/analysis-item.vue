<!--
 - MineAdmin is committed to providing solutions for quickly building web applications
 - Please view the LICENSE file that was distributed with this source code,
 - For the full copyright and license information.
 - Thank you very much for using MineAdmin.
 -
 - @Author X.Mo<root@imoi.cn>
 - @Link   https://github.com/mineadmin
-->
<script lang="ts" setup>
import { useEcharts } from "@/hooks/useEcharts.ts";
import {
  collectionOrderNum,
  collectionSuccessfulAmount,
  collectionSuccessfulNum,
  collectionSuccessfulRate,
  disbursementOrderNum,
  disbursementSuccessfulAmount,
  disbursementSuccessfulNum,
  disbursementSuccessfulRate,
} from "~/base/api/analysis.ts";
import type { countVo } from "~/base/api/analysis.ts";

const props = withDefaults(
  defineProps<{
    name: string;
    title: string;
    chartType: string;
    unit: string;
  }>(),
  {
    name: "collection_order_num",
    title: "",
    chartType: "line",
    unit: "",
  }
);

const i18n = useTrans() as TransType;
const t = i18n.globalTrans;

// 定义API映射
const apiMap: Record<string, () => Promise<any>> = {
  collection_order_num: collectionOrderNum,
  disbursement_order_num: disbursementOrderNum,
  collection_successful_num: collectionSuccessfulNum,
  disbursement_successful_num: disbursementSuccessfulNum,
  collection_successful_amount: collectionSuccessfulAmount,
  disbursement_successful_amount: disbursementSuccessfulAmount,
  collection_successful_rate: collectionSuccessfulRate,
  disbursement_successful_rate: disbursementSuccessfulRate,
};

const renderData = ref<countVo>({
  count: 0,
  yesterday: 0,
  growth: 0,
  chartData: [],
});

const chartOption = ref({});

const ele = ref();
const { setOption } = useEcharts(ele);

// 获取数据
async function fetchData() {
  if (apiMap[props.name]) {
    try {
      const res = await apiMap[props.name]();
      renderData.value = res.data;
      updateChart();
    } catch (error) {
      console.error("获取数据失败:", error);
    }
  }
}

// 更新图表
function updateChart() {
  const lineData: any[] = [];
  const barData = ref([]);
  const pieData = ref([]);

  // 获取所有唯一的系列名称
  const seriesNames = Array.from(
    new Set(renderData.value.chartData.map((item) => item.name))
  );

  if (props.chartType === "bar") {
    renderData.value.chartData.forEach((el, idx) => {
      barData.value.push({
        value: el.y,
        itemStyle: {
          color: idx % 2 ? "#2CAB40" : "#86DF6C",
        },
      });
    });

    chartOption.value = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow",
        },
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: renderData.value.chartData.map((item) => item.x),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
        axisLabel: {
          color: "#999",
        },
      },
      series: [
        {
          type: "bar",
          data: barData.value,
          barWidth: 20,
          itemStyle: {
            borderRadius: 2,
          },
        },
      ],
    };
  } else if (props.chartType === "line") {
    // 为每个系列创建数据数组
    const seriesData: Record<string, any[]> = {};
    seriesNames.forEach((name) => {
      seriesData[name] = [];
    });

    // 将数据按系列分组
    renderData.value.chartData.forEach((el) => {
      if (!seriesData[el.name]) {
        seriesData[el.name] = [];
      }
      seriesData[el.name].push(el.y);
    });

    // 构建系列配置
    const series = seriesNames.map((name, index) => {
      const colors = ["#86DF6C", "#2CAB40", "#5B8FF9", "#5AD8A6"];
      return {
        name,
        type: "line",
        data: seriesData[name],
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 2,
          color: colors[index % colors.length],
        },
      };
    });

    chartOption.value = {
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "0%",
        right: "0%",
        bottom: "0%",
        top: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: renderData.value.chartData
          .filter(
            (_, index) =>
              index < renderData.value.chartData.length / seriesNames.length
          )
          .map((item) => item.x),
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          color: "#999",
        },
      },
      yAxis: {
        type: "value",
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: true,
          lineStyle: {
            type: "dashed",
          },
        },
        axisLabel: {
          color: "#999",
        },
      },
      series,
    };
  } else {
    renderData.value.chartData.forEach((el) => {
      pieData.value.push(el);
    });

    chartOption.value = {
      tooltip: {
        trigger: "item",
      },
      series: [
        {
          type: "pie",
          radius: ["40%", "70%"],
          center: ["50%", "50%"],
          data: pieData.value,
          label: {
            show: false,
          },
          labelLine: {
            show: false,
          },
        },
      ],
    };
  }

  setOption(chartOption.value);
}

// 组件挂载后获取数据
onMounted(() => {
  fetchData();
});

// 监听name变化，重新获取数据
watch(
  () => props.name,
  () => {
    fetchData();
  }
);
</script>

<template>
  <div class="mine-layout">
    <div class="content-wrap">
      <div class="content">
        <el-statistic :value="renderData.count">
          <template #title>
            <div class="text-base">
              {{ props.title }}
            </div>
          </template>
        </el-statistic>
        <div class="desc mt-2">
          <div class="text-sm">
            {{ t("analysis.compared_to_yesterday") }}
          </div>
          <div
            class="flex items-center"
            :class="renderData.growth >= 0 ? 'text-red-5' : 'text-green-5'"
          >
            {{ renderData.growth }}{{ props.unit }}
            <ma-svg-icon
              :name="
                renderData.growth >= 0
                  ? 'ic:baseline-arrow-upward'
                  : 'ic:baseline-arrow-downward'
              "
            />
          </div>
        </div>
      </div>
      <div class="chart">
        <div ref="ele" class="h-[100px]" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-wrap {
  @apply flex rounded mt-5 p-3 bg-[rgb(var(--ui-primary)/5%)] dark-bg-[rgb(var(--ui-primary)/10%)]
  gap-x-3 items-center;

  .chart {
    @apply w-[calc(100%-100px)];
  }
}
</style>
