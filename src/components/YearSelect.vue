<template>
  <select
    :value="modelValue"
    @change="$emit('update:modelValue', $event.target.value)"
  >
    <option value="" v-if="placeholder">{{ placeholder }}</option>
    <option v-for="i in 5" :key="i" :value="year - (i - 1)">
      {{ year - (i - 1) }}
    </option>
  </select>
</template>

<script>
export default {
  name: "YearSelect",
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
    const year = new Date().getFullYear();
    return { year };
  },
};
</script>
