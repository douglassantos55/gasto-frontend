<template>
  <div class="overlay" @click.self="close">
    <div tabindex="0" role="dialog" aria-modal="true" class="dialog">
      <div class="dialog__header">
        <h2 class="dialog__title">Alterar periodo</h2>

        <app-button hollow @click="close">
          <span class="icofont-close-line" />
        </app-button>
      </div>

      <div class="dialog__content">
        <div class="form-group">
          <select v-model="period.month">
            <option v-for="i in 12" :key="i" :value="i">{{ months[i] }}</option>
          </select>
        </div>

        <div class="form-group">
          <select v-model="period.year">
            <option v-for="i in 5" :key="i" :value="year - (i - 1)">
              {{ year - (i - 1) }}
            </option>
          </select>
        </div>
      </div>

      <div class="dialog__footer">
        <app-button rounded @click="close">Ok</app-button>
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from "@/components/AppButton.vue";

export default {
  inject: ["period"],
  name: "ChangePeriod",
  components: {
    AppButton,
  },
  data() {
    const year = new Date().getFullYear();
    const months = {
      1: "Janeiro",
      2: "Fevereiro",
      3: "Marco",
      4: "Abril",
      5: "Maio",
      6: "Junho",
      7: "Julho",
      8: "Agosto",
      9: "Setembro",
      10: "Outubro",
      11: "Novembro",
      12: "Dezembro",
    };
    return { year, months };
  },
  methods: {
    close() {
      this.$router.back();
    },
  },
};
</script>
