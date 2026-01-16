<script setup lang="ts">
import { getComponentByRender, resolveLabel } from '$/west/nm-search/utils/tools.ts'

defineOptions({ name: 'SearchFormItem' })

const props = defineProps<{
  item: {
    prop: string
    label: string | (() => string)
    render?: ((modelValue: any) => any) | { // 允许对象类型
      component: string // 组件名称
      props?: Record<string, any> // 组件属性
    }
    renderProps?: Record<string, any>
  }
  hideLabel?: boolean
  render?: ((modelValue: any) => any) | null
}>()

const modelValue = defineModel<any>()
</script>

<template>
  <el-form-item
    :prop="item.prop"
    :label="props.hideLabel ? undefined : resolveLabel(props.item.label)"
    class="nm-search-form-item"
  >
    <!-- 根据 render 或 item.render 渲染组件 -->
    <component
      :is="getComponentByRender(props.item.render)"
      v-model="modelValue"
      :name="resolveLabel(props.item.label)"
      v-bind="props.item.renderProps"
    />
  </el-form-item>
</template>
