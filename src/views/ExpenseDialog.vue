<template>
  <form @submit.prevent="save">
    <app-dialog title="Despesa">
      <div class="form-group">
        <input type="date" v-model="expense.date" />
        <p class="error" v-for="(error, idx) in errors.date" :key="idx">
          {{ error }}
        </p>
      </div>

      <div class="form-group">
        <input type="text" v-model="expense.description" ref="descInput" />
        <p class="error" v-for="(error, idx) in errors.description" :key="idx">
          {{ error }}
        </p>
      </div>

      <div class="form-group">
        <money-input v-model="expense.total" />
        <p class="error" v-for="(error, idx) in errors.total" :key="idx">
          {{ error }}
        </p>
      </div>

      <template v-slot:actions>
        <app-button primary rounded type="submit"> Salvar </app-button>
      </template>
    </app-dialog>
  </form>
</template>

<script>
import axios from "@/utils/axios";
import AppButton from "@/components/AppButton.vue";
import AppDialog from "@/components/AppDialog.vue";
import MoneyInput from "@/components/MoneyInput.vue";

export default {
  name: "ExpenseDialog",
  inject: ["addExpense"],
  components: {
    AppDialog,
    AppButton,
    MoneyInput,
  },
  data() {
    return {
      errors: {},
      expense: {
        description: "",
        total: 0,
        type: "normal",
        date: new Date().toISOString().slice(0, 10),
      },
    };
  },
  mounted() {
    if (this.$refs.descInput) {
      this.$refs.descInput.focus();
    }
  },
  methods: {
    async save() {
      try {
        this.addExpense(await axios.post("/expenses", this.expense));
        this.$router.back();
      } catch (err) {
        this.errors = err;
      }
    },
  },
};
</script>
