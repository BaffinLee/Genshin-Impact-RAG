<script setup lang="ts">
import Logo from '../asserts/paimen.png'
import Write from '../asserts/write.svg?component'
import Flight from '../asserts/flight.svg?component'
import Bulb from '../asserts/bulb.svg?component'
import Academic from '../asserts/academic.svg?component'
</script>

<template>
  <header>
    <img :src="Logo" alt="logo" />
    <ul>
      <li>
        <Write />
        <span>Text inviting friend to wedding</span>
      </li>
      <li>
        <Bulb />
        <span>Text inviting friend to wedding</span>
      </li>
      <li>
        <Flight />
        <span>Text inviting friend to wedding</span>
      </li>
      <li>
        <Academic />
        <span>Text inviting friend to wedding</span>
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
  margin-bottom: calc(100vh - 600px);
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
