<template>
  <div class="income">
    <div class="income__header">
      <div class="income__info">
        <p class="income__period">Janeiro de 2022</p>
        <p class="income__income">R$ 2000,00</p>
      </div>

      <div class="income__actions">
        <app-button circle primary>
          <span class="icofont-ui-settings" />
        </app-button>

        <app-button circle primary>
          <span class="icofont-calendar" />
        </app-button>
      </div>
    </div>

    <div class="income__totals">
      <div class="income__total">
        <span class="income__label">Despesas</span>
        <span class="income__value income__value--danger">R$ 360,00</span>
      </div>

      <div class="income__total">
        <span class="income__label">Emprestimos</span>
        <span class="income__value income__value--warning">R$ 1160,00</span>
      </div>

      <div class="income__total">
        <span class="income__label">Balanco</span>
        <span class="income__value income__value--success">R$ 940,00</span>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  name: "Income",
  components: {
    AppButton,
  },
};
</script>
