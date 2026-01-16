<script setup lang="ts">
import { computed, ref } from 'vue'

interface Props {
  successValue: number
  failureValue: number
  total?: number // 添加总值属性
  strokeWidth?: number
  successColor?: string
  failureColor?: string
  showText?: boolean
  textPosition?: 'inside' | 'outside'
}

const props = withDefaults(defineProps<Props>(), {
  total: 100, // 默认总值为100
  strokeWidth: 12,
  successColor: '#67c23a',
  failureColor: '#f56c6c',
  showText: true,
  textPosition: 'outside',
})

// 计算百分比（基于总值）
const successPercentage = computed(() =>
  props.total === 0 ? 0 : (props.successValue / props.total) * 100,
)

const failurePercentage = computed(() =>
  props.total === 0 ? 0 : (props.failureValue / props.total) * 100,
)

// 计算剩余百分比
const remainingPercentage = computed(() =>
  Math.max(100 - successPercentage.value - failurePercentage.value, 0),
)

// 悬停状态
const hoverSuccess = ref(false)
const hoverFailure = ref(false)
</script>

<template>
  <div class="dual-progress-container">
    <!-- 进度条主体 -->
    <div class="progress-bar" :style="{ height: `${strokeWidth}px` }">
      <!-- 成功部分 -->
      <div
        v-if="successPercentage > 0"
        class="progress-segment success-segment"
        :class="{ hovered: hoverSuccess }"
        :style="{
          width: `${successPercentage}%`,
          backgroundColor: successColor,
        }"
        @mouseover="hoverSuccess = true"
        @mouseout="hoverSuccess = false"
      >
        <span
          v-if="showText && textPosition === 'inside' && successPercentage >= 15"
          class="inside-text"
        >
          {{ successValue }}
        </span>
      </div>

      <!-- 失败部分 -->
      <div
        v-if="failurePercentage > 0"
        class="progress-segment failure-segment"
        :class="{ hovered: hoverFailure }"
        :style="{
          width: `${failurePercentage}%`,
          backgroundColor: failureColor,
        }"
        @mouseover="hoverFailure = true"
        @mouseout="hoverFailure = false"
      >
        <span
          v-if="showText && textPosition === 'inside' && failurePercentage >= 15"
          class="inside-text"
        >
          {{ failureValue }}
        </span>
      </div>

      <!-- 剩余部分（灰色背景） -->
      <div
        v-if="remainingPercentage > 0"
        class="progress-segment remaining-segment"
        :style="{
          width: `${remainingPercentage}%`,
          backgroundColor: '#ebeef5',
        }"
      />
    </div>

    <!-- 外部文本 -->
    <div v-if="showText && textPosition === 'outside'" class="progress-text">
      <span :style="{ color: successColor }">
        成功: {{ successValue }} ({{ Math.round(successPercentage) }}%)
      </span>
      <span :style="{ color: failureColor }">
        失败: {{ failureValue }} ({{ Math.round(failurePercentage) }}%)
      </span>
      <span>
        总计: {{ total }}
      </span>
    </div>
  </div>
</template>

<style scoped>
.dual-progress-container {
  width: 100%;
  padding: 4px 0;
}

.progress-bar {
  display: flex;
  width: 100%;
  border-radius: 100px;
  overflow: hidden;
  background-color: #ebeef5;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
}

.progress-segment {
  height: 100%;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 0 4px;
  box-sizing: border-box;
  position: relative;
}

.success-segment {
  border-radius: 100px 0 0 100px;
}

.failure-segment {
  border-radius: 0;
}

.remaining-segment {
  border-radius: 0 100px 100px 0;
}

.progress-segment.hovered {
  filter: brightness(1.2);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.inside-text {
  color: white;
  font-size: 10px;
  font-weight: bold;
  text-shadow: 0 0 2px rgba(0, 0, 0, 0.7);
  white-space: nowrap;
}

.progress-text {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 12px;
  line-height: 1.5;
  color: #606266;
}

.progress-text span {
  margin-right: 12px;
}
</style>
