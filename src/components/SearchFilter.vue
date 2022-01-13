<template>
  <div class="search">
    <label for="search-term">Descrição</label>
    <input
      id="search-term"
      type="search"
      v-model.lazy="query.description"
      ref="input"
    />

    <div class="search__selects">
      <div>
        <label for="search-month">Mês</label>
        <month-select
          id="search-month"
          v-model="query.month"
          placeholder="Qualquer"
        />
      </div>

      <div>
        <label for="search-year">Ano</label>
        <year-select
          id="search-year"
          v-model="query.year"
          placeholder="Qualquer"
        />
      </div>
    </div>
  </div>
</template>

<script>
import useSearch from "@/composables/useSearch";
import YearSelect from "@/components/YearSelect.vue";
import MonthSelect from "@/components/MonthSelect.vue";

export default {
  name: "SearchFilter",
  components: {
    YearSelect,
    MonthSelect,
  },
  setup() {
    const { query, searching } = useSearch();
    return { query, searching };
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>
