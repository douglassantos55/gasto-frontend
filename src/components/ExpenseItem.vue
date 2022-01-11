<template>
  <div class="expense">
    <div class="expense__info">
      <span class="expense__date">{{ formatter.date(expense.date) }}</span>
      <span class="expense__value">
        {{ formatter.currency(expense.total) }}
      </span>
      <p class="expense__description">{{ expense.description }}</p>

      <user
        :size="25"
        :user="expense.friend"
        v-if="!isDebt && expense.friend"
      />
      <user :size="25" :user="expense.user" v-if="isDebt && expense.user" />
    </div>

    <div class="expense__actions">
      <template v-if="canEdit">
        <router-link
          custom
          v-slot="{ navigate, href }"
          :to="{
            name: 'ExpenseDialog',
            params: { id: expense.id },
            query: { type: expense.type },
          }"
        >
          <app-button primary circle @click="navigate(href)">
            <span class="icofont-ui-edit" />
          </app-button>
        </router-link>

        <app-button danger circle @click="remove" :disabled="loading">
          <span class="icofont-bin" />
        </app-button>
      </template>

      <template v-if="isDebt">
        <app-button danger circle>
          <span class="icofont-bill-alt" />
        </app-button>
      </template>

      <template v-if="expense.type == 'pagamento'">
        <span class="icofont-check-alt" />
      </template>
    </div>

    <div class="payment" v-if="expense.payment">
      <span class="icofont-money" />
      <span class="payment__text">Recebido em</span>
      <span class="payment__date">
        {{ formatter.date(expense.payment.date) }}
      </span>
    </div>
  </div>
</template>

<script>
import axios from "@/utils/axios";
import formatter from "@/utils/formatter";
import User from "@/components/User.vue";
import AppButton from "@/components/AppButton.vue";

export default {
  name: "ExpenseItem",
  components: {
    User,
    AppButton,
  },
  inject: ["refresh", "user"],
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
  computed: {
    canEdit() {
      return (
        this.expense.type == "normal" || (!this.isDebt && !this.expense.payment)
      );
    },
    isDebt() {
      return this.expense.friend_id == this.user.id;
    },
  },
};
</script>
