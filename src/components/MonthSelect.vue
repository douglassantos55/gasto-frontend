<template>
      <select :value="modelValue" @change="$emit('update:modelValue', $event.target.value)">
        <option value="" v-if="placeholder">{{ placeholder }}</option>
        <option v-for="i in 12" :key="i" :value="i">{{ months[i] }}</option>
      </select>
</template>

<script>
export default {
  name: "MonthSelect",
  emits: ["update:modelValue"],
  props: {
      placeholder: {
          type: String,
          required: false,
      },
      modelValue: {
          type: [Number, String],
          required: true,
      },
  },
  data() {
    const months = {
      1: "Janeiro",
      2: "Fevereiro",
      3: "Março",
      4: "Abril",
      5: "Maio",
      6: "Junho",
      7: "Julho",
      8: "Agosto",
      9: "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
    };

    return { months };
  },
};
</script>
