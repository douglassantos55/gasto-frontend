import { reactive, computed } from "vue";

const query = reactive({
  description: "",
  month: "",
  year: "",
});

export default function () {
  const searching = computed(() => !!query.description);

  function clearSearch() {
    query.description = "";
  }

  return { searching, query, clearSearch };
}
