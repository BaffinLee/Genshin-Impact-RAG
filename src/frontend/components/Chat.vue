<script setup lang="ts">
import Logo from '../asserts/paimen.png'

export interface Message {
  type: 'user' | 'system';
  content: string;
  contexts?: string[];
}

const props = defineProps<{ messages: Message[] }>()
</script>

<template>
  <ul>
    <li
      v-for="(item, index) in props.messages" :key="index"
      :class="item.type"
    >
      <div>
        <img :src="Logo" alt="logo" v-if="item.type === 'system'" />
        <p class="content" v-html="item.content" />
      </div>
    </li>
  </ul>
</template>

<style scoped lang="less">
ul {
  list-style: none;
  margin: 0;
  padding: 60px 0 20px 0;
  min-height: calc(100vh - 148px);
  box-sizing: border-box;
}

li {
  display: flex;
  padding: 18px 20px;

  div {
    display: flex;
  }

  &.user {
    justify-content: end;

    div {
      background-color: rgba(244,244,244,1);
      border-radius: 22px;
      width: fit-content;
    }
  }

  .content {
    padding: 10px 20px;
    margin: 0;
    color: #0d0d0d;
    line-height: 28px;

    > :first-child {
      margin-top: 0;
    }
  }
}

img {
  width: 36px;
  height: 36px;
  border-radius: 18px;
  margin-top: 6px;
}
</style>
