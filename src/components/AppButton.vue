<template>
  <button
    :type="type"
    :class="{
      btn: true,
      'btn--small': small,
      'btn--large': large,
      'btn--primary': primary,
      'btn--secondary': secondary,
      'btn--circle': circle,
      'btn--hollow': hollow,
      'btn--danger': danger,
      'btn--rounded': rounded,
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
    small: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    primary: {
      type: Boolean,
      default: false,
    },
    secondary: {
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
