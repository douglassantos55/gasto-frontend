<template>
  <input ref="inputRef" type="text" />
</template>

<script>
import { watch } from "vue";
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: "MoneyInput",
  props: {
    modelValue: {
      type: [Number, null],
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
    const { inputRef, setValue } = useCurrencyInput(props.options);
    watch(
      () => props.modelValue,
      (value) => setValue(value)
    );

    return { inputRef };
  },
};
</script>
