<template>
  <div class="spinner" :class="{ 'spinner--white': white }">
    Carregando, aguarde...
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    white: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
