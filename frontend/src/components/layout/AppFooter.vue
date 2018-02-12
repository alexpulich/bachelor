<template>
  <footer class="footer">
    <div class="container">
      <p class="text-center text-muted">
        <slot></slot>
      </p>
    </div>
  </footer>
</template>

<script>
  export default {
    name: 'AppFooter',
  }
</script>

<style scoped>
  .footer {
    height: 60px;
    line-height: 60px;
  }
</style>
