<template>
  <div class="expense">
    <div class="expense__info">
      <span class="expense__date">{{ formatter.date(expense.date) }}</span>
      <span class="expense__value">
        {{ formatter.currency(expense.total) }}
      </span>
      <p class="expense__description">{{ expense.description }}</p>
    </div>

    <div class="expense__actions" v-if="!expense.payment">
      <router-link
        custom
        v-slot="{ navigate, href }"
        :to="{ name: 'ExpenseDialog', params: { id: expense.id } }"
      >
        <app-button primary circle @click="navigate(href)">
          <span class="icofont-ui-edit" />
        </app-button>
      </router-link>

      <app-button danger circle @click="remove" :disabled="loading">
        <span class="icofont-bin" />
      </app-button>
    </div>

    <div class="payment" v-if="expense.payment">
      <span class="icofont-money" />
      <span class="payment__text">Recebido em</span>
      <span class="payment__date">
        {{ formatter.date(expense.payment.date) }}
      </span>
    </div>

    <div class="expense__actions" v-if="expense.type === 'pagamento'">
      <span class="icofont-check-alt" />
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import formatter from "@/utils/formatter";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "ExpenseItem",
  components: {
    AppButton,
  },
  inject: ["refresh"],
  props: {
    expense: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      formatter,
      loading: false,
    };
  },
  methods: {
    async remove() {
      try {
        this.loading = true;
        await axios.delete(`/expenses/${this.expense.id}`);
        this.refresh();
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
