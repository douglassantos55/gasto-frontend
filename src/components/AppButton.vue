<template>
  <button
    :type="type"
    :class="{
      btn: true,
      'btn--large': large,
      'btn--primary': primary,
      'btn--circle': circle,
      'btn--hollow': hollow,
      'btn--danger': danger,
    }"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: "AppButton",
  props: {
    type: {
      type: String,
      default: "button",
    },
    circle: {
      type: Boolean,
      default: false,
    },
    hollow: {
      type: Boolean,
      default: false,
    },
    large: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
