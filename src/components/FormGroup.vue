<template>
  <div class="form-group">
    <slot />

    <p class="error" v-for="(error, idx) in errors" :key="idx">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: "FormGroup",
  props: {
    errors: {
      type: Array,
      required: false,
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
  padding-top: 5px;
  padding-left: 5px;
}
</style>
