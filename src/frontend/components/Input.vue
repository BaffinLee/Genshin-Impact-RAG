<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['enter'])
const value = ref('')

function submit() {
  emit('enter', value.value)
  value.value = ''
}
</script>

<template>
  <input
    placeholder="Chat With Genshin Impact"
    autofocus
    v-model="value"
    @keyup.enter="submit"
  />
</template>

<style scoped>
input {
  width: 100%;
  height: 52px;
  line-height: 24px;
  border-radius: 26px;
  outline: none;
  background-color: rgba(244,244,244,1);
  border: 0;
  padding: 0 30px;
  font-size: 18px;
  box-sizing: border-box;
}
</style>
