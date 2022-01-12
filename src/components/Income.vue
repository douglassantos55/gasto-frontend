<template>
  <div class="income">
    <div class="income__header">
      <div class="income__info">
        <p class="income__period">
          {{ formatter.period(period) }}
        </p>

        <p class="income__income" v-if="!edit">
          {{ formatter.currency(period.total) }}
        </p>

        <money-input ref="input" v-model="income" @keydown="save" v-else />
      </div>

      <div class="income__actions">
        <app-button circle :primary="!edit" :secondary="edit">
          <span
            @click="toggleEdit"
            :class="{ 'icofont-ui-settings': !edit, 'icofont-check-alt': edit }"
          />
        </app-button>

        <link-button :to="{ name: 'PeriodDialog' }" circle primary>
          <span class="icofont-calendar" />
        </link-button>
      </div>
    </div>

    <div class="income__totals">
      <div class="income__total">
        <span class="income__label">Despesas</span>
        <span class="income__value income__value--danger">
          {{ formatter.currency(totalExpenses) }}
        </span>
      </div>

      <div class="income__total">
        <span class="income__label">Emprestimos</span>
        <span class="income__value income__value--warning">
          {{ formatter.currency(totalLoans) }}
        </span>
      </div>

      <div class="income__total">
        <span class="income__label">Balanco</span>
        <span class="income__value income__value--success">
          {{ formatter.currency(balance) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import formatter from "@/utils/formatter";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";
import MoneyInput from "@/components/MoneyInput.vue";

export default {
  name: "Income",
  components: {
    MoneyInput,
    AppButton,
    LinkButton,
  },
  inject: ["period"],
  props: {
    expenses: {
      type: Array,
      required: false,
    },
    debts: {
      type: Array,
      required: false,
    },
  },
  data() {
    return {
      formatter,
      edit: false,
      income: this.period.total,
    };
  },
  created() {
    this.fetch();
  },
  watch: {
    period: {
      deep: true,
      handler: "fetch",
    },
    "period.total"(total) {
      this.income = total;
    },
  },
  computed: {
    totalExpenses() {
      if (!this.expenses) {
        return null;
      }
      return this.expenses
        .filter((expense) => !expense.payment)
        .reduce((total, expense) => {
          return total + expense.total;
        }, 0);
    },
    totalLoans() {
      if (!this.debts) {
        return null;
      }
      return this.debts.reduce((total, debt) => {
        return total + debt.total;
      }, 0);
    },
    balance() {
      return this.period.total - this.totalExpenses;
    },
  },
  methods: {
    async fetch() {
      try {
        const period = await axios.get(
          `/limits?month=${this.period.month}&year=${this.period.year}`
        );

        this.period.total = period.total;
      } catch (err) {
        this.period.total = null;
      }
    },
    async save(evt) {
      if (evt.key === "Enter") {
        this.toggleEdit();
      }
    },
    async toggleEdit() {
      if (this.edit) {
        // $refs.input should always be visible here
        if (this.income != this.period.total) {
          const period = await axios.put("/limits", {
            ...this.period,
            total: this.income,
          });

          this.period.total = period.total;
          this.edit = false;
        } else {
          this.edit = false;
        }
      } else {
        this.edit = !this.edit;

        this.$nextTick(() => {
          if (this.$refs.input) {
            this.$refs.input.focus();
          }
        });
      }
    },
  },
};
</script>
