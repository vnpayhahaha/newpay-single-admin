<script setup lang="ts">
import type { MaProTableExpose } from '@mineadmin/pro-table'
import type { TableColumnRenderer } from '@mineadmin/table'
import type { AvatarGroup } from '../../types'

const { data, proxy, props: componentProps } = defineProps<{
  data: TableColumnRenderer
  proxy: MaProTableExpose
  props?: {
    type?: string
    props?: AvatarGroup
    prop?: string | null
  }
}>()

const errorMessage = ref<string>()

// 强化数据验证逻辑
const avatarList = computed(() => {
  const propPath = componentProps?.prop
  const rawData = propPath ? data.row[propPath] : null
  if (!Array.isArray(rawData)) {
    return []
  }
  // 过滤无效项并限制最大长度
  return rawData.filter(item => !!item?.trim())
})

// 合并显示计算
const displayState = computed(() => {
  const maxVisible = componentProps?.props?.maxCount || avatarList.value.length
  return {
    visible: avatarList.value.slice(0, maxVisible), // 显示的数据数组
    omitted: avatarList.value.slice(maxVisible), // 省略的数据数组
    total: avatarList.value.length, // 总数量
    hiddenCount: avatarList.value.slice(maxVisible).length, // 隐藏数据的数量
    maxVisible, // 最大显示数量
  }
})

// 监听 avatarList 的变化并处理副作用
watch(avatarList, (newValue) => {
  console.log(newValue)
  const propPath = componentProps?.prop
  if (!Array.isArray(newValue) || newValue.length === 0) {
    errorMessage.value = propPath
      ? '数据非数组类型'
      : '未指定数据源字段'
  }
  else {
    errorMessage.value = ''
  }
}, { immediate: true })
</script>

<template>
  <div class="nm-avatar-group">
    <!-- 如果有错误信息，显示错误 -->
    <div v-if="errorMessage" class="text-3 text-red">
      {{ errorMessage }}
    </div>

    <!-- 显示头像 根据maxCount参数来显示 -->
    <template v-for="(item, index) in displayState.visible" :key="`avatar-${index}`">
      <el-avatar
        class="nm-avatar-circle"
        :style="{ marginLeft: '-10px', zIndex: displayState.maxVisible - index }"
        :src="item"
        v-bind="props?.props"
      />
    </template>

    <!-- 如果有省略头像，显示 +X -->
    <el-popover
      v-if="displayState.hiddenCount > 0"
      placement="top"
      trigger="click"
      :popper-style="{ textAlign: 'center' }"
    >
      <template #reference>
        <el-avatar
          class="nm-avatar-circle"
          :style="{ marginLeft: '-10px', zIndex: 0 }"
          v-bind="props?.props"
        >
          +{{ displayState.hiddenCount }}
        </el-avatar>
      </template>
      <!-- 展示剩余的头像 -->
      <div class="relative">
        <div class="ml-4px flex flex-wrap">
          <template v-for="(item, index) in displayState.omitted" :key="`omitted-avatar-${index}`">
            <el-avatar
              class="nm-avatar-circle"
              :style="{ marginLeft: '-10px', zIndex: displayState.maxVisible - index }"
              :src="item"
              v-bind="props?.props"
            />
          </template>
        </div>
      </div>
    </el-popover>
  </div>
</template>

<style scoped lang="scss">
.nm-avatar-group {
  display: inline-block;
  line-height: 0;
}

.nm-avatar-circle {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  width: 40px;
  height: 40px;
  color: var(--el-color-primary);
  background-color: var(--el-border-color-lighter);
  border: 2px solid var(--el-avatar-text-color);
  font-family: OC-OPPOSans, sans-serif;
  font-size: 14px;
  font-weight: bold;
  white-space: nowrap;
  vertical-align: middle;
}
</style>
