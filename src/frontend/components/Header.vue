<script setup lang="ts">
import Logo from '../asserts/paimen.png'
import Write from '../asserts/write.svg?component'
import Flight from '../asserts/flight.svg?component'
import Bulb from '../asserts/bulb.svg?component'
import Academic from '../asserts/academic.svg?component'
import { ref } from 'vue'

const list = ref([
  {
    icon: Write,
    text: '希格雯（Sigewinne）配队推荐',
  },
  {
    icon: Bulb,
    text: '克洛琳德（Clorinde）外号',
  },
  {
    icon: Flight,
    text: '「千织屋」的老板，枫丹著名服装设计师',
  },
  {
    icon: Academic,
    text: '帮我选一个蒸发队打深渊',
  },
]);
</script>

<template>
  <header>
    <img :src="Logo" alt="logo" />
    <ul>
      <li
        v-for="(item, index) in list"
        :key="index"
        @click="$emit('select', item.text)"
      >
        <component :is="item.icon" />
        <span>{{ item.text }}</span>
      </li>
    </ul>
  </header>
</template>

<style scoped lang="less">
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 200px;
  margin-bottom: calc(100vh - 630px);
}

img {
  width: 100px;
  height: 100px;
  user-select: none;
}

ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 60px 20px 20px 20px;
}

li {
  display: flex;
  flex-direction: column;
  margin-right: 20px;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid #eee;
  cursor: pointer;
  color: rgba(103,103,103, 1);
  user-select: none;
  transition: all 0.2s ease;
  font-size: 15px;
  line-height: 22px;
  flex: 1 1 0;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    background-color: #f9f9f9;
  }

  &:active {
    background-color: #ececec;
  }

  svg {
    margin-bottom: 10px;
  }
}
</style>
