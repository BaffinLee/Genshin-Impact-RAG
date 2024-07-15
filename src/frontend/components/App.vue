<script setup lang="ts">
import { ref } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Input from './Input.vue'
import axios from 'axios'

const messages = ref<{
  type: 'user' | 'system';
  content: string;
  contexts?: string[];
}[]>([]);

function handleEnter(value: string) {
  const index = messages.value.length
  messages.value.push({
    type: 'user',
    content: value,
  })
  axios.post('/chat/api/chat', {
    question: value,
  }).then((res) => {
    messages.value[index].contexts = []
    messages.value.push({
      type: 'system',
      content: res.data,
    })
  })
}
</script>

<template>
  <div class="app">
    <Header />
    <Input @enter="handleEnter" />
    <Footer />
  </div>
</template>

<style scoped>
.app {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
