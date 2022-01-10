<template>
  <input ref="inputRef" type="text" />
</template>

<script>
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "MoneyInput",
  props: {
    modelValue: {
      type: Number,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        currency: "BRL",
        locale: "pt-BR",
        hideCurrencySymbolOnFocus: false,
        hideGroupingSeparatorOnFocus: false,
      }),
    },
  },
  methods: {
    focus() {
      this.$refs.inputRef.focus();
    },
  },
  setup(props) {
    const { inputRef } = useCurrencyInput(props.options);
    return { inputRef };
  },
};
</script>
