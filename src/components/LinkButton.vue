<template>
  <router-link :to="to" custom v-slot="{ navigate, href }">
    <app-button v-bind="$attrs" @click="navigate(href)">
      <slot />
    </app-button>
  </router-link>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "LinkButton",
  components: {
    AppButton,
  },
  props: {
    to: {
      type: [String, Object],
      required: true,
    },
  },
};
</script>
