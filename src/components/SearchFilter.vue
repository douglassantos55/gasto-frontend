<template>
  <div class="search">
    <label for="search-term">Filtro</label>
    <input
      id="search-term"
      type="search"
      @input="search"
      :value="term"
      name="term"
      ref="input"
    />

    <div class="search__selects">
      <div>
        <label for="search-month">Mes</label>
        <select id="search-month" @change="search" name="month" :value="month">
          <option value="">Qualquer</option>
          <option v-for="i in 12" :key="i" :value="i">{{ months[i] }}</option>
        </select>
      </div>

      <div>
        <label for="serch-year">Ano</label>
        <select id="serch-year" @change="search" name="year" :value="year">
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
export default {
  name: "SearchFilter",
  data() {
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
    return { curYear, months };
  },
  mounted() {
    this.$refs.input.focus();
  },
  methods: {
    search(evt) {
      this.$router.push({
        query: { ...this.$route.query, [evt.target.name]: evt.target.value },
      });
    },
  },
  computed: {
    term() {
      return this.$route.query.term;
    },
    month() {
      return this.$route.query.month;
    },
    year() {
      return this.$route.query.year;
    },
  },
};
</script>
