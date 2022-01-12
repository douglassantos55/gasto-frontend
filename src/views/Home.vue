<template>
  <app-header />

  <main>
    <search-filter v-if="searching" />

    <income :period="period" :debts="debts" :expenses="expenses" v-else />

    <template v-if="period.total !== null || searching">
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

    <link-button
      circle
      large
      primary
      :to="{ name: 'ExpenseDialog' }"
      class="btn--add"
      :class="{ hidden: hideButtons }"
    >
      <span class="icofont-plus" />
    </link-button>

    <link-button
      circle
      large
      primary
      class="btn--loan"
      :class="{ hidden: hideButtons }"
      :to="{ name: 'ExpenseDialog', query: { type: 'emprestimo' } }"
    >
      <span class="icofont-exchange" />
    </link-button>

    <router-view />
  </main>
</template>

<script>
import axios from "@/utils/axios";
import Tab from "@/components/Tab.vue";
import Tabs from "@/components/Tabs.vue";
import Income from "@/components/Income.vue";
import AppHeader from "@/components/AppHeader.vue";
import LinkButton from "@/components/LinkButton.vue";
import ExpensesList from "@/components/ExpensesList.vue";
import SearchFilter from "@/components/SearchFilter.vue";

export default {
  name: "Home",
  inheritAttrs: false,
  components: {
    Tab,
    Tabs,
    Income,
    AppHeader,
    LinkButton,
    ExpensesList,
    SearchFilter,
  },
  async beforeRouteEnter(_to, _from, next) {
    try {
      const user = await axios.get("/auth/user");
      next((vm) => vm.$store.dispatch("setUser", user));
    } catch (err) {
      next({ name: "Login" });
    }
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
      lastScrollTop: 0,
      hideButtons: false,
    };
  },
  created() {
    this.search(this.$route.query);

    // TODO: create composable for debouncing and using it for searching
    function debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          func.apply(this, args);
        }, timeout);
      };
    }

    window.addEventListener(
      "scroll",
      debounce(this.toggleButtons.bind(this), 50),
      false
    );
  },
  provide() {
    return {
      period: this.period,
      refresh: this.fetch,
    };
  },
  watch: {
    "$route.query": "search",
    "period.month": "fetch",
    "period.year": "fetch",
  },
  methods: {
    search(query, previous) {
      if (query && query.term) {
        this.fetch({
          description: query.term,
          month: query.month,
          year: query.year,
        });
      } else if (!previous || previous.term) {
        // if had term, it was cleared, so fetch again
        this.fetch();
      }
    },
    toggleButtons() {
      var st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > this.lastScrollTop) {
        this.hideButtons = true;
      } else {
        this.hideButtons = false;
      }

      this.lastScrollTop = st <= 0 ? 0 : st;
    },
    async fetch(filters) {
      try {
        // TODO: create a composable for loading?
        this.$store.dispatch("loading");
        let params = { month: this.period.month, year: this.period.year };

        if (filters && filters.description) {
          params = { ...filters };
        }

        this.expenses = await axios.get("/expenses", { params });

        this.debts = await axios.get("/expenses/debts", {
          params: { description: params.description },
        });
      } catch (err) {
        this.debts = null;
        this.expenses = null;
      } finally {
        this.$store.dispatch("stopLoading");
      }
    },
  },
  computed: {
    searching() {
      return !!this.$route.query.term;
    },
    items() {
      if (this.type === "normal") {
        return this.expenses;
      }
      return this.debts;
    },
  },
};
</script>
