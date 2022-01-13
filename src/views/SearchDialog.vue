<template>
  <form @submit.prevent="search">
    <app-dialog title="Procure uma despesa">
      <div class="form-group">
        <label for="search-term">Descrição</label>
        <input type="text" v-model="term" id="search-term" ref="input" />
      </div>

      <template v-slot:actions>
        <app-button primary rounded type="submit"> Pesquisar </app-button>
      </template>
    </app-dialog>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import AppButton from "@/components/AppButton.vue";
import AppDialog from "@/components/AppDialog.vue";
import useSearch from "@/composables/useSearch";

export default {
  name: "SearchDialog",
  components: {
    AppButton,
    AppDialog,
  },
  setup() {
    const term = ref("");

    const router = useRouter();
    const { query } = useSearch();

    function search() {
      query.description = term;
      router.back();
    }

    return { term, search };
  },
  mounted() {
    this.$refs.input.focus();
  },
};
</script>
