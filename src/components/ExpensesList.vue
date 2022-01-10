<template>
  <loading v-if="!expenses" />

  <p v-else-if="expenses.length === 0">Nenhuma despesa cadastrada.</p>

  <div class="expenses" v-else>
    <expense-item
      v-for="expense in expenses"
      :key="expense.id"
      :expense="expense"
    />
  </div>
</template>

<script>
import Loading from "@/components/Loading.vue";
import ExpenseItem from "@/components/ExpenseItem.vue";

export default {
  name: "ExpensesList",
  components: {
    Loading,
    ExpenseItem,
  },
  props: {
    expenses: {
      type: Array,
      required: false,
    },
  },
};
</script>
