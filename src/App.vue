
<template>
  <div class="container">
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>
<script setup lang="ts">
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0;

  .content {
    display: flex;
    flex: auto;
    background-color: #1C2022;
  }
}
</style>
