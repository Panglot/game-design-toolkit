<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" />
    </div>
    <div class="preview">
        <img src="../assets/battle-of-littledom.png" alt="">
    </div>
  </div>
</template>

<script>
export default {
  name: 'home'
};
</script>
<style lang="scss">
.home {
  text-align: center;
  .preview {
    margin-top: 5rem;
    img {
      filter: drop-shadow(8px 8px 10px gray) sepia(30%) opacity(90%);
    }
  }
}
</style>
