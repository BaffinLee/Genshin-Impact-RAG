<script setup lang="ts">
import Github from '../asserts/github.svg?component'
</script>

<template>
  <footer>
    <a href="https://github.com/BaffinLee/Genshin-Impact-RAG" target="_blank">
      <Github />
    </a>
  </footer>
</template>

<style scoped lang="less">
footer {
  display: flex;
  justify-content: center;
  padding: 14px 0;

  a {
    color: #dddddd;
    transition: all 0.1s ease;

    &:hover {
      color: #a0a0a0;
    }

    &:active {
      color: #666;
    }
  }
}
</style>
