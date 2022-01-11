<template>
  <app-dialog title="Alterar periodo" cancel="Ok">
    <div class="form-group">
      <label for="period-month">Mes</label>
      <select id="period-month" v-model="period.month">
        <option v-for="i in 12" :key="i" :value="i">{{ months[i] }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="period-year">Ano</label>
      <select id="period-year" v-model="period.year">
        <option v-for="i in 5" :key="i" :value="year - (i - 1)">
          {{ year - (i - 1) }}
        </option>
      </select>
    </div>
  </app-dialog>
</template>

<script>
import AppDialog from "@/components/AppDialog.vue";

export default {
  inject: ["period"],
  name: "PeriodDialog",
  components: {
    AppDialog,
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
};
</script>
