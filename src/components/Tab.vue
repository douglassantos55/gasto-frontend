<template>
  <button
    role="tab"
    type="button"
    class="tabs__tab"
    :class="{ 'tabs__tab--active': activated }"
  >
    {{ label }}
  </button>
</template>

<script>
export default {
  name: "Tab",
  props: {
    label: {
      type: String,
      required: true,
    },
    activated: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
