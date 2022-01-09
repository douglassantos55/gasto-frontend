<template>
  <div class="expense">
    <div class="expense__info">
      <span class="expense__date">05/01/2022</span>
      <span class="expense__value">R$ 60,00</span>

      <p class="expense__description">Pizza</p>
    </div>

    <div class="expense__actions">
      <app-button primary circle>
        <span class="icofont-ui-edit" />
      </app-button>

      <app-button danger circle>
        <span class="icofont-bin" />
      </app-button>
    </div>

    <div class="payment">
      <span class="icofont-money" />
      <span class="payment__text">Recebido em</span>
      <span class="payment__date">05/01/2022</span>
    </div>

    <div class="expense__actions">
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
};
</script>
