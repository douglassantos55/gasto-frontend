<template>
  <div class="expense">
    <div class="expense__info">
      <span class="expense__date">{{ expense.date }}</span>
      <span class="expense__value">{{ expense.total }}</span>
      <p class="expense__description">{{ expense.description }}</p>
    </div>

    <div class="expense__actions" v-if="expense.payment === null">
      <app-button primary circle>
        <span class="icofont-ui-edit" />
      </app-button>

      <app-button danger circle>
        <span class="icofont-bin" />
      </app-button>
    </div>

    <div class="payment" v-if="expense.payment !== null">
      <span class="icofont-money" />
      <span class="payment__text">Recebido em</span>
      <span class="payment__date">{{ expense.payment.date }}</span>
    </div>

    <div class="expense__actions" v-if="expense.type === 'pagamento'">
      <span class="icofont-check-alt" />
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "ExpenseItem",
  components: {
    AppButton,
  },
  props: {
    expense: {
      type: Object,
      required: true,
    },
  },
};
</script>
