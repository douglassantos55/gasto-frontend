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
      <app-button
        circle
        large
        primary
        class="btn--add"
        :class="{ hidden: hideButtons }"
        @click="navigate(href)"
      >
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
        :class="{ hidden: hideButtons }"
        @click="navigate(href)"
      >
        <span class="icofont-exchange" />
      </app-button>
    </router-link>

    <router-view />
  </main>

  <div class="loader" v-if="loading">
    <loading />
  </div>
</template>

<script>
import axios from "@/utils/axios";
import Tab from "@/components/Tab.vue";
import Tabs from "@/components/Tabs.vue";
import Income from "@/components/Income.vue";
import Loading from "@/components/Loading.vue";
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
    Loading,
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
      loading: true,
      type: "normal",
      expenses: null,
      debts: null,
      lastScrollTop: 0,
      hideButtons: false,
    };
  },
  created() {
    this.fetch();

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
      loading: this.loading,
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
    toggleButtons() {
      var st = window.pageYOffset || document.documentElement.scrollTop;

      if (st > this.lastScrollTop) {
        this.hideButtons = true;
      } else {
        this.hideButtons = false;
      }

      this.lastScrollTop = st <= 0 ? 0 : st;
    },
    async fetch() {
      try {
        this.loading = true;
        this.debts = await axios.get("/expenses/debts");

        this.expenses = await axios.get(
          `/expenses?month=${this.period.month}&year=${this.period.year}`
        );
      } catch (err) {
        this.debts = null;
        this.expenses = null;
      } finally {
        this.loading = false;
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

<style>
.loader {
  top: 0;
  left: 0;
  width: 100vw;
  display: flex;
  height: 100vh;
  position: fixed;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
}
</style>
