<script setup lang="ts">
import { ref } from 'vue'
import Header from './Header.vue'
import Footer from './Footer.vue'
import Input from './Input.vue'
import Chat, { Message } from './Chat.vue'
import axios from 'axios'
import { parse } from 'marked';

const messages = ref<Message[]>([]);
const useContext = ref(true)

function handleEnter(value: string) {
  const index = messages.value.length
  messages.value.push({
    type: 'user',
    content: value,
  })
  axios.post('/chat/api/chat', {
    question: value,
    useContext: useContext.value,
  }).then((res) => {
    messages.value[index].contexts = res.data.contexts
    messages.value.push({
      type: 'system',
      content: parse(res.data.response) as string,
    })
  })
}
</script>

<template>
  <div class="app">
    <Header
      v-if="!messages.length"
      @select="handleEnter"
    />
    <Chat
      :messages="messages"
      v-if="messages.length"
    />
    <Input
      @enter="handleEnter"
      @check="useContext = !useContext"
      :use-context="useContext"
    />
    <Footer />
  </div>
</template>

<style scoped lang="less">
.app {
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
}
</style>
