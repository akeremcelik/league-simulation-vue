<template>
  <button type="button"
          class="mt-3 text-white bg-blue-700 p-2 rounded-lg"
          :class="['text-'+textColor, 'bg-'+backgroundColor]"
          :disabled="disabled"
          @click="$emit('click')">
    {{ text }}
  </button>
</template>

<script setup>
  const props = defineProps(['text', 'textColor', 'backgroundColor', 'disabled'])
  const emits = defineEmits(['click'])
</script>

<style scoped>

</style>