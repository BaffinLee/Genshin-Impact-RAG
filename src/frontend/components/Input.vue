<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps(['useContext'])
const emit = defineEmits(['enter', 'check'])
const value = ref('')

function submit() {
  emit('enter', value.value)
  value.value = ''
}
</script>

<template>
  <div>
    <input
      type="checkbox"
      id="checkbox"
      :checked="props.useContext"
      @change="$emit('check')"
    />
    <label for="checkbox">Use Context</label>
  </div>
  <input
    class="input"
    placeholder="Chat With Genshin Impact"
    autofocus
    v-model="value"
    @keyup.enter="submit"
  />
</template>

<style scoped lang="less">
.input {
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

div {
  text-align: right;
  margin-bottom: 10px;
  color: #999;
  padding-right: 20px;
}
</style>
