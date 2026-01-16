<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true },
  name: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])

// 使用 ref 创建内部状态，避免直接修改 props
const localValue = ref(props.modelValue)

// 当 props.modelValue 变化时同步到 localValue
watch(() => props.modelValue, (newVal) => {
  localValue.value = newVal
})

function updateValue(value: string) {
  localValue.value = value
  emit('update:modelValue', value)
}
</script>

<template>
  <el-date-picker
    v-model="localValue"
    :placeholder="`请选择${name}`"
    @update:model-value="updateValue"
  />
</template>
