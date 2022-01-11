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
        <app-button primary rounded type="submit" :disable="loading">
          Salvar
        </app-button>
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
  inject: ["refresh"],
  props: {
    initial: {
      type: Object,
      default: () => ({
        description: "",
        total: null,
        type: "normal",
        date: new Date().toISOString().slice(0, 10),
      }),
    },
  },
  components: {
    AppDialog,
    AppButton,
    MoneyInput,
  },
  data() {
    return {
      errors: {},
      loading: false,
      expense: { ...this.initial },
    };
  },
  async beforeRouteEnter(to) {
    if (to.params.id) {
      const data = await axios.get(`/expenses/${to.params.id}`);

      to.params.initial = {};
      Object.keys(data).forEach((key) => {
        const value = data[key];

        if (value) {
          to.params.initial[key] = value;
        }
      });
    }
  },
  mounted() {
    if (this.$refs.descInput) {
      this.$refs.descInput.focus();
    }
  },
  methods: {
    async save() {
      try {
        this.loading = true;

        if (this.expense.id) {
          await axios.put(`/expenses/${this.expense.id}`, this.expense);
        } else {
          await axios.post("/expenses", this.expense);
        }

        this.refresh();
        this.loading = false;
        this.$router.back();
      } catch (err) {
        this.errors = err;
      }
    },
  },
};
</script>
