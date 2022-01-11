<template>
  <div class="overlay" @click.self="close">
    <div tabindex="0" role="dialog" aria-modal="true" class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">{{ title }}</h2>

        <app-button hollow @click="close">
          <span class="icofont-close-line" />
        </app-button>
      </div>

      <div class="dialog__content">
        <slot />
      </div>

      <div class="dialog__footer">
        <app-button hollow rounded @click="close">{{ cancel }}</app-button>
        <slot name="actions" />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "AppDialog",
  components: {
    AppButton,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    cancel: {
      type: String,
      default: "Cancelar",
    },
  },
  methods: {
    close() {
      this.$router.back();
    },
  },
};
</script>
