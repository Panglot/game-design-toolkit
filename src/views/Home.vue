<template>
  <div class="home">
    <div>
      <img alt="Vue logo" src="../assets/logo.png" class="vue-logo" />
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
      filter: sepia(30%) opacity(90%);
      box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
      
      &:hover {
        transform: translatey(0px);
        animation: float 6s ease-in-out infinite;
        img { width: 100%; height: auto; }
      }
    }
  }
}
</style>
