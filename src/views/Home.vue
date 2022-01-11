<template>
  <app-header :user="user" />

  <main>
    <income :period="period" :debts="debts" :expenses="expenses" />

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

      <expenses-list :expenses="items" />
    </template>

    <h3 class="text-center" v-else>
      Defina o valor para o periodo antes de cadastrar as despesas
    </h3>

    <router-link
      custom
      v-slot="{ navigate, href }"
      :to="{ name: 'ExpenseDialog' }"
    >
      <app-button circle large primary class="btn--add" @click="navigate(href)">
        <span class="icofont-plus" />
      </app-button>
    </router-link>

    <router-link
      custom
      v-slot="{ navigate, href }"
      :to="{ name: 'ExpenseDialog', query: { type: 'emprestimo' } }"
    >
      <app-button
        circle
        large
        primary
        class="btn--loan"
        @click="navigate(href)"
      >
        <span class="icofont-exchange" />
      </app-button>
    </router-link>

    <router-view />
  </main>
</template>

<script>
import axios from "@/utils/axios";
import Tab from "@/components/Tab.vue";
import Tabs from "@/components/Tabs.vue";
import Income from "@/components/Income.vue";
import AppHeader from "@/components/AppHeader.vue";
import AppButton from "@/components/AppButton.vue";
import ExpensesList from "@/components/ExpensesList.vue";

export default {
  name: "Home",
  inheritAttrs: false,
  components: {
    Tab,
    Tabs,
    Income,
    AppHeader,
    AppButton,
    ExpensesList,
  },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  beforeRouteEnter(to) {
    return axios
      .get("/auth/user")
      .then((user) => {
        to.params.user = user;
      })
      .catch(() => ({ name: "Login" }));
  },
  beforeRouteUpdate(to, from) {
    to.params = { ...to.params, user: from.params.user };
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
      debts: null,
    };
  },
  created() {
    this.fetch();
  },
  provide() {
    return {
      user: this.user,
      period: this.period,
      refresh: this.fetch,
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
    async fetch() {
      try {
        this.expenses = await axios.get(
          `/expenses?month=${this.period.month}&year=${this.period.year}`
        );

        this.debts = await axios.get(
          `/expenses/debts?month=${this.period.month}&year=${this.period.year}`
        );
      } catch (err) {
        this.debts = null;
        this.expenses = null;
      }
    },
  },
  computed: {
    items() {
      if (this.type === "normal") {
        return this.expenses;
      }
      return this.debts;
    },
  },
};
</script>
