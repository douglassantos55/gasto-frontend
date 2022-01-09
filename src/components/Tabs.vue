<template>
  <div class="tabs" role="tablist" :aria-label="label">
    <slot />
  </div>
</template>

<script>
export default {
  name: "Tabs",
  props: {
    label: {
      type: String,
      required: true,
    },
  },
};
</script>
