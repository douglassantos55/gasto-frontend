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
        <link-button
          primary
          circle
          :to="{
            name: 'ExpenseDialog',
            params: { id: expense.id },
            query: { type: expense.type },
          }"
        >
          <span class="icofont-ui-edit" />
        </link-button>

        <app-button danger circle @click="remove" :disabled="loading">
          <span class="icofont-bin" />
        </app-button>
      </template>

      <template v-if="isDebt">
        <app-button primary circle @click="pay" :disabled="loading">
          <span class="icofont-bill-alt" />
        </app-button>
      </template>

      <div class="payment" v-if="expense.type == 'pagamento'">
        <span class="icofont-check-alt" />
        <span class="payment__text">Data do emprestimo</span>
        <span class="payment__date">
          {{ formatter.date(expense.source.date) }}
        </span>
      </div>
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
import { mapState } from "vuex";
import axios from "@/utils/axios";
import User from "@/components/User.vue";
import formatter from "@/utils/formatter";
import useAlert from "@/composables/useAlert";
import AppButton from "@/components/AppButton.vue";
import LinkButton from "@/components/LinkButton.vue";

export default {
  name: "ExpenseItem",
  components: {
    User,
    AppButton,
    LinkButton,
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
  setup() {
    const { confirm } = useAlert();
    return { confirm };
  },
  methods: {
    remove() {
      this.confirm(
        "Excluir despesa?",
        "Esta ação não poderá ser desfeita",
        async () => {
          try {
            this.loading = true;
            await axios.delete(`/expenses/${this.expense.id}`);
            this.refresh();
          } catch (err) {
            this.loading = false;
          }
        }
      );
    },
    pay() {
      this.confirm("Realizar pagamento?", "", async () => {
        try {
          this.loading = true;
          await axios.post(`/expenses/${this.expense.id}/payment`);
          this.refresh();
        } catch (err) {
          this.loading = false;
        }
      });
    },
  },
  computed: {
    canEdit() {
      return (
        this.expense.type == "normal" ||
        (!this.isDebt &&
          !this.expense.payment &&
          this.expense.type !== "pagamento")
      );
    },
    isDebt() {
      return this.expense.friend_id == this.user.id;
    },
    ...mapState(["user"]),
  },
};
</script>
