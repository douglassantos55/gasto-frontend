<template>
  <app-header />

  <main>
    <income :period="period" :expenses="expenses" />

    <template v-if="period.total !== null">
      <tabs label="Tipos despesas">
        <tab
          label="Despesas"
          :activated="this.type === 'normal'"
          @click="this.type = 'normal'"
        />
        <tab
          label="Emprestimos"
          :activated="this.type === 'emprestimo'"
          @click="this.type = 'emprestimo'"
        />
      </tabs>

      <expenses-list :expenses="filter()" />
    </template>

    <h3 class="text-center" v-else>
      Defina o valor para o periodo antes de cadastrar as despesas
    </h3>

    <app-button circle large primary class="btn--add">
      <span class="icofont-plus" />
    </app-button>

    <app-button circle large primary class="btn--loan">
      <span class="icofont-exchange" />
    </app-button>

    <router-view />
  </main>
</template>

<script>
import { reactive } from "vue";
import axios from "@/utils/axios";
import Tab from "@/components/Tab.vue";
import Tabs from "@/components/Tabs.vue";
import Income from "@/components/Income.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppButton from "@/components/AppButton.vue";
import ExpensesList from "@/components/ExpensesList.vue";

export default {
  name: "Home",
  components: {
    Tab,
    Tabs,
    Income,
    AppHeader,
    AppButton,
    ExpensesList,
  },
  data() {
    const cur = new Date();
    return {
      period: {
        total: null,
        month: cur.getMonth() + 1,
        year: cur.getFullYear(),
      },
      type: "normal",
      expenses: null,
    };
  },
  created() {
    this.fetch();
  },
  provide() {
    return {
      period: reactive(this.period),
    };
  },
  watch: {
    type: "fetch",
    period: {
      handler: "fetch",
      deep: true,
    },
  },
  methods: {
    filter() {
      return (
        this.expenses &&
        this.expenses.filter((expense) => expense.type === this.type)
      );
    },
    async fetch() {
      try {
        this.expenses = await axios.get(
          `/expenses?month=${this.period.month}&year=${this.period.year}`
        );
      } catch (err) {
        this.expenses = null;
      }
    },
  },
};
</script>
