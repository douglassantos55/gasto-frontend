<template>
  <div class="expenses">
    <expense-item />
    <expense-item />
    <expense-item />
  </div>
</template>

<script>
import ExpenseItem from "@/components/ExpenseItem.vue";

export default {
  name: "ExpensesList",
  components: {
    ExpenseItem,
  },
};
</script>
