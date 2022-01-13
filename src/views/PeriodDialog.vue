<template>
  <app-dialog title="Alterar período" cancel="Ok">
    <div class="form-group">
      <label for="period-month">Mês</label>
      <month-select id="period-month" v-model="period.month" />
    </div>

    <div class="form-group">
      <label for="period-year">Ano</label>
      <year-select id="period-year" v-model="period.year" />
    </div>
  </app-dialog>
</template>

<script>
import AppDialog from "@/components/AppDialog.vue";
import YearSelect from "@/components/YearSelect.vue";
import MonthSelect from "@/components/MonthSelect.vue";

export default {
  inject: ["period"],
  name: "PeriodDialog",
  components: {
    AppDialog,
    YearSelect,
    MonthSelect,
  },
};
</script>
