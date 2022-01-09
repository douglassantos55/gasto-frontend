<template>
  <income />

  <tabs label="Tipos despesas">
    <tab label="Despesas" activated @click="fetch('normal')" />
    <tab label="Emprestimos" @click="fetch('emprestimo')" />
  </tabs>

  <expenses-list />

  <app-button circle large primary class="btn--add">
    <span class="icofont-plus" />
  </app-button>

  <app-button circle large primary class="btn--loan">
    <span class="icofont-exchange" />
  </app-button>
</template>

<script>
import Tab from "@/components/Tab.vue";
import Tabs from "@/components/Tabs.vue";
import Income from "@/components/Income.vue";
import AppButton from "@/components/AppButton.vue";
import ExpensesList from "@/components/ExpensesList.vue";

export default {
  name: "Home",
  components: {
    Tab,
    Tabs,
    Income,
    AppButton,
    ExpensesList,
  },
  methods: {
    fetch(type) {
      console.log(type);
    },
  },
};
</script>
