<script setup lang="ts">
import { defineEmits, defineProps, ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, required: true },
  name: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])

// 使用 ref 来维护本地状态
const inputValue = ref(props.modelValue)

// 当 props.modelValue 变化时同步到本地 inputValue
watch(() => props.modelValue, (newVal) => {
  inputValue.value = newVal
})

// 当本地输入变化时，通知父组件更新
function updateValue(value: string) {
  inputValue.value = value
  emit('update:modelValue', value)
}
</script>

<template>
  <el-input
    v-model="inputValue"
    :placeholder="`请输入${props.name}`"
    clearable
    @update:model-value="updateValue"
  >
    <template #prefix>
      <div>{{ props.name }}</div>
    </template>
  </el-input>
</template>
