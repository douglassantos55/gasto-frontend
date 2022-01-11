<template>
  <form @submit.prevent="search">
    <app-dialog title="Procure uma despesa">
      <div class="form-group">
        <label for="search-term">Descricao</label>
        <input type="text" v-model="term" id="search-term" ref="input" />
      </div>

      <template v-slot:actions>
        <app-button primary rounded type="submit"> Pesquisar </app-button>
      </template>
    </app-dialog>
  </form>
</template>

<script>
import AppButton from "@/components/AppButton.vue";
import AppDialog from "@/components/AppDialog.vue";

export default {
  name: "SearchDialog",
  components: {
    AppButton,
    AppDialog,
  },
  data() {
    return {
      term: "",
    };
  },
  methods: {
    search() {
      this.$router.push({ name: "Home", query: { term: this.term } });
    },
  },
};
</script>
