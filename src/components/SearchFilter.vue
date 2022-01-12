<template>
  <div class="search">
    <label for="search-term">Filtro</label>
    <input
      id="search-term"
      type="search"
      v-model="query.description"
      ref="input"
    />

    <div class="search__selects">
      <div>
        <label for="search-month">Mes</label>
        <select id="search-month" v-model="query.month">
          <option value="">Qualquer</option>
          <option v-for="i in 12" :key="i" :value="i">{{ months[i] }}</option>
        </select>
      </div>

      <div>
        <label for="search-year">Ano</label>
        <select id="search-year" v-model="query.year">
          <option value="">Qualquer</option>
          <option v-for="i in 5" :key="i" :value="curYear - (i - 1)">
            {{ curYear - (i - 1) }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
import useSearch from "@/composables/useSearch";

export default {
  name: "SearchFilter",
  setup() {
    const curYear = new Date().getFullYear();

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

    const { query, searching } = useSearch();
    return { query, searching, curYear, months };
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>
